import styles from '../styles/components/CompletedChalanges.module.css'
import { ChallangeContext } from '../contexts/ChallengeContext'
import { useContext } from 'react';

export function CompletedChalanges() {
  const { challangeCompleted } = useContext(ChallangeContext)

  return (
    <div className={styles.CompletedChalangesContainer}>
      <span>Completed chalanges</span>
      <span>{challangeCompleted}</span>
    </div>
  )
}