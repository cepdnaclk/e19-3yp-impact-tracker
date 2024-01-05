import styles from "./Card.module.scss";
import { MdClose } from "react-icons/md";
import PlayerInfo from "./PlayerInfo";
import MonitoringElements from "./MonitoringElements";

type playerInfo = {
  jerseyNo: number;
  name: string;
  device: string;
};

type metrics = {
  speed: number;
  distance: number;
};

type latestImpact = {
  value: number;
  time: Date;
  direction: "TOP" | "BOTTOM" | "LEFT" | "RIGHT" | "FRONT" | "BACK";
};

interface MonitoringCardProps {
  playerInfo: playerInfo;
  metrics?: metrics;
  latestImpact?: latestImpact;
  totalImpact?: number;
}
const MonitoringCard = ({
  playerInfo,
  metrics,
  latestImpact,
  totalImpact,
}: MonitoringCardProps) => {
  return (
    <div className={styles.card}>
      <MdClose className={styles.actionBtn} tabIndex={0} />
      <PlayerInfo playerInfo={playerInfo} />
      <MonitoringElements
        metrics={metrics}
        latestImpact={latestImpact}
        totalImpact={totalImpact}
      />
    </div>
  );
};

export default MonitoringCard;
