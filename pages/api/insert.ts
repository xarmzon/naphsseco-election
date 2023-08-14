import { postsData } from './../../data/posts'
import { connectDB } from './../../libs/connectDB'
import { HTTP_REQUEST_CODES, HTTP_RESPONSE_MSG } from './../../libs/constants'
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
            const data = Object.keys(postsData)
              .map((post) => {
                return postsData[post as keyof typeof postsData].map((data) => {
                  return {
                    ...data,
                    post: post
                      .replaceAll('__bo__', '(')
                      .replaceAll('__bc__', ')')
                      .replaceAll('_', ' '),
                  }
                })
              })
              .reduce((prev, post) => {
                prev.push(...post)
                return prev
              }, [])
            await Vote.create(data)
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
            console.log(students, deleteOld)
            deleteOld && (await Student.deleteMany({}))

            const studentsData = students.map((d: Array<string>) => ({
              matric: String(d[0]).toUpperCase().trim(),
              name: String(d[1])
                .toUpperCase()
                .split(',')
                .map((t: string) => t.trim())
                .join(' '),
              department: d?.[2]?.trim()?.toUpperCase() ?? 'UNKNOWN',
            }))

            console.log(studentsData)
            await Student.create(studentsData)

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
