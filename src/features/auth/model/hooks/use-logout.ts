'use client'

import { useAction } from 'next-safe-action/hooks'
import { useAuthStore } from '../store'
import { logoutAction } from '../../api/actions'

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser)

  const { executeAsync, isExecuting } = useAction(logoutAction, {
    onSettled: () => {
      clearUser()
      useAuthStore.persist.clearStorage()
    },
  })

  return { executeAsync, isExecuting }
}
