import React from "react";
import styles from "./MonitoringElements.module.scss";
import { PiWarningOctagonFill } from "react-icons/pi";
import Btn from "../../Buttons/Btn";
import { FaHistory, FaTimes } from "react-icons/fa";
import { Impact } from "../../../types";
import AlertModal from "../../Modal/AlertModal";
import DialogModal from "../../Modal/DialogModal";

type metrics = {
  speed: number;
  distance: number;
};

const MonitoringElements: React.FC<{
  metrics?: metrics;
  latestImpact?: Impact;
  totalImpact?: number;
}> = ({ metrics, latestImpact, totalImpact }) => {
  const timeDiff = latestImpact ? Date.now() - latestImpact.timestamp : 0;

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
          latestImpact !== undefined &&
          elapsedTimeInMins < threshold &&
          styles.newImpact
        } ${
          latestImpact !== undefined &&
          elapsedTimeInMins < threshold / 2 &&
          styles.critical
        }
        `}
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
        <AlertModal
          trigger={
            <Btn Icon={PiWarningOctagonFill} bgColor="#252c3d">
              Mark as Concussion
            </Btn>
          }
          forceAction={true}
          title="Mark as Concussion"
          description="Are you sure you want to mark this impact as concussion?"
          action={
            <Btn Icon={PiWarningOctagonFill} bgColor="#252c3d">
              Confirm
            </Btn>
          }
          cancel={<Btn Icon={FaTimes}>Cancel</Btn>}
        />
        <DialogModal
          title="Impact History"
          description="View all the impacts recorded for this player 
        "
          trigger={
            <Btn
              Icon={FaHistory}
              buttonStyle="secondary"
              bgColor="rgba(125,125,125,0.2)"
            >
              Impact History
            </Btn>
          }
          confirmButton={<></>}
        />
      </div>
    </>
  );
};

// const MetricItem: React.FC<{ Icon: React.ElementType; value: string }> = ({
//   Icon,
//   value,
// }) => {
//   return (
//     <div className={styles.item}>
//       <Icon className={styles.icon} />
//       <span className={styles.value}>{value}</span>
//     </div>
//   );
// };

export default MonitoringElements;
