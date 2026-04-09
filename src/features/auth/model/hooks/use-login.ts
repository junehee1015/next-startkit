'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'

import { loginAction } from '../../api/actions'
import { loginSchema, type LoginInput } from '../schema'
import { useAuthStore } from '../store'

interface UseLoginProps {
  onSuccessCallback?: () => void
  onErrorCallback?: () => void
}

export const useLogin = ({ onSuccessCallback, onErrorCallback }: UseLoginProps) => {
  const setUser = useAuthStore((state) => state.setUser)

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@example.com', password: '1234' },
  })

  const { execute, isExecuting } = useAction(loginAction, {
    onSuccess: ({ data }) => {
      if (data?.user) {
        setUser(data.user)
        onSuccessCallback?.()
      }
    },
    onError: ({ error }) => {
      console.error(error)
      onErrorCallback?.()
    },
  })

  return { form, execute, isExecuting }
}
