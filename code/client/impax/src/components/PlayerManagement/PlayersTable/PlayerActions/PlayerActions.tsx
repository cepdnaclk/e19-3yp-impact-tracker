import React from "react";
import Btn from "../../../Buttons/Btn";
import { FaCross, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import styles from "./PlayerActions.module.scss";
import AlertModal from "../../../Modal/AlertModal";

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
      <AlertModal
        trigger={
          <Btn
            buttonStyle="secondary"
            bgColor="rgba(255,255,255,0)"
            Icon={FaTrash}
            iconSizeEm={1.2}
          >
            remove
          </Btn>
        }
        title="Are you absolutely sure?"
        description=" This action cannot be undone. This will permanently delete your
              account and remove your data from our servers."
        cancel={
          <Btn
            Icon={FaTimes}
            buttonStyle="primary"
            iconSizeEm={1}
            bgColor="rgb(54, 57, 59)"
          >
            Cancel
          </Btn>
        }
        action={
          <Btn
            bgColor="transparent"
            buttonStyle="secondary"
            Icon={FaTrash}
            iconSizeEm={1}
          >
            Remove
          </Btn>
        }
      />
    </div>
  );
};

export default PlayerActions;
