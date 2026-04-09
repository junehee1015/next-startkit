import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ky from 'ky'
import type { Options, Input } from 'ky'

const PREFIX_URL = process.env.NEXT_PUBLIC_PREFIX_URL || '/api'

const _api = async <T = unknown>(request: Input, options?: Options): Promise<T> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  return ky(request, {
    prefix: PREFIX_URL,
    retry: 0,
    ...options,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
    hooks: {
      afterResponse: [
        async ({ response }) => {
          if (response.status === 401) {
            redirect('/login')
          }
        },
        ...(options?.hooks?.afterResponse || []),
      ],
      ...options?.hooks,
    },
  }).json<T>()
}

export const api = Object.assign(_api, {
  get: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'get' }),
  post: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'post' }),
  put: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'put' }),
  delete: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'delete' }),
  patch: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'patch' }),
})
