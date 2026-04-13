'use client'

import { useLoadingStore } from '@/stores/loading-store'
import { Loader2 } from 'lucide-react'

export function GlobalLoading() {
  const isLoading = useLoadingStore((state) => state.isLoading)
  const loadingMessage = useLoadingStore((state) => state.loadingMessage)

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2 text-white">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p className="text-sm font-medium">{loadingMessage || '처리 중 입니다...'}</p>
      </div>
    </div>
  )
}
