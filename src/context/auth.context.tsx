"use client"

import { auth } from "@/firebase"
import { useAuth } from "@/hooks/useAuth"
import { User, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useMemo, useEffect, useState } from "react"

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
  const [initialLoader, setInitialLoader] = useState<boolean>(true)
  const {error, isLoading, user, signIn, signUp, logout, setUser, setIsLoading} = useAuth()
  const value = useMemo(() => ({
    user, isLoading, logout, signIn, signUp, error
  }), [user, isLoading, error])

  const router = useRouter()

  useEffect(() => onAuthStateChanged(auth, user => {
    if (user) {
      setUser(user)
      setIsLoading(false)
    } else {
      setUser(null)
      setIsLoading(true)
      router.push('/auth')
    }
    setInitialLoader(false)
    setIsLoading(false)
  }), [])


  return (
    <AuthContext.Provider value={value}>{!initialLoader ? children : 'Loading...'}</AuthContext.Provider>
  )
}

export default AuthContextProvider