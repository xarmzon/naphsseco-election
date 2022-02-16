import React, { useContext } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { TimerContext } from '../../store'

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
  return (
    <Countdown
      //   date={new Date(2022, 2, 16, 17, 0, 0, 0)}
      date={new Date(2022, 2, 16, 7, 28, 0, 0)}
      onComplete={() => timerContext?.setTimeExpired(true)}
      autoStart
      renderer={renderer}
      className="text-center"
    />
  )
}

export default Timer
