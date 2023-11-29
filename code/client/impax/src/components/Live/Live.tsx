import React from "react";
import styles from "./Live.module.scss";
import { BsBroadcast } from "react-icons/bs";
const Live = () => {
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <BsBroadcast className={styles.icon} />

        <h1>Live Dashboard</h1>
      </div>
      <div className={styles.session}>
        <div className={styles.info}>
          <h2>Practice Session at Main Ground</h2>
          <span>Session #21</span>
        </div>
        <div className={styles.controls}></div>
      </div>
    </main>
  );
};

export default Live;
