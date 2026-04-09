import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES } from './constants/routes'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = ROUTES.PUBLIC.some((route) => pathname.startsWith(route))
  const isGuestOnly = ROUTES.GUEST_ONLY.some((route) => pathname.startsWith(route))

  if (isPublic) return NextResponse.next()

  let accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  let nextResponse = NextResponse.next()

  if (!accessToken && refreshToken) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        accessToken = data.accessToken as string

        request.headers.set('Authorization', `Bearer ${accessToken}`)
        nextResponse = NextResponse.next({ request: { headers: request.headers } })

        nextResponse.cookies.set('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 1,
        })
      }
    } catch (error) {
      console.error('Silent Refresh Failed:', error)
    }
  }

  const isAuthenticated = !!accessToken

  if (isGuestOnly && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isGuestOnly && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)

    const redirectResponse = NextResponse.redirect(loginUrl)
    redirectResponse.cookies.delete('accessToken')
    redirectResponse.cookies.delete('refreshToken')
    return redirectResponse
  }

  return nextResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
