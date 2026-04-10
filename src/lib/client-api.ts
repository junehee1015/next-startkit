import ky from 'ky'
import { logoutAction } from '@/features/auth/api/actions'
import { useAuthStore } from '@/features/auth/model'

const PREFIX_URL = process.env.NEXT_PUBLIC_PREFIX_URL || '/api'

let logoutPromise: Promise<void> | null = null

const redirectToLogin = async () => {
  if (logoutPromise) return logoutPromise

  logoutPromise = (async () => {
    try {
      await logoutAction()
    } catch (error) {
      console.error('Logout API failed', error)
    } finally {
      useAuthStore.getState().clearUser()
      useAuthStore.persist.clearStorage()
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
      async ({ request, response }) => {
        const isAuthPath = request.url.includes('/login') || request.url.includes('/logout')

        if (response.status === 401 && !isAuthPath) {
          console.warn('Authentication expired. Redirecting to login...')
          await redirectToLogin()
          return new Promise(() => {})
        }
      },
    ],
  },
})
