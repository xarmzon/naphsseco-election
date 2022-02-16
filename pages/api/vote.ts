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
      const { votes, token } = req.body
      let canVote = true
      let msg: string = ''
      let studentData: any
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
        const pt = await Vote.findOne({ matric: votes.pt })
        if (pt) {
          pt.count = pt.count + 1
          await pt.save()
        }
        const gs = await Vote.findOne({ matric: votes.gs })
        if (gs) {
          gs.count = gs.count + 1
          await gs.save()
        }
        const ags = await Vote.findOne({ matric: votes.ags })
        if (ags) {
          ags.count = ags.count + 1
          await ags.save()
        }
        const ws = await Vote.findOne({ matric: votes.ws })
        if (ws) {
          ws.count = ws.count + 1
          await ws.save()
        }
        const fn = await Vote.findOne({ matric: votes.fn })
        if (fn) {
          fn.count = fn.count + 1
          await fn.save()
        }
        const pr = await Vote.findOne({ matric: votes.pr })
        if (pr) {
          pr.count = pr.count + 1
          await pr.save()
        }

        votes.src.forEach(async (p: any) => {
          const d = await Vote.findOne({ matric: p })
          if (d) {
            d.count = d.count + 1
            await d.save()
          }
        })

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
