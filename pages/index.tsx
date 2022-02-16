import { useState } from 'react'
import Hero from '../components/Home/Hero'
import Layout from '../components/layout/Layout'
import Timer from '../components/Timer'

const Homepage = () => {
  return (
    <Layout>
      <Timer />
      <Hero />
    </Layout>
  )
}

export default Homepage
