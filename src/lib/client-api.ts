import ky from 'ky'
import type { HTTPError, Input, Options } from 'ky'
import { logoutAction } from '@/features/auth/api/actions'

const PREFIX_URL = process.env.NEXT_PUBLIC_PREFIX_URL || '/api'
let refreshPromise: Promise<void> | null = null
let logoutPromise: Promise<void> | null = null

const refreshAccessToken = () => {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    try {
      await ky.post(`api/refresh`, { prefix: PREFIX_URL, credentials: 'include' }).json()
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

const _apiInstance = ky.create({
  prefix: PREFIX_URL,
  credentials: 'include',
  retry: 0,
})

const _api = async <T = unknown>(request: Input, options?: Options): Promise<T> => {
  const getCloneRequest = () => (request instanceof Request ? request.clone() : request)
  const getCloneOptions = () => (options ? { ...options } : undefined)

  try {
    return await _apiInstance(getCloneRequest(), getCloneOptions()).json<T>()
  } catch (e) {
    const error = e as HTTPError
    const requestUrl = request instanceof Request ? request.url : request.toString()
    const isAuthPath = ['/login', '/logout', '/refresh'].some((path) => requestUrl.includes(path))

    if (error.response?.status === 401 && !isAuthPath) {
      try {
        await refreshAccessToken()
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        await logout()
        throw refreshError
      }

      return await _apiInstance(getCloneRequest(), getCloneOptions()).json<T>()
    }

    throw error
  }
}

export const clientApi = Object.assign(_api, {
  get: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'get' }),
  post: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'post' }),
  put: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'put' }),
  delete: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'delete' }),
  patch: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'patch' }),
})
