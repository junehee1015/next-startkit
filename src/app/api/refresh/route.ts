import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (!refreshToken) {
      return NextResponse.json({ message: 'Refresh token is required' }, { status: 401 })
    }

    // const refreshResponse = await fetch(`${process.env.EXTERNAL_API_URL}/auth/refresh`, {
    //   method: 'POST',
    //   headers: { Cookie: `refreshToken=${refreshToken}` },
    // })

    // const data = await refreshResponse.json()
    // const newAccessToken = data.accessToken

    await new Promise((resolve) => setTimeout(resolve, 500))
    const newAccessToken = 'mock-new-access-token-' + Date.now()
    const nextResponse = NextResponse.json({ accessToken: newAccessToken })

    nextResponse.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    })

    return nextResponse
  } catch (error) {
    console.error('Refresh Verification Failed:', error)
    const errorResponse = NextResponse.json({ message: 'Invalid or expired refresh token' }, { status: 401 })
    errorResponse.cookies.delete('accessToken')
    errorResponse.cookies.delete('refreshToken')
    errorResponse.cookies.delete('user')
    return NextResponse.json({ message: 'Invalid or expired refresh token' }, { status: 401 })
  }
}
