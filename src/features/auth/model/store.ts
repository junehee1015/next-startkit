'use client'

import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

interface User {
  id: number
  email: string
  name: string
  role: string
}

export interface AuthProps {
  user: User | null
}

export interface AuthState extends AuthProps {
  setUser: (user: User | null) => void
}

export type AuthStore = ReturnType<typeof createAuthStore>

export const createAuthStore = (initProps?: Partial<AuthProps>) => {
  return createStore<AuthState>()((set) => ({
    user: initProps?.user || null,
    setUser: (user) => set({ user }),
  }))
}

export const AuthContext = createContext<AuthStore | null>(null)

export function useAuthStore<T>(selector: (state: AuthState) => T): T {
  const store = useContext(AuthContext)
  if (!store) {
    throw new Error('useAuthStore는 AuthProvider 내부에서만 사용할 수 있습니다.')
  }
  return useStore(store, selector)
}
