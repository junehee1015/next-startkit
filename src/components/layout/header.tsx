'use client'

import { Fragment } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, User as UserIcon, Home } from 'lucide-react'
import { useAuthStore } from '@/features/auth/model'
import { useLogout } from '@/features/auth/model'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { toast } from 'sonner'

const BREADCRUMB_NAMES: Record<string, string> = {
  dashboard: '대시보드',
  guide: '사용자 가이드',
}

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuthStore()
  const { executeAsync, isExecuting } = useLogout()

  const pathSegments = pathname.split('/').filter(Boolean)

  const handleLogout = async () => {
    await executeAsync()
    toast.error('로그아웃 되었습니다.')
    router.replace('/login')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-zinc-900 dark:border-zinc-800">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard" className="flex items-center">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathSegments.length > 0 && <BreadcrumbSeparator />}

          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`
            const isLast = index === pathSegments.length - 1
            const name = BREADCRUMB_NAMES[segment] || segment

            return (
              <Fragment key={href}>
                <BreadcrumbItem>{isLast ? <BreadcrumbPage>{name}</BreadcrumbPage> : <BreadcrumbLink href={href}>{name}</BreadcrumbLink>}</BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-center items-center">
              <Button variant="ghost" size="icon" className="rounded-full bg-zinc-100 dark:bg-zinc-800">
                <UserIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
              </Button>
              {user && <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{user.name}</span>}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>내 계정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings/profile')}>프로필 설정</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={isExecuting} className="text-red-600 focus:bg-red-50 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
