import { useContext } from 'react'
import styles from '../styles/components/Countdown.module.css'
import { CountDownContext } from '../contexts/CountdownContex'

export function Countdown() {
  const { hasFinished, isActive, breakCount, startCount, minutes, seconds } = useContext(CountDownContext)
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      <div className={styles.CountdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      { hasFinished ? (
        <button disabled className={`${styles.startCountButton}`}>
          Cicle finished
        </button>
      ) : (
        <>
          { isActive ? (
            <button onClick={breakCount} type="button" className={`${styles.startCountButton} ${styles.startCountButtonisActive}`}>
              Break cicle
            </button>
          ) : (
            <button onClick={startCount} type="button" className={styles.startCountButton}>
              Start cicle
            </button>
          ) }
        </>
      )}
    </div>
  )
}