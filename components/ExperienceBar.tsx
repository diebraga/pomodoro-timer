import styles from '../styles/components/ExperienceBar.module.css'
import { ChallangeContext } from '../contexts/ChallengeContext'
import { useContext } from 'react';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallangeContext)
  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span >0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}/>

        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} Exp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}