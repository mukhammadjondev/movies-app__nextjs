'use client'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User} from 'firebase/auth'
import { useState } from 'react'
import { auth } from '@/firebase'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)

  const router = useRouter()

  const signUp = async (email: string, paswword: string) => {
    setIsLoading(true)

    await createUserWithEmailAndPassword(auth, email, paswword).then(res => {
      setUser(res.user)
      router.push('/')
      setIsLoading(true)
    })
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false))
  }

  const signIn = async (email: string, paswword: string) => {
    setIsLoading(true)

    await signInWithEmailAndPassword(auth, email, paswword).then(res => {
      setUser(res.user)
      router.push('/')
      setIsLoading(true)
    })
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false))
  }

  const logout = async () => {
    setIsLoading(true)

    await signOut(auth).then(() => setUser(null)).catch(err => setError(err.message)).finally(() => setIsLoading(false))
  }

  return {error, isLoading, user, signIn, signUp, logout, setUser, setIsLoading}
}