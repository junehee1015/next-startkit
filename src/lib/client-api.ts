import ky from 'ky'
import { logoutAction } from '@/features/auth/api/actions'

const PREFIX_URL = process.env.NEXT_PUBLIC_PREFIX_URL || '/api'
let refreshPromise: Promise<void> | null = null
let logoutPromise: Promise<void> | null = null

const refreshAccessToken = () => {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    try {
      await ky.post(`refresh`, { prefix: PREFIX_URL, credentials: 'include' }).json()
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

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
      async ({ request, response }) => {
        const pathname = new URL(request.url).pathname
        const isAuthPath = ['/login', '/logout', '/refresh'].some((path) => pathname.endsWith(path))

        if (response.status === 401 && !isAuthPath) {
          try {
            await refreshAccessToken()
          } catch {
            await logout()
            return new Promise(() => {})
          }

          return ky(request)
        }
      },
    ],
  },
})
