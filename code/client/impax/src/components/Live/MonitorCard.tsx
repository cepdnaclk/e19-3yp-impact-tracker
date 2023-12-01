import React from "react";
import styles from "./MonitorCard.module.scss";

const MonitorCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.playerInfo}>
        <p className={styles.jerseyNo}>69</p>
        <div className={styles.name}>
          <p className={styles.playerName}>Angleo Mathews</p>
          <p className={styles.device}>Device #123</p>
        </div>
      </div>
    </div>
  );
};

export default MonitorCard;
