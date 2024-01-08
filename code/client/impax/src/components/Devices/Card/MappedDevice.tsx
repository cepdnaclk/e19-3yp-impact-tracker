import React from "react";
import styles from "./MappedDevice.module.scss";
import Battery from "../../Battery/Battery";
import SelectPlayer from "./SelectPlayer/SelectPlayer";

const MappedDevice: React.FC<{
  buddyID: number;
  playerID?: number;
  batteryLevel: number;
  options: { value: string; label: string }[];
}> = ({ batteryLevel, buddyID, options, playerID }) => {
  return (
    <div className={styles.card}>
      <div className={styles.buddyID}>
        Buddy #{buddyID} <Battery batteryLevel={batteryLevel} />
      </div>
      <p>
        <span>Mapped To:</span>
      </p>
      <SelectPlayer options={options} buddyID={buddyID} playerID={playerID} />
    </div>
  );
};

export default MappedDevice;
