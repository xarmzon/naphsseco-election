import React from 'react'
import { APP_NAME, RASTAARC } from '../../libs/constants'

const Footer = () => {
  return (
    <footer className="center-auto pt-8 pb-2">
      <div className="mt-2 flex justify-center px-5 text-center text-xs sm:text-sm md:px-3 md:text-lg">
        <p>
          &copy;{new Date().getFullYear()}, {APP_NAME}. All Right Reserved.
          Crafted and Developed by{' '}
          <a
            className="inline-block text-yellow-600 hover:text-yellow-700"
            href={RASTAARC.GITHUB}
            target="_blank"
            rel="noreferrer"
          >
            Rastaarc
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
