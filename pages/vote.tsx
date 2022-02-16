import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import Spinner from '../components/Loader/Spinner'
import Timer from '../components/Timer'
import { GetServerSideProps } from 'next'
import { connectDB } from '../libs/connectDB'
import Vote from '../schema/Vote'
import { JwtPayload, verify } from 'jsonwebtoken'
import Student from '../schema/Students'
import { DEPARTMENTS, POSTS_CONST } from '../libs/constants'
import Candidate from '../components/Card/Candidate'
import api, { errorMessage } from '../libs/fechter'
import toast from 'react-hot-toast'
import Link from 'next/link'

export interface IVotingPage {
  children?: React.ReactNode
  canVote: boolean
  votingDataS: any
  msg: string
  token: string
}

export interface IStudentVotes {
  pt: string
  gs: string
  ags: string
  ws: string
  fn: string
  pr: string
  src: any[]
}

const VotingPage = ({ canVote, votingDataS, msg, token }: IVotingPage) => {
  const [loadingStudent, setLoadingStudent] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [votingData, setVotingData] = useState<any[]>([])
  const [showError, setShowError] = useState<boolean>(false)
  const [error, setError] = useState<string>('false')

  const [studentVotes, setStudentVotes] = useState<IStudentVotes>({
    pt: '',
    gs: '',
    ags: '',
    ws: '',
    fn: '',
    pr: '',
    src: [],
  })

  useEffect(() => {
    if (!canVote) {
      setShowError(true)
      setError(msg)
    } else {
      setVotingData(JSON.parse(votingDataS))
    }
    setLoadingStudent(false)
  }, [canVote, msg, votingDataS])

  const processVote = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(studentVotes)
    setSubmitting(true)
    try {
      const {
        data: { msg },
      } = await api.post('vote', {
        votes: studentVotes,
        token,
      })
      setSubmitted(true)
    } catch (err: any) {
      toast.error(errorMessage(err))
    }
    setSubmitting(false)
  }
  if (submitted) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-150px)] flex-col items-center justify-center p-5 text-center text-primary">
          <h1 className="text-bold text-2xl text-primary">
            Thank you! Your votes has been recorded successfully
          </h1>
          <div className="mt-4">
            <Link href="/">
              <a className="flex cursor-pointer items-center justify-center rounded-full border border-primary/60 px-7 py-2 text-lg text-primary/70">
                Homepage
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }
  if (loadingStudent || submitting) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-150px)] items-center justify-center">
          <Spinner size="large" bg="primary" showLoadingText />
        </div>
      </Layout>
    )
  }
  if (showError) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-150px)] items-center justify-center">
          <h1 className="text-center text-xl font-bold text-red-600">
            {error}
          </h1>
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <Timer />
      <form className="p-5" onSubmit={processVote}>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">PRESIDENT</h1>
          <div className="grid gap-y-5  md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[0].map((d: any, i: number) => (
              <Candidate
                key={i}
                voteCandidate={(m) =>
                  setStudentVotes((prev) => ({ ...prev, pt: m }))
                }
                candidate={d}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            GENERAL SECRETARY
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[1].map((d: any, i: number) => (
              <Candidate
                voteCandidate={(m) =>
                  setStudentVotes((prev) => ({ ...prev, gs: m }))
                }
                key={i}
                candidate={d}
              />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            ASST. GENERAL SECRETARY
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[2].map((d: any, i: number) => (
              <Candidate
                voteCandidate={(m) =>
                  setStudentVotes((prev) => ({ ...prev, ags: m }))
                }
                key={i}
                candidate={d}
              />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            WELFARE SECRETARY
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[3].map((d: any, i: number) => (
              <Candidate
                voteCandidate={(m) =>
                  setStudentVotes((prev) => ({ ...prev, ws: m }))
                }
                key={i}
                candidate={d}
              />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            FINANCIAL SECRETARY
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[4].map((d: any, i: number) => (
              <Candidate
                voteCandidate={(m) =>
                  setStudentVotes((prev) => ({ ...prev, fn: m }))
                }
                key={i}
                candidate={d}
              />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            PUBLIC RELATION OFFICER(P.R.O)
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[5].map((d: any, i: number) => (
              <Candidate
                voteCandidate={(m) =>
                  setStudentVotes((prev) => ({ ...prev, pr: m }))
                }
                key={i}
                candidate={d}
              />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            STUDENT REPRESENTATIVE COUNCIL(SRC)
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[6].map((d: any, i: number) => (
              <Candidate
                voteCandidate={(m) =>
                  setStudentVotes((prev) => {
                    const n = [...prev.src]
                    n.push(m)
                    return {
                      ...prev,
                      src: n,
                    }
                  })
                }
                key={i}
                candidate={d}
              />
            ))}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center text-center">
          <button
            disabled={submitting}
            className="rounded-lg bg-primary px-7 py-3 text-gray-200"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB()
  const { query } = context

  let msg: string = ''
  const token: string = query?.token as string
  let canVote = true
  if (!token) {
    canVote = false
    msg = 'No Token Supplied'
  } else {
    try {
      const tokenData: any = verify(token, process.env.SECRET_KEY!)

      const studentData = await Student.findOne({
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
  }

  let votingData = []
  if (canVote) {
    votingData = await Vote.find()

    if (votingData.length > 0) {
      const president = votingData.filter(
        (d) => d.post === POSTS_CONST.PRESIDENT
      )
      const genSec = votingData.filter(
        (d) => d.post === POSTS_CONST.GENERAL_SECRETARY
      )
      const aGenSec = votingData.filter(
        (d) => d.post === POSTS_CONST.ASST_GENERAL_SECRETARY
      )
      const welfare = votingData.filter(
        (d) => d.post === POSTS_CONST.WELFARE_SECRETARY
      )
      const fin = votingData.filter(
        (d) => d.post === POSTS_CONST.FINANCIAL_SECRETARY
      )
      const pro = votingData.filter((d) => d.post === POSTS_CONST.PRO)

      const src = votingData.filter((d) => d.post === POSTS_CONST.SRC)

      //   const src = [
      //     votingData.filter(
      //       (d) =>
      //         d.post === POSTS_CONST.SRC &&
      //         d.department === DEPARTMENTS.MATHEMATICS
      //     ),
      //     votingData.filter(
      //       (d) =>
      //         d.post === POSTS_CONST.SRC && d.department === DEPARTMENTS.CHEMISTRY
      //     ),
      //     votingData.filter(
      //       (d) =>
      //         d.post === POSTS_CONST.SRC && d.department === DEPARTMENTS.GEOLOGY
      //     ),
      //     votingData.filter(
      //       (d) => d.post === POSTS_CONST.SRC && d.department === DEPARTMENTS.ICH
      //     ),
      //     votingData.filter(
      //       (d) =>
      //         d.post === POSTS_CONST.SRC && d.department === DEPARTMENTS.PHYSICS
      //     ),
      //     votingData.filter(
      //       (d) =>
      //         d.post === POSTS_CONST.SRC &&
      //         d.department === DEPARTMENTS.STATISTICS
      //     ),
      //   ]

      votingData = [president, genSec, aGenSec, welfare, fin, pro, src]
    }
  }
  return {
    props: {
      canVote,
      msg,
      token,
      votingDataS: JSON.stringify(votingData),
    },
  }
}

export default VotingPage
