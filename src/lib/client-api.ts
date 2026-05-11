import ky from 'ky'
import { logoutAction } from '@/features/auth/api/actions'

const PREFIX_URL = process.env.NEXT_PUBLIC_PREFIX_URL || '/api'
let logoutPromise: Promise<void> | null = null

const logout = async () => {
  if (logoutPromise) return logoutPromise

  logoutPromise = (async () => {
    try {
      await logoutAction()
    } catch (error) {
      console.error('Logout API failed', error)
    } finally {
      logoutPromise = null
      window.location.href = '/login'
    }
  })()

  return logoutPromise
}

export const clientApi = ky.create({
  prefix: PREFIX_URL,
  credentials: 'include',
  retry: 0,
  hooks: {
    afterResponse: [
      async ({ response }) => {
        if (response.status === 401) {
          await logout()
          return new Promise(() => {})
        }
      },
    ],
  },
})
