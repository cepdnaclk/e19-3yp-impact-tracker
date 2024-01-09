import styles from "./Card.module.scss";
import { MdClose } from "react-icons/md";
import PlayerInfo from "./PlayerInfo";
import MonitoringElements from "./MonitoringElements";
import { useAppState } from "../../../states/appState";

type metrics = {
  speed: number;
  distance: number;
};

// type latestImpact = {
//   value: number;
//   time: Date;
//   direction: "TOP" | "BOTTOM" | "LEFT" | "RIGHT" | "FRONT" | "BACK";
// };

interface MonitoringCardProps {
  buddy_id: number;
  onClick: (buddy_id: number) => void;
}
const MonitoringCard = ({ buddy_id, onClick }: MonitoringCardProps) => {
  const metrics = {
    speed: 10,
    distance: 100,
  } as metrics;

  const playerId = useAppState((state) => state.playerMap[buddy_id]);
  const buddyImpact = useAppState((state) => state.playersImpact[playerId]);
  return (
    <div className={styles.card}>
      <MdClose
        className={`${styles.actionBtn} ${styles.close}`}
        tabIndex={0}
        onClick={() => onClick(buddy_id)}
      />
      <PlayerInfo buddy_id={buddy_id} />
      <MonitoringElements
        key={playerId}
        metrics={metrics}
        latestImpact={buddyImpact}
        playerId={playerId}
      />
    </div>
  );
};

export default MonitoringCard;
