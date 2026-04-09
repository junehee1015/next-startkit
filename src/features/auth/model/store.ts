import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  email: string
  name: string
  role: string
}

interface AuthState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
    },
  ),
)
