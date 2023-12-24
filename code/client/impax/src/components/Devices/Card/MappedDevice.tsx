import React from "react";
import styles from "./MappedDevice.module.scss";
import Battery from "../../Battery/Battery";

const MappedDevice = () => {
  return (
    <div className={styles.card}>
      <p className={styles.deviceID}>
        Device #1234 <Battery batteryLevel={66} />
      </p>
      <p>
        <span>Mapped To:</span>
      </p>
    </div>
  );
};

export default MappedDevice;
