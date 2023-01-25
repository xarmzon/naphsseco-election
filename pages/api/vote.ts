import { timeElapsed } from './../../libs/timer'
import { HTTP_REQUEST_CODES, HTTP_RESPONSE_MSG } from './../../libs/constants'
import { connectDB } from './../../libs/connectDB'
import { NextApiRequest, NextApiResponse } from 'next'
import Student from '../../schema/Students'
import { verify } from 'jsonwebtoken'
import Vote from '../../schema/Vote'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  const { method } = req

  switch (method) {
    case 'POST':
      const [h, m, s, done, dd] = timeElapsed()
      if (done)
        return res
          .status(HTTP_REQUEST_CODES.BAD_REQUEST)
          .json({ msg: 'Sorry! Voting has ended' })

      const { votes, token }: { votes: string[]; token: string } = req.body
      let canVote = true
      let msg: string = ''
      let studentData: any
      if (!votes || votes?.length === 0)
        return res
          .status(HTTP_REQUEST_CODES.BAD_REQUEST)
          .json({ msg: 'Votes data missing' })

      try {
        const tokenData: any = verify(token, process.env.SECRET_KEY!)

        studentData = await Student.findOne({
          matric: tokenData?.matric?.toUpperCase(),
        })
        if (!studentData || studentData?.otp !== tokenData.otp) {
          canVote = false
          msg = 'Invalid Student Data or OTP'
        } else if (studentData && studentData.voted === true) {
          canVote = false
          msg = "Sorry, you can't vote twice"
        }
      } catch (err) {
        canVote = false
        msg = 'Invalid Token Supplied'
      }
      if (!canVote)
        return res.status(HTTP_REQUEST_CODES.BAD_REQUEST).json({ msg })

      try {
        await Promise.all(
          votes.map(
            async (matric) =>
              await Vote.updateOne({ matric }, { $inc: { count: 1 } })
          )
        )

        studentData.voted = true
        await studentData.save()
        return res
          .status(HTTP_REQUEST_CODES.CREATED)
          .json({ msg: 'Your votes has be casted successfully.' })
      } catch (err: any) {
        console.log(err)
        console.log(err.message)
        return res.status(HTTP_REQUEST_CODES.SERVER_ERROR).json({
          msg: 'Error occurred while recording your votes. Please try again or contact the administrator',
        })
      }
      break
    default:
      return res
        .status(HTTP_REQUEST_CODES.METHOD_NOT_ALLOWED)
        .json({ msg: HTTP_RESPONSE_MSG.METHOD_NOT_ALLOWED })
      break
  }
}

export default handler
