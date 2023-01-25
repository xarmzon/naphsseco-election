import { HTTP_REQUEST_CODES } from './constants'
import { NextApiResponse } from 'next'
export const validateSurname = (surname: string) => {
  return /^\w{3,}$/.test(surname)
}
export const validateMatric = (matric: string) => {
  return matric.length >= 8
}
export const validatePhone = (phone: string, res: NextApiResponse) => {
  if (!/^\d{11}$/.test(phone)) {
    return res
      .status(HTTP_REQUEST_CODES.BAD_REQUEST)
      .json({ msg: 'Invalid Phone Number supplied' })
  }
}
export const validateOTP = (otp: string) => {
  return /^\d{8}$/.test(otp)
}
