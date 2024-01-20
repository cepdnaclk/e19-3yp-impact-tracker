import React, { useState } from "react";
import Btn from "../../../Buttons/Btn";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import styles from "./PlayerActions.module.scss";
import AlertModal from "../../../Modal/AlertModal";
import DialogModal from "../../../Modal/DialogModal";
import { FaCheck } from "react-icons/fa6";
import { useAppState } from "../../../../states/appState";

const PlayerActions: React.FC<{ jerseyId: number }> = ({ jerseyId }) => {
  const playerDetails = useAppState((state) => state.playerDetails);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  return (
    <div className={styles.actions}>
      <DialogModal
        open={openEdit}
        setOpen={setOpenEdit}
        title="Edit Player Information"
        description="Note that changing player's email will require them to verify their email again"
        trigger={
          <Btn
            key={jerseyId}
            buttonStyle="secondary"
            bgColor="rgba(255,255,255,0.08)"
            Icon={FaEdit}
          >
            edit
          </Btn>
        }
      >
        <form
          className={styles.editPlayerForm}
          onSubmit={(e) => {
            e.preventDefault();
            setOpenEdit(false);
          }}
        >
          <label htmlFor="jersey_number">Jersey Number</label>
          <input
            type="number"
            name="jersey_number"
            id="jersey_number"
            placeholder="25"
            value={jerseyId}
          />
          <label htmlFor="name">Player Name</label>
          <input
            type="text"
            name="name"
            placeholder="Johnathan Doe"
            value={playerDetails[jerseyId].name}
          />
          <label htmlFor="email">
            Player's Email (Optional)
            <span className={styles.additionalInfo}>Link Impax Account</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            value={playerDetails[jerseyId].email}
          />
          <Btn type="submit" Icon={FaCheck}>
            Confirm Changes
          </Btn>
        </form>
      </DialogModal>
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
