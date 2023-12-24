import React from "react";
import styles from "./MappedDevice.module.scss";
import Battery from "../../Battery/Battery";
import SelectPlayer from "./SelectPlayer/SelectPlayer";
const MappedDevice: React.FC<{ deviceID: string; batteryLevel: number }> = ({
  batteryLevel,
  deviceID,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.deviceID}>
        Device {deviceID} <Battery batteryLevel={batteryLevel} />
      </div>
      <p>
        <span>Mapped To:</span>
      </p>
      <SelectPlayer />
    </div>
  );
};

export default MappedDevice;
