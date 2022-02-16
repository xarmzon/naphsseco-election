import React from 'react'
import { ILayout } from '../../libs/types'
import Footer from '../Footer'
import Header from '../Header'

const Layout = ({ children }: ILayout) => {
  return (
    <div className="overflow-hidden">
      <Header />
      <div className="mt-20">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
