import React from "react";
import styles from "./PlayerInfo.module.scss";
import Battery from "../../Battery/Battery";
import { useAppState } from "../../../states/appState";

const PlayerInfo: React.FC<{ buddy_id: number }> = ({ buddy_id }) => {
  const jersey_no = useAppState((state) => state.playerMap[buddy_id]);
  const playerInfo = useAppState((state) => state.playerDetails[jersey_no]);
  const batteryLevel = useAppState(
    (state) => state.buddiesStatus[buddy_id].battery
  );

  return (
    <div className={styles.playerInfo}>
      <p className={styles.jerseyNo}>{jersey_no.toString()}</p>
      <div className={styles.name}>
        <p className={styles.playerName}>{playerInfo.name}</p>
        <div className={styles.device}>
          Buddy #{buddy_id} <Battery batteryLevel={batteryLevel} />
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
