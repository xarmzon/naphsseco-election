import Image from 'next/image'
import React from 'react'
import { POSTS_CONST } from '../../libs/constants'
import { TCandidate } from '../../pages/vote'

export interface ICandidate {
  candidate: TCandidate
  type?: 'radio' | 'checkbox'
  voteCandidate: (matric: string) => void
}

const Candidate = ({
  voteCandidate,
  candidate,
  type = 'radio',
}: ICandidate) => {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-7 bg-gradient-to-tr from-slate-100 to-primary/10 p-5 text-center shadow-lg">
      <div>
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full shadow">
          <Image
            src={`/images/${candidate.matric.replace('/', '-')}.jpg`}
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
        <input
          onChange={(e) => voteCandidate(candidate.matric)}
          type={type}
          className="h-6 w-6 text-primary ring-primary focus:ring-primary"
          value={candidate.matric}
          name={
            candidate.post.includes('SRC') ? candidate.matric : candidate.post
          }
        />
        {/* <button
          type="button"
          className={`cursor-pointer rounded-full border border-primary px-7 py-2 text-primary`}
        >
          VOTE
        </button> */}
      </div>
    </div>
  )
}

export default Candidate
