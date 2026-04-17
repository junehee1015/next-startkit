'use client'

import { Toaster } from 'sonner'
import { GlobalConfirmDialog } from './confirm-dialog'
import { TooltipProvider } from '@/components/ui/tooltip'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <Toaster position="top-center" richColors />
      <GlobalConfirmDialog />
    </TooltipProvider>
  )
}
