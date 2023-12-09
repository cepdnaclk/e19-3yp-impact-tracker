import React from "react";
import styles from "./Card.module.scss";
import { MdAdd } from "react-icons/md";
import PlayerInfo from "./PlayerInfo";

type playerInfo = {
  jerseyNo: number;
  name: string;
  device: string;
};

interface ActiveCardProps {
  playerInfo: playerInfo;
}
const ActiveCard = ({ playerInfo }: ActiveCardProps) => {
  return (
    <div className={styles.card}>
      <MdAdd className={styles.actionBtn} />
      <PlayerInfo playerInfo={playerInfo} />
    </div>
  );
};

export default ActiveCard;
