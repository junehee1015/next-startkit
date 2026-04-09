'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Book } from 'lucide-react'
import { cn } from '@/lib/utils'

const MENU_ITEMS = [
  { name: '대시보드', href: '/dashboard', icon: LayoutDashboard },
  { name: '사용자 가이드', href: '/guide', icon: Book },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-zinc-50 px-3 py-4 dark:bg-zinc-950 dark:border-zinc-800">
      <div className="mb-8 px-3">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Admin Pro</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
