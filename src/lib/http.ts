export interface ApiErrorResponse {
  message?: string
  code?: string
  [key: string]: unknown
}

// 에러 커스텀
export class HTTPError extends Error {
  constructor(
    public status: number,
    public info: ApiErrorResponse | string,
    message: string,
  ) {
    super(message)
    this.name = 'HTTPError'
  }
}

// API 요청 타입
interface HttpOptions extends RequestInit {
  searchParams?: Record<string, string | number | boolean | undefined | null>
  json?: unknown
  _retry?: boolean
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080/api'

let refreshPromise: Promise<boolean> | null = null

export const http = async <T = unknown>(endpoint: string, options: HttpOptions = {}): Promise<T> => {
  const { searchParams, json, headers, _retry, ...customConfig } = options
  // 서버 또는 클라이언트 환경인지 확인
  const isServer = typeof window === 'undefined'

  const url = new URL(endpoint, BASE_URL)
  // url parameter 설정
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  let accessToken = ''
  // 서버 또는 클라이언트에 따라 쿠키에서 accessToken을 가져오는 방법 분기처리
  if (isServer) {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    accessToken = cookieStore.get('accessToken')?.value || ''
  } else {
    accessToken = getClientCookie('accessToken')
  }

  // header에 accessToken 주입
  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  }

  // body 설정
  if (json) {
    config.body = JSON.stringify(json)
  }

  // 최종 API 요청
  const response = await fetch(url.toString(), config)

  // 401 에러 처리
  if (response.status === 401 && !_retry && !url.pathname.includes('/auth/refresh')) {
    if (isServer) {
      throw new HTTPError(401, 'Unauthorized', 'Server-side Token Expired')
    }

    if (!refreshPromise) {
      refreshPromise = refreshTokenAPI().finally(() => {
        refreshPromise = null
      })
    }

    const isRefreshed = await refreshPromise

    // 토큰 갱신 후 재요청
    if (isRefreshed) {
      return http<T>(endpoint, { ...options, _retry: true })
    } else {
      window.location.href = '/login'
      throw new HTTPError(401, 'Session Expired', 'Please login again')
    }
  }

  // 그 외 에러 처리
  if (!response.ok) {
    let errorInfo: ApiErrorResponse | string
    try {
      errorInfo = await response.json()
    } catch {
      errorInfo = await response.text()
    }
    throw new HTTPError(response.status, errorInfo, `HTTP Error: ${response.status}`)
  }

  // 204는 삭제, 수정과 같이 return 값이 없기 때문에 undefined 반환
  if (response.status === 204) return undefined as T

  // 성공 처리
  return response.json() as Promise<T>
}

export const api = {
  get: <T>(url: string, options?: Omit<HttpOptions, 'method' | 'json'>) => http<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, json?: unknown, options?: Omit<HttpOptions, 'method' | 'json'>) => http<T>(url, { ...options, method: 'POST', json }),
  put: <T>(url: string, json?: unknown, options?: Omit<HttpOptions, 'method' | 'json'>) => http<T>(url, { ...options, method: 'PUT', json }),
  delete: <T>(url: string, options?: Omit<HttpOptions, 'method' | 'json'>) => http<T>(url, { ...options, method: 'DELETE' }),
}

// cookit에서 accessToken만 잘라오는 함수
function getClientCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || ''
  return ''
}

async function refreshTokenAPI(): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/refresh', { method: 'POST' })
    return res.ok
  } catch {
    return false
  }
}
