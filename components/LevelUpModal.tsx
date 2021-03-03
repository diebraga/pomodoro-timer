import styles from "../styles/components/LevelUpModal.module.css";
import { useContext } from "react";
import { ChallangeContext } from "../contexts/ChallengeContext";

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallangeContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Congratulaions</strong>
        <p>You reached a new level!! 🎉.</p>

        <button onClick={closeLevelUpModal} type="button">
          <img src="/icons/close.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
