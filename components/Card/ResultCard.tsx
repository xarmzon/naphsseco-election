import Image from 'next/image'
import React from 'react'
import { POSTS_CONST } from '../../libs/constants'

export interface IResultCard {
  candidate: any
}

const ResultCard = ({ candidate }: IResultCard) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-7 bg-gradient-to-tr from-slate-100 to-primary/10 p-5 text-center shadow-lg">
      <div>
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full shadow">
          <Image
            src={`/images/${candidate.matric.split('/').join('-')}.png`}
            layout="fill"
            objectFit="cover"
            alt={`${candidate.name} image`}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-3">
        <h4 className="text-sm">{candidate.name}</h4>
        <h1 className="text-xl font-bold text-primary">
          {candidate.nick_name}
        </h1>
        <p className="text-xs text-gray-400">{candidate.department}</p>
        <div className="flex space-x-4 text-3xl font-black text-slate-900">
          <span>Votes:</span>
          <span>{candidate.count}</span>
        </div>
      </div>
    </div>
  )
}

export default ResultCard
