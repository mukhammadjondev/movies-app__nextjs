'use client'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User} from 'firebase/auth'
import { useState } from 'react'
import { auth } from '@/firebase'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

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
      fetch('/api/customer', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: res.user.email, user_id: res.user.uid})
      })
      Cookies.set('user_id', res.user.uid)
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
      Cookies.set('user_id', res.user.uid)
      setIsLoading(true)
    })
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false))
  }

  const logout = async () => {
    setIsLoading(true)

    await signOut(auth).then(() => {
      Cookies.remove('user_id')
      setUser(null)
      router.push('/auth')
    })
    .catch(err => setError(err.message)).finally(() => setIsLoading(false))
  }

  return {error, isLoading, user, signIn, signUp, logout, setUser, setIsLoading}
}