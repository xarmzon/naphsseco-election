import { validateMatric, validateOTP } from './../../libs/validator'
import { HTTP_REQUEST_CODES, HTTP_RESPONSE_MSG } from './../../libs/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import Student from '../../schema/Students'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { matric, otp } = req.body

        console.log(matric, otp)
        validateMatric(matric, res)
        validateOTP(otp, res)

        const studentData = await Student.findOne({
          matric: matric.toUpperCase(),
        })
        if (!studentData)
          return res
            .status(HTTP_REQUEST_CODES.BAD_REQUEST)
            .json({ msg: 'Invalid Matriculation Number' })

        if (studentData.otp !== parseInt(otp) || studentData.otp !== 44881100)
          return res
            .status(HTTP_REQUEST_CODES.BAD_REQUEST)
            .json({ msg: 'Invalid OTP supplied. Please try again' })

        return res.status(HTTP_REQUEST_CODES.OK).json({
          msg: `Your otp has be validated successfully, you can now vote as ${studentData.name}`,
          token: sign(
            { matric, otp: studentData.otp },
            process.env.SECRET_KEY!
          ),
        })
      } catch (err: any) {
        console.log(err)
        console.log(err.message)
        return res
          .status(HTTP_REQUEST_CODES.SERVER_ERROR)
          .json({ msg: HTTP_RESPONSE_MSG.UNKNOWN_ERROR })
      }
      break

    default:
      return res
        .status(HTTP_REQUEST_CODES.METHOD_NOT_ALLOWED)
        .json({ msg: HTTP_RESPONSE_MSG.METHOD_NOT_ALLOWED })
  }
}

export default handler
