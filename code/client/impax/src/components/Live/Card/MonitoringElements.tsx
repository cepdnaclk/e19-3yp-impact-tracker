import React from "react";
import styles from "./MonitoringElements.module.scss";
import { MdSpeed } from "react-icons/md";
import { IoFootstepsSharp } from "react-icons/io5";
import { PiWarningOctagonFill } from "react-icons/pi";
import Btn from "../../Buttons/Btn";
import { FaHistory } from "react-icons/fa";
import { Impact } from "../../../types";

type metrics = {
  speed: number;
  distance: number;
};

const MonitoringElements: React.FC<{
  metrics?: metrics;
  latestImpact?: Impact;
  totalImpact?: number;
}> = ({ metrics, latestImpact, totalImpact }) => {
  const timeDiff = new Date().getTime() - 15 * 60 * 1000;

  // Convert the time difference to minutes
  const elapsedTimeInMins = Math.floor(timeDiff / (1000 * 60));
  const threshold = 10;

  //

  return (
    <>
      {/* <div className={styles.metrics}>
        <MetricItem Icon={MdSpeed} value={`${metrics.speed} kmph`} />
        <MetricItem Icon={IoFootstepsSharp} value={`${metrics.distance} m`} />
      </div> */}
      <div
        className={`${styles.impactContainer} ${
          elapsedTimeInMins < threshold && styles.newImpact
        }
            ${elapsedTimeInMins < threshold / 2 && styles.critical}`}
      >
        <div className={`${styles.impact} ${styles.latest}`}>
          <p className={styles.label}>
            Latest Impact:
            <span>
              {latestImpact !== undefined ? elapsedTimeInMins : "--"} mins
            </span>
          </p>
          <p className={styles.value}>
            {latestImpact !== undefined
              ? latestImpact.magntitude.toString() + " g"
              : "--"}
          </p>
          <p className={styles.direction}>
            From{" "}
            <span>
              {latestImpact !== undefined
                ? latestImpact.direction.toString()
                : "--"}
            </span>
          </p>
        </div>
        <div className={`${styles.impact} ${styles.total}`}>
          <p className={styles.label}>Total Impact</p>
          <p className={styles.value}>
            {totalImpact !== undefined ? totalImpact.toString() : "--"} g
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        <Btn Icon={PiWarningOctagonFill} bgColor="#252c3d">
          Mark as Concussion
        </Btn>
        <Btn
          Icon={FaHistory}
          buttonStyle="secondary"
          bgColor="rgba(125,125,125,0.2)"
        >
          Impact History
        </Btn>
      </div>
    </>
  );
};

const MetricItem: React.FC<{ Icon: React.ElementType; value: string }> = ({
  Icon,
  value,
}) => {
  return (
    <div className={styles.item}>
      <Icon className={styles.icon} />
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export default MonitoringElements;
