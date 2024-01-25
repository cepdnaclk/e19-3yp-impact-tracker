import React, { useState } from "react";
import Btn from "../../../Buttons/Btn";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import styles from "./PlayerActions.module.scss";
import AlertModal from "../../../Modal/AlertModal";
import DialogModal from "../../../Modal/DialogModal";
import { FaCheck } from "react-icons/fa6";
import { useAppState } from "../../../../states/appState";
import { FieldValues, useForm } from "react-hook-form";
import { BASE_URL } from "../../../../config/config";
const PlayerActions: React.FC<{ jerseyId: number }> = ({ jerseyId }) => {
  const playerDetails = useAppState((state) => state.playerDetails);
  const removePlayer = useAppState((state) => state.removePlayer);
  const editPlayer = useAppState((state) => state.editPlayer);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: FieldValues) => {
    // localStorage.setItem("playerDetails", JSON.stringify(players));

    setOpenEdit(false);

    const response = await fetch(`${BASE_URL}/player/update`, {
      method: "PUT",
      body: JSON.stringify({
        fullName: data.name,
        playerEmail: data.email,
        jerseyId: jerseyId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      // for debugging
      // TODO:Test this
      console.log("response OK", responseData);
      editPlayer(jerseyId, data.name, data.email);
    }

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
            onClick={async () => {
              const response = await fetch(`${BASE_URL}/player/remove`, {
                method: "DELETE",
                body: JSON.stringify({
                  jerseyId: jerseyId,
                }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              });
              const responseData = await response.json();
              if (response.ok) {
                // for debugging
                console.log("response OK", responseData);
                removePlayer(jerseyId);
              }
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
