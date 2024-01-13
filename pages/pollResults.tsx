import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import React, { useContext, useEffect, useState } from 'react'
import ResultCard from '../components/Card/ResultCard'
import Layout from '../components/layout/Layout'
import Spinner from '../components/Loader/Spinner'
import Timer from '../components/Timer'
import { connectDB } from '../libs/connectDB'
import Vote from '../schema/Vote'
import { TCandidate } from './vote'

export interface IResultPage {
  votingDataS: any
}

export type TResult = TCandidate & {
  count: number
}

const ResultPage = ({ votingDataS }: IResultPage) => {
  const [loadingStudent, setLoadingStudent] = useState<boolean>(true)
  const [votingData, setVotingData] = useState<Record<
    string,
    TResult[]
  > | null>(null)
  useEffect(() => {
    setVotingData(JSON.parse(votingDataS))
    setLoadingStudent(false)
  }, [votingDataS])
  if (loadingStudent) {
    return (
      <Layout>
        <NextSeo title="Results" />
        <div className="flex h-[calc(100vh-150px)] items-center justify-center">
          <Spinner size="large" bg="primary" showLoadingText />
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <NextSeo title="Results" />
      <div className="mb-5 flex flex-col justify-center p-5 text-center text-5xl font-black text-slate-800">
        POLL RESULTS
      </div>
      <div className="flex flex-col justify-center">
        <Timer />
      </div>
      <div className="mb-6 p-5">
        <div className="text-center">
          <div className="flex flex-col gap-12 text-center">
            {votingData &&
              Object.keys(votingData).map((post) => (
                <div key={post}>
                  <h1 className="my-6 text-xl font-bold text-gray-600">
                    {post}
                  </h1>
                  <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:justify-center">
                    {votingData[post].map((candidate) => (
                      <ResultCard key={candidate.name} candidate={candidate} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB()

  let votingData = []

  votingData = await Vote.find()

  votingData = votingData.reduce((prev, data) => {
    const details = {
      name: data.name,
      matric: data.matric,
      nick_name: data.nick_name,
      department: data.department,
      post: data.post,
      level: data.level,
      count: data.count,
    }
    if (Object.keys(prev).includes(data.post)) {
      prev[data.post].push(details)
    } else {
      prev[data.post] = [details]
    }
    return prev
  }, {})

  return {
    props: {
      votingDataS: JSON.stringify(votingData),
    },
  }
}

export default ResultPage
