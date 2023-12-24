import React from "react";
import styles from "./PlayerInfo.module.scss";
import Battery from "../../Battery/Battery";
type playerInfo = {
  jerseyNo: number;
  name: string;
  device: string;
};

const PlayerInfo: React.FC<{ playerInfo: playerInfo }> = ({ playerInfo }) => {
  return (
    <div className={styles.playerInfo}>
      <p className={styles.jerseyNo}>{playerInfo.jerseyNo.toString()}</p>
      <div className={styles.name}>
        <p className={styles.playerName}>{playerInfo.name}</p>
        <div className={styles.device}>
          Device {playerInfo.device} <Battery batteryLevel={60} />
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
