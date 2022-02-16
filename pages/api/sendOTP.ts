import { connectDB } from './../../libs/connectDB'
import {
  validateMatric,
  validateSurname,
  validatePhone,
} from './../../libs/validator'
import {
  APP_NAME,
  HTTP_REQUEST_CODES,
  HTTP_RESPONSE_MSG,
} from './../../libs/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateOTP } from '../../libs/otpsender'
import Student from '../../schema/Students'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  await connectDB()
  switch (method) {
    case 'POST':
      try {
        const { matric, surname, phone } = req.body

        validateMatric(matric, res)
        validateSurname(surname, res)
        validatePhone(phone, res)

        const studentData = await Student.findOne({
          matric: matric.toUpperCase(),
        })
        if (!studentData)
          return res
            .status(HTTP_REQUEST_CODES.BAD_REQUEST)
            .json({ msg: 'Invalid Matriculation Number' })

        const studentSurname = studentData.name.split(',')[0].toLowerCase()

        if (studentSurname !== surname.toLowerCase()) {
          return res.status(HTTP_REQUEST_CODES.BAD_REQUEST).json({
            msg: `Invalid  Surname for Matriculation Number ${matric}`,
          })
        }

        const otp = generateOTP()

        studentData.otp = otp

        await studentData.save()
        console.log(otp)
        const params = {
          api_token: process.env.SMS_API_TOKEN,
          from: APP_NAME.split(' ')[0],
          to: phone,
          body: `Your Voting OTP for 2022 ${APP_NAME} is ${otp}`,
        }
        await axios.post(
          'https://www.bulksmsnigeria.com/api/v1/sms/create',
          params
        )

        return res.status(HTTP_REQUEST_CODES.OK).json({
          msg: 'OTP sent successfully, check your phone message app for the OTP.',
        })
      } catch (err: any) {
        console.log(err)
        console.log(err.message)
        return res
          .status(HTTP_REQUEST_CODES.SERVER_ERROR)
          .json({ msg: HTTP_RESPONSE_MSG.OTP_SEND_ERROR })
      }
      break

    default:
      return res
        .status(HTTP_REQUEST_CODES.METHOD_NOT_ALLOWED)
        .json({ msg: HTTP_RESPONSE_MSG.METHOD_NOT_ALLOWED })
  }
}

export default handler
