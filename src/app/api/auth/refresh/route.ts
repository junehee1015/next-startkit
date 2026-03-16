import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = await cookies()

  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!refreshToken) {
    return NextResponse.json({ message: 'refreshToken이 존재하지 않습니다.' }, { status: 401 })
  }

  try {
    // 순수 fetch
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) throw new Error('토큰 갱신 실패')

    const data = await response.json()

    if (!data.accessToken) {
      throw new Error('accessToken이 존재하지 않습니다.')
    }

    cookieStore.set('accessToken', data.accessToken, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    if (data.refreshToken) {
      cookieStore.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    return NextResponse.json({ message: '토큰 갱신 중 에러가 발생했습니다.' }, { status: 401 })
  }
}
