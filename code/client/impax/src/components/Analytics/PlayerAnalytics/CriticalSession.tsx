import React from "react";
import styles from "./CriticalSession.module.scss";

const CriticalSession: React.FC<{
  name: string;
  date: string;
  cumulative: number;
  average: number;
  highest: number;
}> = ({ name, date, cumulative, average, highest }) => {
  return (
    <div className={styles.session}>
      <div className={styles.sessionInfo}>
        <h3>{name}</h3>
        <p>{date}</p>
      </div>
      <div className={styles.impactsSummary}>
        <div className={styles.metric}>
          <p className={styles.title}>Cumulative Impact</p>
          <p className={styles.value}>{cumulative} g</p>
        </div>
        <div className={styles.metric}>
          <p className={styles.title}>Average Impact</p>
          <p className={styles.value}>{average} g</p>
        </div>
        <div className={styles.metric}>
          <p className={styles.title}>Highest Impact</p>
          <p className={styles.value}>{highest} g</p>
        </div>
      </div>
    </div>
  );
};

export default CriticalSession;
