import React from "react";
import styles from "./Battery.module.scss";
const Battery: React.FC<{ batteryLevel: number }> = ({ batteryLevel }) => {
  if (batteryLevel < 0 || batteryLevel > 100)
    throw new Error("Battery Level should be in range(0,100)");
  return (
    <div className={styles.batteryContainer}>
      <div className={styles.batteryOuter}>
        <div
          className={styles.batteryLevel}
          style={{ width: `${batteryLevel}%` }}
        ></div>
      </div>
      <div className={styles.batteryBump}></div>
    </div>
  );
};

export default Battery;
