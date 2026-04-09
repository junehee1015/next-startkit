import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (!refreshToken) {
      return NextResponse.json({ message: 'Refresh token is required' }, { status: 401 })
    }

    const newAccessToken = 'mock-new-access-token-' + Date.now()
    const response = NextResponse.json({ accessToken: newAccessToken })

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 1,
    })

    return response
  } catch (error) {
    console.error('Refresh Verification Failed:', error)
    return NextResponse.json({ message: 'Invalid or expired refresh token' }, { status: 401 })
  }
}
