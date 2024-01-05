import React from "react";
import styles from "./StartSession.module.scss";
import Btn from "../Buttons/Btn";
import { FaArrowRight } from "react-icons/fa";

const StartSession: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2>Start a new session</h2>
        <span>To track and monitor impacts, start a new session</span>
      </div>
      <form className={styles.sessionForm} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="session-name"
          id="session-name"
          placeholder="Enter Session Name"
        />
        <Btn
          type="submit"
          Icon={FaArrowRight}
          buttonStyle="primary"
          onClick={() => {}}
        >
          Start Session
        </Btn>
      </form>
    </div>
  );
};

export default StartSession;
