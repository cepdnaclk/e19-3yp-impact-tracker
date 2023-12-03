import React from "react";
import styles from "./MonitorCard.module.scss";
import { MdClose, MdSpeed } from "react-icons/md";
import { IoFootstepsSharp } from "react-icons/io5";
import { PiWarningOctagonFill } from "react-icons/pi";
import Btn from "../Buttons/Btn";
import { FaHistory } from "react-icons/fa";
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
        <MetricItem Icon={MdSpeed} value="10 kmph" />
        <MetricItem Icon={IoFootstepsSharp} value="100 m" />
      </div>

      <div className={styles.impactContainer}>
        <div className={`${styles.impact} ${styles.latest}`}>
          <p className={styles.label}>Latest Impact</p>
          <p className={styles.value}>20 g</p>
          <p className={styles.direction}>
            From <span>TOP</span>
          </p>
        </div>
        <div className={`${styles.impact} ${styles.total}`}>
          <p className={styles.label}>Total Impact</p>
          <p className={styles.value}>179 g</p>
        </div>
      </div>
      <div className={styles.actions}>
        <Btn Icon={PiWarningOctagonFill} bgColor="#121212">
          Mark as Concussion
        </Btn>
        <Btn
          Icon={FaHistory}
          buttonType="secondary"
          bgColor="rgba(125,125,125,0.2)"
        >
          Impact History
        </Btn>
      </div>
    </div>
  );
};

export default MonitorCard;

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
