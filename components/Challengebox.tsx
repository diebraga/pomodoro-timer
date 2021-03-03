import styles from '../styles/components/Chalangebox.module.css'
import { ChallangeContext } from '../contexts/ChallengeContext'
import { CountDownContext } from '../contexts/CountdownContex'
import { useContext } from 'react';

export function Chalangebox() {
  const { activeChallenge, resetChallenge, compleChallenge } = useContext(ChallangeContext)
  const { breakCount } = useContext(CountDownContext)

  function handleChallengeSuccedded() {
    compleChallenge()
    breakCount()
  }

  function handleChallengeFailed() {
    resetChallenge()
    breakCount()
  }

  return (
    <div className={styles.Chalangebox}>
      { activeChallenge ? (
        <div className={styles.ChalangeboxIsActive}>
          <header>{activeChallenge.amount} Exp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
            <strong>New chalange</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button type="button" className={styles.failedButton} onClick={handleChallengeFailed}>I failed</button>
            <button type="button" className={styles.completedButton} onClick={handleChallengeSuccedded}>I completed</button>
          </footer>
        </div>
      ) : (
        <>
        <div className={styles.ChalangeboxNotActive}>
          <strong>Start a cicle to get a chalange</strong>
          <p>
            <img src="icons/level-up.svg" alt=""/>
            Up levels completing chalanges
          </p>
        </div>
        </>
      )}
    </div>
  )
}