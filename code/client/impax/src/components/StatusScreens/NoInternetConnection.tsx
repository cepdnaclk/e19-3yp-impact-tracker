import styles from "./NoInternetConnection.module.scss";
import { FiWifiOff } from "react-icons/fi";
const NoInternetConnection = () => {
  return (
    <div className={styles.container}>
      <h2>
        <FiWifiOff className={styles.icon} />
        No Internet Connection Available
      </h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis
        autem tempore consectetur ex praesentium quidem odit nesciunt officiis
        quo ratione.
      </p>
    </div>
  );
};

export default NoInternetConnection;
