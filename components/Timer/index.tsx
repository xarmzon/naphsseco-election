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
    var inter = setInterval(() => {
      const [hours, minutes, seconds, done, distance] = timeElapsed()
      console.log(distance)
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
    // if (timerContext?.timeExpired) clearInterval(inter)
  }, [timerContext])

  return (
    <>
      {/* <Countdown
        //   date={new Date(2022, 2, 16, 17, 0, 0, 0)}
        date={1647426960000}
        onComplete={() => timerContext?.setTimeExpired(true)}
        renderer={renderer}
        className="text-center"
      /> */}

      <div className="flex flex-col text-center text-4xl font-black text-gray-600">
        <span className="text-xl font-light"> Time Left</span>{' '}
        <span>
          {timerContext?.timeExpired ? (
            <VoteEnd />
          ) : (
            <span>
              {hours}:{mins}:{secs}
            </span>
          )}
        </span>
      </div>
    </>
  )
}

export default Timer
