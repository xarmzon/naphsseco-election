import React, { Fragment, useContext, useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import Spinner from '../components/Loader/Spinner'
import Timer from '../components/Timer'
import { GetServerSideProps } from 'next'
import { connectDB } from '../libs/connectDB'
import Vote from '../schema/Vote'
import { verify } from 'jsonwebtoken'
import Student from '../schema/Students'
import { POSTS_CONST } from '../libs/constants'
import Candidate from '../components/Card/Candidate'
import api, { errorMessage } from '../libs/fechter'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { TimerContext } from '../store'
import VoteEnd from '../components/Card/VoteEnd'
import { NextSeo } from 'next-seo'
import StudentCard, { TStudent } from '../components/Card/StudentCard'

export interface IVotingPage {
  children?: React.ReactNode
  canVote: boolean
  votingDataS: any
  msg: string
  token: string
  studentData: string
}

export type TCandidate = {
  name: string
  matric: string
  nick_name: string
  department: string
  post: string
}

const VotingPage = ({
  canVote,
  votingDataS,
  msg,
  token,
  studentData,
}: IVotingPage) => {
  const timerContext = useContext(TimerContext)
  const [loadingStudent, setLoadingStudent] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [votingData, setVotingData] = useState<Record<
    string,
    TCandidate[]
  > | null>(null)
  const [showError, setShowError] = useState<boolean>(false)
  const [error, setError] = useState<string>('false')
  const [student, setStudent] = useState<TStudent>(() =>
    JSON.parse(studentData)
  )
  const [studentVotes, setStudentVotes] = useState<string[]>([])

  useEffect(() => {
    if (!canVote) {
      setShowError(true)
      setError(msg)
    } else {
      setVotingData(JSON.parse(votingDataS))
    }
    setLoadingStudent(false)
  }, [canVote, msg, votingDataS])

  useEffect(() => {
    if (studentData) {
      setStudent(JSON.parse(studentData))
    }
  }, [studentData])
  const processVote = async (e: React.FormEvent) => {
    e.preventDefault()
    // console.log(studentVotes)
    const formData = new FormData(e.target as HTMLFormElement)
    const parsedFormData: string[] = []
    for (let key of formData.keys()) {
      parsedFormData.push(formData.get(key) as string)
    }
    if (parsedFormData.length === 0) {
      toast.error('Please Vote at least a single candidate')
      return
    }
    setSubmitting(true)
    try {
      const {
        data: { msg },
      } = await api.post('vote', {
        votes: parsedFormData,
        token,
      })
      setSubmitted(true)
    } catch (err: any) {
      toast.error(errorMessage(err))
    }
    setSubmitting(false)
  }
  if (timerContext?.timeExpired) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-150px)] items-center justify-center">
          <h1 className="text-center text-xl font-bold text-red-600">
            <VoteEnd />
          </h1>
        </div>
      </Layout>
    )
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
        <div className="flex h-[calc(100vh-150px)] flex-col items-center justify-center gap-8">
          {student && <StudentCard student={student} />}
          <Spinner size="large" bg="primary" showLoadingText />
        </div>
      </Layout>
    )
  }
  if (showError) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-150px)] flex-col items-center justify-center gap-5">
          {student && <StudentCard student={student} />}
          <h1 className="text-center text-xl font-bold text-red-600">
            {error}
          </h1>
          <Link href="/">
            <a className="flex cursor-pointer items-center justify-center rounded-full border border-primary/60 px-7 py-2 text-lg text-primary/70">
              Homepage
            </a>
          </Link>
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <NextSeo title="Voting...." />
      <div className="flex flex-col justify-center">
        <Timer />
      </div>
      <StudentCard student={student} />
      <form className="p-5" onSubmit={processVote}>
        <div className="flex flex-col gap-12 text-center">
          {votingData &&
            Object.keys(votingData).map((post) => (
              <div key={post}>
                <h1 className="my-6 text-xl font-bold text-gray-600">{post}</h1>
                <div className="flex flex-col gap-5 md:flex-row md:flex-wrap">
                  {votingData[post].map((candidate) => (
                    <Candidate
                      key={candidate.name}
                      voteCandidate={(m) => {}}
                      candidate={candidate}
                    />
                  ))}
                </div>
              </div>
            ))}
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
  let studentData = null
  if (!token) {
    canVote = false
    msg = 'No Token Supplied'
  } else {
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
  }

  let votingData = []
  if (canVote) {
    votingData = await Vote.find()

    votingData = votingData.reduce((prev, data) => {
      if (Object.keys(prev).includes(data.post)) {
        const details = {
          name: data.name,
          matric: data.matric,
          nick_name: data.nick_name,
          department: data.department,
          post: data.post,
        }
        prev[data.post].push(details)
      } else {
        prev[data.post] = [data]
      }
      return prev
    }, {})
  }
  return {
    props: {
      canVote,
      msg,
      token,
      studentData: JSON.stringify({
        name: studentData?.name,
        matric: studentData?.matric,
        department: studentData?.department,
      }),
      votingDataS: JSON.stringify(votingData),
    },
  }
}

export default VotingPage
