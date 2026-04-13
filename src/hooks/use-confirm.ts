import { useConfirmStore } from '@/stores/confirm-store'

export const useConfirm = () => {
  const openConfirm = useConfirmStore((state) => state.setConfirm)
  const openAlert = useConfirmStore((state) => state.setAlert)
  const close = useConfirmStore((state) => state.close)

  return { openConfirm, openAlert, close }
}
