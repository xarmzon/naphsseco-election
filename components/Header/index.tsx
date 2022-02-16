import React from 'react'
import Logo from '../Logo'
import Navbar from '../Navbar'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 shadow-lg backdrop-blur-md">
      <div className="center-auto flex h-full items-center justify-between p-5 xl:p-0">
        <Logo />
        <Navbar />
      </div>
    </header>
  )
}

export default Header
