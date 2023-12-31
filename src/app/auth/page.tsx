'use client'

import { TextField } from "@/components"
import Image from "next/image"
import { useState } from 'react'
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

const AuthPage = () => {
  const [auth, setAuth] = useState<'signin' | 'signup'>('signin')
  const {error, isLoading, signIn, signUp, user} = useAuth()
  const router = useRouter()

  if(user) router.push('/')

  const toggleAuth = (state: 'signup' | 'signin') => setAuth(state)

  const onSubmit = async (formData: {email: '', password: ''}) => {
    if(auth === 'signup') {
      signUp(formData.email, formData.password)
    } else {
      signIn(formData.email, formData.password)
    }
  }

  const validation = Yup.object({
    email: Yup.string().email('Enter valid email').required('Email is required'),
    password: Yup.string().min(6, '6 minimum character').required('Password is required')
  })

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center bg-black md:bg-transparent">
      <Image src={'https://rb.gy/p2hphi'} alt='bg' fill className="object-cover -z-10 !hiddem sm:!inline opacity-60" />

      <Image src={'/logo.svg'} alt={'logo'} width={70} height={70} className={'absolute left-4 top-4 cursor-pointer object-contain'} />

      <Formik initialValues={{email: '', password: ''}} onSubmit={onSubmit} validationSchema={validation}>
        <Form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-10">
          <h1 className="text-4xl font-semibold">{auth === 'signup' ? 'Sign Up' : 'Sign In'}</h1>
          {error && <p className="text-red-500 font-semibold text-center">{error}</p>}
          <div className="space-y-4">
            <TextField name="email" placeholder="Email" type={'text'} />
            <TextField name="password" placeholder="Password" type={'password'} />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-[#E10856] py-4 rounded mt-4 font-semibold">
            {isLoading ? 'Loading...' : auth === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>

          {auth === 'signin' ? (
            <div className="text-[gray]">
              Not yet account? <button type="button" className="text-white hover:underline" onClick={() => toggleAuth('signup')}>Sign Up Now</button>
            </div>
          ) : (
            <div className="text-[gray]">
              Already have account? <button type="button" className="text-white hover:underline" onClick={() => toggleAuth('signin')}>Sign In</button>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  )
}

export default AuthPage