'use client'

import { useAction } from 'next-safe-action/hooks'
import { logoutAction } from '../../api/actions'

export const useLogout = () => {
  const { executeAsync, isExecuting } = useAction(logoutAction)
  return { executeAsync, isExecuting }
}
