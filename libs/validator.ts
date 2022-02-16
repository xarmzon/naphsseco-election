import { HTTP_REQUEST_CODES } from './constants'
import { NextApiResponse } from 'next'
export const validateSurname = (surname: string, res: NextApiResponse) => {
  if (!/^\w{3,}$/.test(surname)) {
    return res
      .status(HTTP_REQUEST_CODES.BAD_REQUEST)
      .json({ msg: 'Invalid surname supplied' })
  }
}
export const validateMatric = (matric: string, res: NextApiResponse) => {
  if (!(matric.length >= 8))
    return res
      .status(HTTP_REQUEST_CODES.BAD_REQUEST)
      .json({ msg: 'Invalid matric number supplied' })
}
export const validatePhone = (phone: string, res: NextApiResponse) => {
  if (!/^\d{11}$/.test(phone)) {
    return res
      .status(HTTP_REQUEST_CODES.BAD_REQUEST)
      .json({ msg: 'Invalid Phone Number supplied' })
  }
}
export const validateOTP = (otp: string, res: NextApiResponse) => {
  if (!/^\d{8}$/.test(otp)) {
    return res
      .status(HTTP_REQUEST_CODES.BAD_REQUEST)
      .json({ msg: 'Invalid OTP supplied' })
  }
}
