import styles from "./Card.module.scss";
import { MdAdd } from "react-icons/md";
import PlayerInfo from "./PlayerInfo";

interface ActiveCardProps {
  buddy_id: number;
  onClick: (buddy_id: number) => void;
}
const ActiveCard = ({ buddy_id, onClick }: ActiveCardProps) => {
  return (
    <div className={styles.card}>
      <MdAdd
        className={`${styles.actionBtn} ${styles.add}`}
        tabIndex={0}
        onClick={() => onClick(buddy_id)}
      />
      <PlayerInfo buddy_id={buddy_id} />
    </div>
  );
};

export default ActiveCard;
