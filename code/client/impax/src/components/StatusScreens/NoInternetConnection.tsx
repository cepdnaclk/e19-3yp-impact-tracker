import styles from "./status.module.scss";
import { FiWifiOff } from "react-icons/fi";
const NoInternetConnection = () => {
  return (
    <div className={styles.container}>
      <h2>
        <FiWifiOff className={styles.icon} />
        No Internet Connection Available
      </h2>
      <p>
        You have not connected to the internet, if you are connected to the
        IMPAX Hub's wifi, disconnect and connect to your own wifi network with
        internet connection.
      </p>
    </div>
  );
};

export default NoInternetConnection;
