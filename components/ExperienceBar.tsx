import styles from '../styles/components/ExperienceBar.module.css'
import { Box } from '@chakra-ui/react'
import { ChallangeContext } from '../contexts/ChallengeContext'
import { useContext } from 'react';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallangeContext)
  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <div>
        <Box Box w="100%" h="4px" bgGradient="linear(to-l, #7928CA, #FF0080)" style={{ width: `${percentToNextLevel}%` }}/>

        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} Exp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}