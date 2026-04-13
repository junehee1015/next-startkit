'use client'

import { useConfirmStore } from '@/stores/confirm-store'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

export function GlobalConfirmDialog() {
  const { isOpen, type, title, description, confirmText, cancelText, onConfirm, onCancel, close } = useConfirmStore()

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm()
    close()
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    close()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {type === 'confirm' && <AlertDialogCancel onClick={handleCancel}>{cancelText || '취소'}</AlertDialogCancel>}
          <AlertDialogAction onClick={handleConfirm}>{confirmText || '확인'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
