import React from "react";
import styles from "./MappedDevice.module.scss";
import Battery from "../../Battery/Battery";

const MappedDevice = () => {
  return (
    <div className={styles.card}>
      <div className={styles.deviceID}>
        Device #1234 <Battery batteryLevel={10} />
      </div>
      <p>
        <span>Mapped To:</span>
      </p>
    </div>
  );
};

export default MappedDevice;
