import { useContext, useState } from 'react'
import Hero from '../components/Home/Hero'
import Layout from '../components/layout/Layout'
import Timer from '../components/Timer'
import { TimerContext } from '../store'

const Homepage = () => {
  const timerContext = useContext(TimerContext)
  return (
    <Layout>
      {!timerContext?.timeExpired && <Timer />}
      <Hero />
    </Layout>
  )
}

export default Homepage
