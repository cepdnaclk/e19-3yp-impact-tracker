import React from "react";
import Btn from "../../../Buttons/Btn";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./PlayerActions.module.scss";
const PlayerActions: React.FC<{ jerseyId: number }> = ({ jerseyId }) => {
  return (
    <div className={styles.actions}>
      <Btn
        buttonStyle="secondary"
        bgColor="rgba(255,255,255,0.08)"
        Icon={FaEdit}
      >
        edit
      </Btn>
      <Btn
        buttonStyle="secondary"
        bgColor="rgba(255,255,255,0)"
        Icon={FaTrash}
        iconSizeEm={1.2}
      >
        remove
      </Btn>
    </div>
  );
};

export default PlayerActions;
