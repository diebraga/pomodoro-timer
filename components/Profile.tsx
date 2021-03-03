import styles from '../styles/components/Profile.module.css'
import { ChallangeContext } from '../contexts/ChallengeContext'
import { useContext } from 'react';
import { signOut } from 'next-auth/client'

export function Profile() {
  const { level, session } = useContext(ChallangeContext)
  
  return (
    <div className={styles.profileContainer}>
      <img src={session.user.image} alt=""/>
      <div>
        <strong>{session.user.name}</strong>
        <a href="#" onClick={(): Promise<void> => signOut()}>Sign out</a>
        <p>
          <img src="icons/level.svg" alt=""/>
          Nv {level}
        </p>
      </div>
    </div>
  )
}