import { MembershipPlan } from '@/components'
import { Subscription } from '@/interfaces/app.interface'
import { API_REQUEST } from '@/services/api.service'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineSubscriptions } from 'react-icons/md'
import moment from 'moment'

async function fetchSubscription(apiEndpoint: string): Promise<Subscription> {
  const subscription = await fetch(apiEndpoint).then(res => res.json())
  return subscription.subscription.data[0]
}

const AccountPage = async () => {
  const cookieStore = cookies()
  const id = cookieStore.get('user_id')?.value
  if (!id) {
    redirect('/auth')
  }

  const subscription = await fetchSubscription(`${API_REQUEST.subscription}/${id}`)

  return (
    <>
      <header>
        <div className="flex items-center space-x-2 md:space-x-10">
          <Link href={'/'}>
				    <Image src={'/logo.svg'} alt={'logo'} width={56} height={56} className={'cursor-pointer object-contain'} />
          </Link>
        </div>
        <div className='flex items-center space-x-4'>
        <Link href={'/account'}>
          <AiOutlineUser className='h-6 w-6 cursor-pointer' />
        </Link>
      </div>
      </header>

      <main className='mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10'>
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className='text-3xl md:text-4xl'>Account</h1>
          <div className="-ml-1 flex items-center gap-x-1.5">
            <MdOutlineSubscriptions className='w-5 h-5 text-red-500' />
            <p className='text-md font-semibol text-[#555]'>
              Member since {moment(subscription.current_period_start * 1000).format('DD MMM, yyyy')}
            </p>
          </div>
        </div>

        <MembershipPlan subscription={subscription} />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:pb-0">
          <h4 className='text-lg text-[gray]'>Plan Details</h4>
          <div className="col-span-2 font-medium">{subscription.plan.nickname}</div>
          <p className="text-blue-500 cursor-pointer hover:underline md:text-right">Change Plan</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:pb-0">
          <h4 className='text-lg text-[gray]'>Settings</h4>
          <p className="col-span-3 text-blue-500 cursor-pointer hover:underline">Sign out of all devices</p>
        </div>
      </main>
    </>
  )
}

export default AccountPage