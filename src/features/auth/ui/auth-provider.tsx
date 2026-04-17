'use client'

import { useRef } from 'react'
import { AuthContext, createAuthStore, type AuthStore, type AuthProps } from '../model'

interface AuthProviderProps extends AuthProps {
  children: React.ReactNode
}

export function AuthProvider({ children, user }: AuthProviderProps) {
  const storeRef = useRef<AuthStore>(null)

  if (!storeRef.current) {
    storeRef.current = createAuthStore({ user })
  }

  return <AuthContext.Provider value={storeRef.current}>{children}</AuthContext.Provider>
}
