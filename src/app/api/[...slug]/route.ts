import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

// 여러 유저가 공유하는 서버 인스턴스 환경이기 때문에 고유값(refreshToken)을 Key로 사용하는 Map 사용
const refreshLocks = new Map<string, Promise<string | null>>()

async function catchAllProxy(req: NextRequest, props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const path = params.slug.join('/')
  const targetUrl = new URL(`${API_URL}/${path}${req.nextUrl.search}`)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  const headers = new Headers(req.headers)
  headers.delete('host') // 도메인 불일치가 나지 않도록 기존 Host 삭제
  headers.delete('cookie') // 프론트엔드 전용 UI 쿠키 등이 백엔드로 흘러가는 것을 방어

  //  대용량 파일 업로드 방지를 위한 Multipart 검사
  const contentType = req.headers.get('content-type') || ''
  const isMultipart = contentType.includes('multipart/form-data') // 대용량 파일(Multipart)을 arrayBuffer로 묶으면 서버 메모리 과부하
  const hasBody = !['GET', 'HEAD', 'OPTIONS'].includes(req.method)

  let requestBody: ArrayBuffer | ReadableStream | null = null

  if (hasBody) {
    // 파일 업로드는 백엔드로 바로 req.body, 일반 데이터는 401 재시도를 위해 RAM에 버퍼링(arrayBuffer)
    requestBody = isMultipart ? req.body : await req.arrayBuffer()
  }

  const sendRequest = (token?: string) => {
    const currentHeaders = new Headers(headers)
    if (token) currentHeaders.set('Authorization', `Bearer ${token}`)

    return fetch(targetUrl.toString(), {
      method: req.method,
      headers: currentHeaders,
      body: requestBody,
      redirect: 'manual',
      // @ts-expect-error Node fetch stream pipeline requirement
      duplex: hasBody ? 'half' : undefined, // 스트림 바디를 fetch로 넘기기 위한 필수 옵션
    })
  }

  let response = await sendRequest(accessToken)

  // 401 발생 시 무중단 갱신 및 재시도
  if (response.status === 401 && refreshToken) {
    // 파일 업로드 중 401이면 스트림이 이미 소비되어 재시도 불가
    if (isMultipart) {
      return NextResponse.json({ message: 'Session Expired during upload. Please retry.' }, { status: 401 })
    }

    if (!refreshLocks.has(refreshToken)) {
      const refreshPromise = (async () => {
        try {
          const res = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          })
          if (!res.ok) throw new Error('Unauthorized')
          const data = (await res.json()) as { accessToken: string }
          return data.accessToken
        } catch {
          return null
        } finally {
          refreshLocks.delete(refreshToken)
        }
      })()
      refreshLocks.set(refreshToken, refreshPromise)
    }

    const newAccessToken = await refreshLocks.get(refreshToken)

    if (newAccessToken) {
      response = await sendRequest(newAccessToken)
      const nextResponse = new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      })

      nextResponse.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
      })

      return nextResponse
    } else {
      const errorResponse = NextResponse.json({ message: 'Session Expired' }, { status: 401 })
      errorResponse.cookies.delete('accessToken')
      errorResponse.cookies.delete('refreshToken')
      errorResponse.cookies.delete('user')
      errorResponse.headers.set('X-Auth-Expired', 'true')
      return errorResponse
    }
  }

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
}

export { catchAllProxy as GET, catchAllProxy as POST, catchAllProxy as PUT, catchAllProxy as PATCH, catchAllProxy as DELETE, catchAllProxy as OPTIONS }
