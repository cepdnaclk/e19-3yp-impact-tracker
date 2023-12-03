import React from "react";
import styles from "./MonitorCard.module.scss";
import { MdClose, MdSpeed } from "react-icons/md";

const MonitorCard = () => {
  return (
    <div className={styles.card}>
      <MdClose className={styles.actionBtn} />
      <div className={styles.playerInfo}>
        <p className={styles.jerseyNo}>69</p>
        <div className={styles.name}>
          <p className={styles.playerName}>Angleo Mathews</p>
          <p className={styles.device}>Device #123</p>
        </div>
      </div>
      <div className={styles.metrics}>
        <div className={styles.item}>
          <MdSpeed className={styles.icon} />
          <span className={styles.value}>10kmph</span>
        </div>
      </div>
    </div>
  );
};

export default MonitorCard;
