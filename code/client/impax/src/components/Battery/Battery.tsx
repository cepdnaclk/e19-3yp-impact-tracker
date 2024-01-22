import React from "react";
import styles from "./Battery.module.scss";
const Battery: React.FC<{ batteryLevel: number }> = ({ batteryLevel }) => {
  const chargingSpecialValue: number = 200;

  if (
    batteryLevel != chargingSpecialValue &&
    (batteryLevel < 0 || batteryLevel > 100)
  )
    throw new Error("Battery Level should be in range(0,100)");

  //Change color of battery according to level
  let containerClasses = `${styles.batteryContainer} `;
  if (batteryLevel == chargingSpecialValue)
    containerClasses += `${styles.charging}`;
  else if (batteryLevel > 50) containerClasses += `${styles.good}`;
  else if (batteryLevel > 20) containerClasses += `${styles.medium}`;
  else containerClasses += `${styles.low}`;

  return (
    <div className={containerClasses}>
      <div className={styles.batteryOuter}>
        {batteryLevel == chargingSpecialValue ? (
          <div className={styles.batteryLevel}></div>
        ) : (
          <div
            className={styles.batteryLevel}
            style={{ width: `${batteryLevel}%` }}
          ></div>
        )}
      </div>
      <div className={styles.batteryBump}></div>
    </div>
  );
};

export default Battery;
