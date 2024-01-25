import React, { useState } from "react";
import Btn from "../../../Buttons/Btn";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import styles from "./PlayerActions.module.scss";
import AlertModal from "../../../Modal/AlertModal";
import DialogModal from "../../../Modal/DialogModal";
import { FaCheck } from "react-icons/fa6";
import { useAppState } from "../../../../states/appState";
import { FieldValues, useForm } from "react-hook-form";
const PlayerActions: React.FC<{ jerseyId: number }> = ({ jerseyId }) => {
  const playerDetails = useAppState((state) => state.playerDetails);
  const setPlayerDetails = useAppState((state) => state.setPlayerDetails);
  const removePlayer = useAppState((state) => state.removePlayer);
  const editPlayer = useAppState((state) => state.editPlayer);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    // localStorage.setItem("playerDetails", JSON.stringify(players));

    setOpenEdit(false);
    editPlayer(jerseyId, data.name, data.email);
    // setPlayerDetails({
    //   ...playerDetails,
    //   [jerseyId]: {
    //     name: data.name,
    //     email: data.email,
    //     verification: playerDetails[jerseyId]?.verification,
    //   },
    // });
    // const response = await fetch("http://13.235.86.11:5000/exampleURL", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     // teamId: teamId,
    //     // password: password,
    //     // userName: email,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const responseData = await response.json();
    // if (response.ok) {
    //   // do something
    // }

    reset();
  };

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
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="jersey_number">Jersey Number</label>
          <input
            type="number"
            name="jersey_number"
            id="jersey_number"
            placeholder="25"
            disabled
            value={jerseyId}
          />
          <label htmlFor="name">Player Name</label>
          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder="Johnathan Doe"
            defaultValue={playerDetails[jerseyId]?.name || ""}
          />
          <label htmlFor="email">
            Player's Email (Optional)
            <span className={styles.additionalInfo}>Link Impax Account</span>
          </label>
          <input
            {...register("email")}
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            defaultValue={playerDetails[jerseyId]?.email || ""}
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
            onClick={() => {
              removePlayer(jerseyId);
            }}
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
