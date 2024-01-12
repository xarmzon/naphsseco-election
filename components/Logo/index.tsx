import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { APP_NAME } from '../../libs/constants'

const Logo = () => {
  return (
    <Link href="/">
      <a className="relative flex items-center space-x-1 text-primary">
        <div className="relative h-10 w-10 md:h-12 md:w-12">
          <Image
            src="/images/logo.png"
            layout="fill"
            alt="Logo"
            objectFit="contain"
          />
        </div>
        <h1 className="text-[14px] font-bold  md:text-lg lg:text-2xl">
          {APP_NAME}
        </h1>
        <span className="absolute -top-1 left-10 text-[9px] md:left-12 lg:text-[11px]">
          (2024)
        </span>
      </a>
    </Link>
  )
}

export default Logo
