import styles from "./status.module.scss";
import { FiWifiOff } from "react-icons/fi";
const NoMqttConnection = () => {
  return (
    <div className={styles.container}>
      <h2>
        <FiWifiOff className={styles.icon} />
        IMPAX Hub is disconnected
      </h2>
      <p>
        Connect to the wifi access point of the IMPAX Hub to continue
        monitoring. The password is printed on IMPAX hub. If you cannot find the
        IMPAX Hub wifi, please check the power on IMPAX Hub
      </p>
    </div>
  );
};

export default NoMqttConnection;
