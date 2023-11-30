import React from "react";
import styles from "./Live.module.scss";
import { BsBroadcast } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import Btn from "../Buttons/Btn";
import MonitorCard from "./MonitorCard";
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
        <div className={styles.controls}>
          <Btn Icon={FaEdit} buttonType="secondary">
            Edit Session
          </Btn>
          <Btn Icon={IoMdExit}>Exit Session</Btn>
        </div>
      </div>

      <div className={styles.monitoring}>
        <h3>Monitoring Players</h3>
        <div className={styles.grid}>
          <MonitorCard />
          <MonitorCard />
          <MonitorCard />
          <MonitorCard />
          <MonitorCard />
        </div>
      </div>
    </main>
  );
};

export default Live;
