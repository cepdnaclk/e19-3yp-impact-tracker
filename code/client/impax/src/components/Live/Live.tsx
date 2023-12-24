import React from "react";
import styles from "./Live.module.scss";
import { BsBroadcast } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import Btn from "../Buttons/Btn";
import Title from "../Title/Title";
import MonitoringCard from "./Card/MonitoringCard";
import ActiveCard from "./Card/ActiveCard";
const Live = () => {
  //Time object of 15 mins and 5 mins before for testing
  const currentDate = new Date();
  const fifteenMinutesBefore = new Date(currentDate.getTime() - 15 * 60 * 1000);
  const fiveMinutesBefore = new Date(currentDate.getTime() - 4 * 60 * 1000);
  const eightMinutesBefore = new Date(currentDate.getTime() - 8 * 60 * 1000);

  return (
    <main className={styles.main}>
      <Title title="Live Dashboard" Icon={BsBroadcast} />
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
          <MonitoringCard
            key={69}
            playerInfo={{
              device: "#123",
              jerseyNo: 69,
              name: "Angelo Mathews",
            }}
            metrics={{
              speed: 13,
              distance: 200,
            }}
            latestImpact={{
              value: 10,
              direction: "TOP",
              time: fifteenMinutesBefore,
            }}
            totalImpact={12}
          />

          <MonitoringCard
            key={23}
            playerInfo={{
              device: "#112",
              jerseyNo: 23,
              name: "TM Dilshan",
            }}
            metrics={{
              speed: 8,
              distance: 450,
            }}
            latestImpact={{
              value: 50,
              direction: "FRONT",
              time: fiveMinutesBefore,
            }}
            totalImpact={120}
          />
          <MonitoringCard
            key={7}
            playerInfo={{
              device: "#12",
              jerseyNo: 7,
              name: "Dasun Shanaka",
            }}
            metrics={{
              speed: 3,
              distance: 50,
            }}
            latestImpact={{
              value: 10,
              direction: "TOP",
              time: eightMinutesBefore,
            }}
            totalImpact={90}
          />
        </div>
      </div>{" "}
      <div className={styles.active}>
        <h3>Active Players</h3>
        <div className={styles.grid}>
          <ActiveCard
            key={11}
            playerInfo={{
              device: "#22",
              jerseyNo: 11,
              name: "Kumar Sangakkara",
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default Live;
