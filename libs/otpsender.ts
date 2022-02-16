import { APP_NAME } from './constants'
import totp from 'totp-generator'

export const generateOTP = (len = 8) => {
  const otp = totp('JBSWY3DPEHPK3PXP', { digits: len })
  return otp
}
