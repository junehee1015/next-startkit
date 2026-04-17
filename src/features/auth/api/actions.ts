'use server'

import { cookies } from 'next/headers'
import { actionClient } from '@/lib/safe-action'
import { loginSchema } from '../model'
// import { serverApi } from '@/lib/server-api'

export const loginAction = actionClient.inputSchema(loginSchema).action(async ({ parsedInput }) => {
  const { email, password } = parsedInput

  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (email !== 'admin@example.com' || password !== '1234') {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')
  }

  const refreshToken = 'mock-refresh-token-' + Date.now()
  const accessToken = 'mock-access-token-' + Date.now()
  const mockUser = { id: 1, email, name: 'Juny Jo', role: 'ADMIN' }

  const cookieStore = await cookies()
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 1,
  })

  cookieStore.set('user', JSON.stringify(mockUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  return { user: mockUser }
})

export const logoutAction = actionClient.action(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const cookieStore = await cookies()
  cookieStore.delete('refreshToken')
  cookieStore.delete('accessToken')
  cookieStore.delete('user')
})
