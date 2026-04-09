'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldError, FieldGroup } from '@/components/ui/field'
import { useLogin } from '../model'

export function LoginForm() {
  const router = useRouter()

  const { form, execute, isExecuting } = useLogin({
    onSuccessCallback: () => {
      toast.success('로그인에 성공하였습니다.')
      router.push('/')
    },
    onErrorCallback: () => {
      toast.error('로그인에 실패하였습니다.')
    },
  })
  return (
    <form onSubmit={form.handleSubmit(execute)} className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">이메일</FieldLabel>
          <Input id="email" placeholder="admin@test.com" disabled={isExecuting} {...form.register('email')} />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">비밀번호</FieldLabel>
          <Input id="password" type="password" placeholder="••••••••" disabled={isExecuting} {...form.register('password')} />
          <FieldError>{form.formState.errors.password?.message}</FieldError>
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isExecuting}>
        {isExecuting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            로그인 중...
          </>
        ) : (
          '로그인'
        )}
      </Button>
    </form>
  )
}
