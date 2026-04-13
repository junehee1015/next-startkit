import { create } from 'zustand'

export interface ConfirmState {
  isOpen: boolean
  type: 'alert' | 'confirm'
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}

interface ConfirmStore extends ConfirmState {
  setConfirm: (params: Omit<ConfirmState, 'isOpen' | 'type'>) => void
  setAlert: (params: Omit<ConfirmState, 'isOpen' | 'type'>) => void
  close: () => void
}

export const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  type: 'confirm',
  title: '',
  description: '',
  confirmText: '확인',
  cancelText: '취소',

  setConfirm: (params) => set({ isOpen: true, type: 'confirm', cancelText: '취소', ...params }),
  setAlert: (params) => set({ isOpen: true, type: 'alert', ...params }),
  close: () => set({ isOpen: false }),
}))
