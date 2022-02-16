import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { APP_NAME } from '../../libs/constants'

const Logo = () => {
  return (
    <Link href="/">
      <a className="flex items-center space-x-1">
        <div className="relative h-10 w-10 md:h-12 md:w-12">
          <Image
            src="/images/logo.png"
            layout="fill"
            alt="Logo"
            objectFit="contain"
          />
        </div>
        <h1 className="text-[14px] font-bold text-primary md:text-lg lg:text-2xl">
          {APP_NAME}
        </h1>
      </a>
    </Link>
  )
}

export default Logo
