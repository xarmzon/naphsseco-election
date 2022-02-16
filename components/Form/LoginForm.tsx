import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaUserGraduate, FaUserTag } from 'react-icons/fa'
import { IoMdKey } from 'react-icons/io'

import api, { errorMessage } from '../../libs/fechter'
import { TShow } from '../Home/Hero'
import Spinner from '../Loader/Spinner'

export interface IUserData {
  matric: string
  otp: string
  surname: string
}

export interface ILoginForm {
  setShow: React.Dispatch<React.SetStateAction<TShow>>
}

const LoginForm = ({ setShow }: ILoginForm) => {
  const router = useRouter()
  const [userData, setUserData] = useState<IUserData>({
    matric: '',
    otp: '',
    surname: '',
  })

  const [loading, setLoading] = useState<boolean>(false)

  const handledChange = (name: string, val: string) => {
    setUserData((prev) => {
      return {
        ...prev,
        [name]: val,
      }
    })
  }
  const processOTPForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      userData.surname.length >= 3 &&
      userData.matric.length >= 8 &&
      /^\d{8}$/.test(userData.otp)
    ) {
      try {
        setLoading(true)
        toast.loading('Loading............')
        const {
          data: { msg, token },
        } = await api.post('/validateOTP', {
          ...userData,
        })

        toast.dismiss()
        toast.success(msg)
        router.push(`/vote?token=${encodeURIComponent(token)}`)
      } catch (e) {
        toast.dismiss()
        toast.error(errorMessage(e))
      }
    } else {
      toast.error('Please Fill the form properly')
    }
    setLoading(false)
  }
  return (
    <>
      <form
        onSubmit={processOTPForm}
        className="relative z-10 flex flex-col space-y-10 rounded-lg bg-gradient-to-tr from-white/40 to-white/60 p-5 pt-8 shadow-lg backdrop-blur-xl md:w-[85%]"
      >
        <div className="form flex items-center space-x-3 rounded-full border-[2px] py-2 px-3">
          <FaUserGraduate className="ml-3 h-5 w-5 text-primary" />
          <input
            value={userData.matric}
            onChange={(e) => handledChange(e.target.name, e.target.value)}
            className="flex-1 flex-shrink-0 border-none outline-none focus:ring-0"
            type="text"
            placeholder="Matriculation Number"
            name="matric"
            id="matric"
          />
        </div>
        <div className="form flex items-center space-x-3 rounded-full border-[2px] py-2 px-3">
          <FaUserTag className="ml-3 h-5 w-5 text-primary" />
          <input
            value={userData.surname}
            onChange={(e) => handledChange(e.target.name, e.target.value)}
            className="flex-1 flex-shrink-0 border-none outline-none focus:ring-0"
            type="text"
            placeholder="Your Surname"
            name="surname"
            id="surname"
          />
        </div>
        <div className="form flex items-center space-x-3 rounded-full border-[2px] py-2 px-3">
          <IoMdKey className="ml-3 h-5 w-5 text-primary" />
          <input
            value={userData.otp}
            onChange={(e) => handledChange(e.target.name, e.target.value)}
            className="flex-1 flex-shrink-0 border-none outline-none focus:ring-0"
            type="number"
            placeholder="Enter the OTP"
            name="otp"
            id="otp"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            disabled={loading}
            className="flex items-center justify-center space-x-2 rounded-full bg-primary px-5 py-2 text-white transition duration-300 hover:bg-primary/80 disabled:pointer-events-none disabled:cursor-none"
            type="submit"
          >
            {loading && <Spinner />}
            <span>Login</span>
          </button>
        </div>
        {/* <div className="flex cursor-pointer items-center justify-center">
          <span
            className="text-yellow-600"
            onClick={() => setShow((prev) => 'otp')}
          >
            Request OTP
          </span>
        </div> */}
        <span className="absolute -top-12 -left-6  h-12 w-12 rounded-full bg-gradient-to-bl from-primary/20 to-yellow-600/10" />
        {/* <span className="absolute -bottom-4 -right-4  h-12 w-12 rounded-full bg-gradient-to-bl from-primary/20 to-yellow-600/10" /> */}
        <span className="absolute top-1/2 left-1/2 -z-0 h-48 w-48  rounded-full bg-gradient-to-bl from-primary/10 to-yellow-600/10" />
      </form>
    </>
  )
}

export default LoginForm
