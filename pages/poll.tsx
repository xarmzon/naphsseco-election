import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import React, { useEffect, useState } from 'react'
import ResultCard from '../components/Card/ResultCard'
import Layout from '../components/layout/Layout'
import Spinner from '../components/Loader/Spinner'
import Timer from '../components/Timer'
import { connectDB } from '../libs/connectDB'
import { POSTS_CONST } from '../libs/constants'
import Student from '../schema/Students'
import Vote from '../schema/Vote'

export interface IResultPage {
  children?: React.ReactNode
  votingDataS: any
}

const ResultPage = ({ votingDataS, children }: IResultPage) => {
  const [loadingStudent, setLoadingStudent] = useState<boolean>(true)
  const [votingData, setVotingData] = useState<any[]>([])
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
          <h1 className="my-6 text-xl font-bold text-gray-600">PRESIDENT</h1>
          <div className="grid gap-y-5  md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[0].map((d: any, i: number) => (
              <ResultCard key={i} candidate={d} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            GENERAL SECRETARY
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[1].map((d: any, i: number) => (
              <ResultCard key={i} candidate={d} />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            ASST. GENERAL SECRETARY
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[2].map((d: any, i: number) => (
              <ResultCard key={i} candidate={d} />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            WELFARE SECRETARY
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[3].map((d: any, i: number) => (
              <ResultCard key={i} candidate={d} />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            FINANCIAL SECRETARY
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[4].map((d: any, i: number) => (
              <ResultCard key={i} candidate={d} />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            PUBLIC RELATION OFFICER(P.R.O)
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[5].map((d: any, i: number) => (
              <ResultCard key={i} candidate={d} />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h1 className="my-6 text-xl font-bold text-gray-600">
            STUDENT REPRESENTATIVE COUNCIL(SRC)
          </h1>
          <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {votingData[6].map((d: any, i: number) => (
              <ResultCard key={i} candidate={d} />
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

  if (votingData.length > 0) {
    const president = votingData.filter((d) => d.post === POSTS_CONST.PRESIDENT)
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

    votingData = [president, genSec, aGenSec, welfare, fin, pro, src]
  }

  return {
    props: {
      votingDataS: JSON.stringify(votingData),
    },
  }
}

export default ResultPage
