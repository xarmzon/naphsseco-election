import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface ITimerContext {
  setTimeExpired: Dispatch<SetStateAction<boolean>>
  timeExpired: boolean
}

export const TimerContext = createContext<ITimerContext | null>(null)

interface IProvider {
  children: React.ReactNode
}

const TimerProvider = ({ children }: IProvider) => {
  const [timeExpired, setTimeExpired] = useState<boolean>(true)

  return (
    <TimerContext.Provider value={{ timeExpired, setTimeExpired }}>
      {children}
    </TimerContext.Provider>
  )
}

export default TimerProvider
