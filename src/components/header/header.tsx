'use client'

import { AuthContext } from '@/context/auth.context';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { AiOutlineSearch, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { BiBellMinus } from 'react-icons/bi';
import NavMenu from '../nav-menu/nav-menu';

const Header = () => {
	const [scrolled, setScrolled] = useState(false)
  const {logout} = useContext(AuthContext)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

	return (
		<header className={`${scrolled && 'bg-[#141414] shadow-lg'}`}>
			<div className='flex items-center space-x-2 md:space-x-10'>
				<Image src={'/logo.svg'} alt={'logo'} width={56} height={56} className={'cursor-pointer object-contain'} />

        <NavMenu />
				<ul className='space-x-4 md:flex hidden'>
          {['Home', 'Movies', 'TV Shows', 'New', 'Popular'].map((item, index) => (
            <li key={index} className='navLink'>{item}</li>
          ))}
				</ul>
			</div>

			<div className='flex items-center space-x-4 text-sm font-light'>
        <AiOutlineSearch className='h-6 w-6 cursor-pointer' />
        <p className='hidden lg:inline'>Kids</p>
        <BiBellMinus className='h-6 w-6 cursor-pointer' />
        <Link href={'/account'}>
          <AiOutlineUser className='h-6 w-6 cursor-pointer' />
        </Link>
        <AiOutlineLogout className='h-6 w-6 cursor-pointer' onClick={logout} />
      </div>
		</header>
	);
};

export default Header