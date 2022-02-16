import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { navLinks } from '../../libs/constants'

const Navbar = () => {
  const router = useRouter()
  const navName =
    router.pathname.length < 2 ? '' : router.pathname.split('/')[1]
  return (
    <nav className="flex h-full items-center space-x-4">
      {navLinks.map((link, i) => (
        <Link href={`/${link}`} key={i}>
          <a
            className={`group relative capitalize ${
              navName === link && 'text-primary'
            } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full`}
          >
            {link}
          </a>
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
