import { LoginForm } from '@/features/auth/ui/login-form'

export const metadata = {
  title: '로그인 | Next Startkit',
  description: '관리자 시스템에 로그인하세요.',
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900 border dark:border-zinc-800">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Next Startkit</h2>
      </div>
      <LoginForm />
    </div>
  )
}
