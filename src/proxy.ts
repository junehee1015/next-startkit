import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES } from './constants/routes'

const refreshLocks = new Map<string, Promise<string | null>>()

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  if (refreshLocks.has(refreshToken)) {
    return refreshLocks.get(refreshToken) as Promise<string | null>
  }

  const refreshPromise = (async () => {
    try {
      // 실제 백엔드 직접 호출
      // const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`
      // const response = await fetch(targetUrl, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ refreshToken }),
      //   cache: 'no-store',
      // })

      // if (!response.ok) throw new Error('Token Refresh Failed')

      // const data = (await response.json()) as { accessToken: string }
      // return data.accessToken

      await new Promise((resolve) => setTimeout(resolve, 500))
      return 'mock-new-access-token-' + Date.now()
    } catch (error) {
      console.error('Refresh Failed:', error)
      return null
    } finally {
      refreshLocks.delete(refreshToken) // 완료 후 락 해제
    }
  })()

  refreshLocks.set(refreshToken, refreshPromise)
  return refreshPromise
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  let accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const user = request.cookies.get('user')?.value

  let isRefreshed = false

  if (!accessToken && refreshToken && user) {
    const newAccessToken = await refreshAccessToken(refreshToken)

    if (newAccessToken) {
      accessToken = newAccessToken
      isRefreshed = true
      request.cookies.set('accessToken', accessToken)
      request.headers.set('Authorization', `Bearer ${accessToken}`)
      request.headers.set('cookie', request.cookies.toString())
    }
  }

  const isAuthenticated = !!accessToken && user
  const isPublic = ROUTES.PUBLIC.some((route) => (route === '/' ? pathname === '/' : pathname.startsWith(route)))
  const isGuestOnly = ROUTES.GUEST_ONLY.some((route) => pathname.startsWith(route))

  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  if (isGuestOnly && isAuthenticated) {
    response = NextResponse.redirect(new URL('/', request.url))
  } else if (!isPublic && !isGuestOnly && !isAuthenticated) {
    response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('accessToken')
    response.cookies.delete('refreshToken')
    response.cookies.delete('user')
  }

  if (isRefreshed && accessToken) {
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
