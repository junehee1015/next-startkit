import { create } from 'zustand'

interface LoadingStore {
  isLoading: boolean
  loadingMessage: string
  setIsLoading: (loading: boolean) => void
  setLoadingMessage: (message: string) => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  loadingMessage: '',
  setIsLoading: (loading) => set({ isLoading: loading }),
  setLoadingMessage: (message) => set({ loadingMessage: message }),
}))
