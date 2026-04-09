import { createSafeActionClient } from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError: (e: Error) => {
    if (e) return e.message
    return '알 수 없는 서버 에러가 발생했습니다.'
  },
})
