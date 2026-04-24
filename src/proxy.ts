import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES } from './constants/routes'

const refreshLocks = new Map<string, Promise<string | null>>()

async function refreshAccessToken(refreshToken: string) {
  if (refreshLocks.has(refreshToken)) {
    return refreshLocks.get(refreshToken)
  }

  const refreshPromise = (async () => {
    try {
      // 내부 백엔드가 아닌 실제 백엔드 직접 호출
      // const response = await fetch(`${origin}/api/refresh`, {
      //   method: 'POST',
      //   cache: 'no-store',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Cookie: `refreshToken=${refreshToken}`,
      //   },
      // })

      // if (response.ok) {
      //   const data = await response.json()
      //   return data.accessToken as string
      // }

      await new Promise((resolve) => setTimeout(resolve, 500))
      return 'mock-new-access-token-' + Date.now()
    } catch (error) {
      console.error('[Proxy] Silent Refresh Failed:', error)
      return null
    } finally {
      refreshLocks.delete(refreshToken)
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

  let isRefresh: boolean = false

  if (!accessToken && refreshToken && user) {
    const newAccessToken = await refreshAccessToken(refreshToken)

    if (newAccessToken) {
      accessToken = newAccessToken
      isRefresh = true

      request.cookies.set('accessToken', accessToken)
      request.headers.set('Authorization', `Bearer ${accessToken}`)
      request.headers.set('cookie', request.cookies.toString())
    }
  }

  const isAuthenticated = !!accessToken && user
  const isPublic = ROUTES.PUBLIC.some((route) => (route === '/' ? pathname === '/' : pathname.startsWith(route)))
  const isGuestOnly = ROUTES.GUEST_ONLY.some((route) => pathname.startsWith(route))

  if (isGuestOnly && isAuthenticated) {
    const redirectResponse = NextResponse.redirect(new URL('/', request.url))

    if (isRefresh && accessToken) {
      redirectResponse.cookies.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
      })
    }

    return redirectResponse
  }

  if (!isPublic && !isGuestOnly && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    const redirectResponse = NextResponse.redirect(loginUrl)
    redirectResponse.cookies.delete('accessToken')
    redirectResponse.cookies.delete('refreshToken')
    redirectResponse.cookies.delete('user')
    return redirectResponse
  }

  const nextResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  if (isRefresh && accessToken) {
    nextResponse.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    })
  }

  return nextResponse
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
