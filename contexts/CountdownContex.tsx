import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { ChallangeContext } from '../contexts/ChallengeContext'

let countTimeOut: NodeJS.Timeout

interface CountDownData {
  minutes:number 
  seconds:number 
  hasFinished:boolean 
  isActive:boolean
  startCount: () => void
  breakCount: () => void
}

interface CountDownProviderProps {
  children: ReactNode
}

export const CountDownContext = createContext({} as CountDownData);

export function CountDownProvider(props: CountDownProviderProps) {
  const contextData = useContext(ChallangeContext)

  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setisActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const startCount = () => {
    setisActive(true)
  }

  const breakCount = () => {
    clearTimeout(countTimeOut)
    setisActive(false)
    setTime((0.1 * 60))
    setHasFinished(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countTimeOut = setTimeout(() => {
        setTime(time -1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setisActive(false)
      contextData.startNewChallange()
    }
  }, [isActive, time])

  return (
    <CountDownContext.Provider 
    value={{ 
      minutes, 
      seconds, 
      hasFinished, 
      isActive, 
      startCount, 
      breakCount, 
       }}>
      {props.children}
    </CountDownContext.Provider>
  )
}