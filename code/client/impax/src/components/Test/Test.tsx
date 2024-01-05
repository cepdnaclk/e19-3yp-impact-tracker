import styles from "./Test.module.scss";
import { BsBroadcast } from "react-icons/bs";
import { useAppState } from "../../store/appState";

const Live = () => {
  const isInternetAvailable = useAppState((state) => state.isInternetAvailable);
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <BsBroadcast className={styles.icon} />

        <h1>
          {isInternetAvailable ? "Test" : "No Active Internet Connection"}
        </h1>
      </div>
      {isInternetAvailable && (
        <div className={styles.session}>
          <div className={styles.info}>
            <h2>Practice Session at Main Ground</h2>
            <span>Session #21</span>
          </div>
          <div className={styles.controls}></div>
        </div>
      )}
    </main>
  );
};

export default Live;
