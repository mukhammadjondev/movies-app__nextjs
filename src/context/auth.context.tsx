"use client"

import { useAuth } from "@/hooks/useAuth"
import { User } from "firebase/auth"
import { createContext, ReactNode, useMemo } from "react"

interface AuthContextState {
  user: User | null
  error: string
  isLoading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextState>({
  user: null,
  error: '',
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {},
})

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const {error, isLoading, user, signIn, signUp, logout} = useAuth()
  const value = useMemo(() => ({
    user, isLoading, logout, signIn, signUp, error
  }), [user, isLoading, error])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider