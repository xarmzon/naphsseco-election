import { postsData } from './../../data/posts'
import { connectDB } from './../../libs/connectDB'
import {
  HTTP_REQUEST_CODES,
  HTTP_RESPONSE_MSG,
  POSTS_CONST,
} from './../../libs/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import Vote from '../../schema/Vote'
import Student from '../../schema/Students'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  const { method } = req

  switch (method) {
    case 'POST':
      const { insertType } = req.body
      switch (insertType) {
        case 'candidates':
          try {
            await Vote.deleteMany({})

            // const data = [
            //   ...postsData.PRESIDENT.map((d) => ({
            //     ...d,
            //     post: POSTS_CONST.PRESIDENT,
            //   })),
            //   ...postsData.GENERAL_SECRETARY.map((d) => ({
            //     ...d,
            //     post: POSTS_CONST.GENERAL_SECRETARY,
            //   })),
            //   postsData.ASST_GENERAL_SECRETARY.map((d) => ({
            //     ...d,
            //     post: POSTS_CONST.ASST_GENERAL_SECRETARY,
            //   })),
            //   ...postsData.WELFARE_SECRETARY.map((d) => ({
            //     ...d,
            //     post: POSTS_CONST.WELFARE_SECRETARY,
            //   })),
            //   ...postsData.FINANCIAL_SECRETARY.map((d) => ({
            //     ...d,
            //     post: POSTS_CONST.FINANCIAL_SECRETARY,
            //   })),
            //   postsData.PRO.map((d) => ({
            //     ...d,
            //     post: POSTS_CONST.PRO,
            //   })),
            //   ...postsData.SRC.map((d) => ({
            //     ...d,
            //     post: POSTS_CONST.SRC,
            //   })),
            // ]
            const data = Object.keys(postsData)
              .map((post) => {
                return postsData[post as keyof typeof postsData].map((data) => {
                  return {
                    ...data,
                    post,
                  }
                })
              })
              .reduce((prev, post) => {
                prev.push(...post)
                return prev
              }, [])

            const createdData = await Vote.create(data)
            console.log(createdData)
            return res.status(HTTP_REQUEST_CODES.CREATED).json({
              msg: 'CANDIDATES INSERTED SUCCESSFULLY',
            })
          } catch (err: any) {
            console.log(err)
            console.log(err.message)
            return res
              .status(HTTP_REQUEST_CODES.SERVER_ERROR)
              .json({ msg: HTTP_RESPONSE_MSG.UNKNOWN_ERROR })
          }
          break
        case 'students':
          const { students, deleteOld = false } = req.body

          if (!students)
            return res
              .status(HTTP_REQUEST_CODES.BAD_REQUEST)
              .json({ msg: HTTP_RESPONSE_MSG.BAD_REQUEST })

          try {
            console.log(students)
            deleteOld && (await Student.deleteMany({}))

            const studentsData = students.map((d: any) => ({
              matric: d[0].toUpperCase(),
              name: d[1],
            }))

            console.log(studentsData)
            // await Student.create(studentsData)

            return res.status(HTTP_REQUEST_CODES.CREATED).json({
              msg: 'STUDENTS INSERTED SUCCESSFULLY',
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
            .status(HTTP_REQUEST_CODES.BAD_REQUEST)
            .json({ msg: HTTP_RESPONSE_MSG.BAD_REQUEST })
          break
      }
      break
    default:
      return res
        .status(HTTP_REQUEST_CODES.METHOD_NOT_ALLOWED)
        .json({ msg: HTTP_RESPONSE_MSG.METHOD_NOT_ALLOWED })
  }
}

export default handler
