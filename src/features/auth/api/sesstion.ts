import { cookies } from 'next/headers'

export interface UserSession {
  id: number
  email: string
  name: string
  role: 'ADMIN' | 'USER'
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('user')?.value

  if (!userCookie) return null

  try {
    return JSON.parse(userCookie) as UserSession
  } catch (error) {
    console.error('Session Parsing Error', error)
    return null
  }
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('accessToken')?.value ?? null
}
