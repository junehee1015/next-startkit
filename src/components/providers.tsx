'use client'

import { Toaster } from 'sonner'
import { GlobalConfirmDialog } from './confirm-dialog'
import { GlobalLoading } from './global-loading'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-center" richColors />
      <GlobalConfirmDialog />
      <GlobalLoading />
    </>
  )
}
