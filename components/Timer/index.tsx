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
  const [days, setDays] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [mins, setMins] = useState<number>(0)
  const [secs, setSecs] = useState<number>(0)

  useEffect(() => {
    let inter = setInterval(() => {
      const [hours, minutes, seconds, done, distance, days] = timeElapsed()
      if (timerContext?.timeExpired) {
        clearInterval(inter)
      }
      if (done) {
        timerContext?.setTimeExpired((prev) => true)
        clearInterval(inter)
      } else {
        setDays((prev) => {
          const t = days as number
          return prev !== t ? t : prev
        })
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
        <h3 className="mb-3 text-xl font-light"> Time Left</h3>{' '}
        <div>
          {timerContext?.timeExpired ? (
            <VoteEnd />
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <TimerDisplay value={formatTicks(days)} text="Day" />
              <TimerDisplay value={formatTicks(hours)} text="Hour" />
              <TimerDisplay value={formatTicks(mins)} text="Min" />
              <TimerDisplay value={formatTicks(secs)} text="Sec" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Timer

const TimerDisplay = ({ value, text }: { value: string; text: string }) => {
  return (
    <div className=" relative flex min-w-[75px] flex-col items-center justify-center rounded-md bg-gradient-to-br from-green-300 via-[rgba(9,134,102,0.8)] to-green-400 p-2 text-center text-slate-100 shadow-md">
      <span className="text-5xl">{value}</span>
      <span className="text-sm font-normal">
        {text}
        {Number(value) !== 1 ? 's' : ''}
      </span>
      <div className="absolute -top-1 -right-1 h-4 w-4 animate-spin rounded-full bg-gradient-to-tr from-amber-200 to-amber-500 shadow-sm"></div>
    </div>
  )
}
