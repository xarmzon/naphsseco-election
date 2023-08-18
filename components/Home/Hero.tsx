import React, { useState } from 'react'
import LoginForm from '../Form/LoginForm'
import OTPForm from '../Form/OTPForm'

export type TShow = 'otp' | 'login'

const Hero = () => {
  const [show, setShow] = useState<TShow>('login')

  return (
    <section className="center-auto mt-14 flex flex-col items-center justify-center space-y-5 px-5 md:mt-20 md:flex-row md:space-y-0 md:pt-20 lg:pt-32">
      <div className="flex max-w-sm flex-1 flex-col space-y-6 p-5 md:max-w-none">
        <h1 className="text-center text-4xl font-bold uppercase text-primary md:text-left md:text-5xl lg:text-7xl">
          Voting Made Simple
        </h1>
        <p className="text-center text-lg md:text-left lg:text-xl">
          Your opinions, your values, your vote. Vote the candidates that matter
          to you.
        </p>
      </div>
      <div className="flex h-44 flex-1 items-center justify-center md:h-full">
        {show === 'otp' ? (
          <OTPForm setShow={setShow} />
        ) : (
          <LoginForm setShow={setShow} />
        )}
      </div>
    </section>
  )
}

export default Hero
