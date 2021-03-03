import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';
import { signIn, useSession } from 'next-auth/client'
import { DarkModeSwitch } from '../components/DarkModeSwitch';

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface Session {
  user: {
    image?: string
    name?: string
    email?: string
  }
}

interface ChallengeContexData {
  level: number 
  currentExperience: number 
  challangeCompleted: number 
  experienceToNextLevel: number
  activeChallenge: Challenge
  resetChallenge: () => void
  levelUp: () => void
  startNewChallange: () => void
  compleChallenge: () => void
  closeLevelUpModal: () => void
  session: Session 
}

interface ChallengeProviderProps {
  children: ReactNode
  level: number 
  currentExperience: number
  challangeCompleted: number
}

export const ChallangeContext = createContext({} as ChallengeContexData);

export function ChallangeProvider({ children, ...rest }: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setExperience] = useState(rest.currentExperience ?? 0)
  const [challangeCompleted, setChallangeCompleted] = useState(rest.challangeCompleted ?? 0)

  const [activeChallenge, setActivechallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const [ session, loading ] = useSession()

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challangeCompleted', String(challangeCompleted))
  }, [level, currentExperience, challangeCompleted])

  const levelUp = () => {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true);
  }

  const resetChallenge = () => {
    setActivechallenge(null)
  }

  const compleChallenge = () => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setExperience(finalExperience)
    setActivechallenge(null)
    setChallangeCompleted(challangeCompleted + 1)
  }

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  const startNewChallange = () => {
    const getRadomChallenge = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[getRadomChallenge]

    setActivechallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('New challenge 🎉', {
        body: `Get ${challenge.amount} Exp`
      })
    }
  }

  return (
    <ChallangeContext.Provider 
    value={{ 
      level, 
      currentExperience, 
      challangeCompleted, 
      levelUp, 
      startNewChallange, 
      activeChallenge, 
      resetChallenge,
      experienceToNextLevel,
      compleChallenge,
      closeLevelUpModal,
      session,
       }}>

      <DarkModeSwitch />

      {!session && <>
        Not signed in <br/>
        <button onClick={(): Promise<void> => signIn('google')}>Sign in</button>
      </>}
      {session && <>

        {children}
        { isLevelUpModalOpen ? <LevelUpModal /> : null }

      </>}
      {loading ? (<h1>Loading</h1>) : null}

    </ChallangeContext.Provider>
  )
}