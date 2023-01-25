import React, { useContext, useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { timeElapsed } from '../../libs/timer'
import { TimerContext } from '../../store'
import VoteEnd from '../Card/VoteEnd'

const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  if (completed) {
    // Render a completed state
    return (
      <div className="text-center text-6xl font-bold text-red-600">
        Voting Closed
      </div>
    )
  } else {
    // Render a countdown
    return (
      <div className="flex flex-col text-center text-4xl font-black text-gray-600">
        <span className="text-xl font-light"> Time Left</span>{' '}
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      </div>
    )
  }
}

const Timer = () => {
  const timerContext = useContext(TimerContext)
  const [hours, setHours] = useState<number>(0)
  const [mins, setMins] = useState<number>(0)
  const [secs, setSecs] = useState<number>(0)

  useEffect(() => {
    let inter = setInterval(() => {
      const [hours, minutes, seconds, done, distance] = timeElapsed()
      if (timerContext?.timeExpired) {
        clearInterval(inter)
      }
      if (done) {
        timerContext?.setTimeExpired((prev) => true)
        clearInterval(inter)
      } else {
        setHours((prev) => {
          const t = hours as number
          return prev !== t ? t : prev
        })
        setMins((prev) => {
          const t = minutes as number
          return prev !== t ? t : prev
        })
        setSecs(seconds as number)
      }
    }, 1000)
    return () => {
      clearInterval(inter)
    }
  }, [timerContext])

  const formatTicks = (tick: number): string => String(tick).padStart(2, '0')
  return (
    <>
      <div className="flex flex-col pt-8 text-center text-4xl font-black text-gray-600">
        <span className="text-xl font-light"> Time Left</span>{' '}
        <span>
          {timerContext?.timeExpired ? (
            <VoteEnd />
          ) : (
            <span>
              {formatTicks(hours)}:{formatTicks(mins)}:{formatTicks(secs)}
            </span>
          )}
        </span>
      </div>
    </>
  )
}

export default Timer
