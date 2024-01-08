import React, { useState } from "react";
import styles from "./StartSession.module.scss";
import Btn from "../Buttons/Btn";
import { FaArrowRight } from "react-icons/fa";
import { useAppState } from "../../states/appState";
import { Session } from "../../types";
import { generateStringId } from "../../utils/utils";

const StartSession: React.FC = () => {
  const [sessionName, setSessionName] = useState<string>("");
  const setSessionDetails = useAppState((state) => state.setSessionDetails);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sessionName) return;
    const session = {
      session_name: sessionName,
      session_id: generateStringId(sessionName),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as Session;

    setSessionDetails(session);
  };
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2>Start a new session</h2>
        <span>To track and monitor impacts, start a new session</span>
      </div>
      <form className={styles.sessionForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="session-name"
          id="session-name"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
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
