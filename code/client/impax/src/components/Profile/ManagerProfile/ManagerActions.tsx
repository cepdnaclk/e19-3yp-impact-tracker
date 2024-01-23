import React, { useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import styles from "./ManagerActions.module.scss";
import { FaCheck } from "react-icons/fa6";
import DialogModal from "../../Modal/DialogModal";
import Btn from "../../Buttons/Btn";
import AlertModal from "../../Modal/AlertModal";

const ManagerActions: React.FC<{ name: string; email: string }> = ({
  name,
  email,
}) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  return (
    <div className={styles.actions}>
      {/* <DialogModal
        open={openEdit}
        setOpen={setOpenEdit}
        title="Edit Manager Information"
        description="Note that changing manager's email will require them to verify their email again"
        trigger={
          <Btn
            key={email}
            buttonStyle="secondary"
            bgColor="rgba(255,255,255,0.08)"
            Icon={FaEdit}
          >
            edit
          </Btn>
        }
      >
        <form
          className={styles.editManagerForm}
          onSubmit={(e) => {
            e.preventDefault();
            setOpenEdit(false);
          }}
        >
          <label htmlFor="manager_name">Manager Name</label>
          <input
            type="text"
            name="manager_name"
            id="manager_name"
            placeholder="Johnathan Doe"
            value={name}
          />

          <label htmlFor="email">
            Manager Email
            <span className={styles.additionalInfo}>Link Impax Account</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            value={email}
          />
          <Btn type="submit" Icon={FaCheck}>
            Confirm Changes
          </Btn>
        </form>
      </DialogModal> */}
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
        description={`This action cannot be undone. This will permanently delete your
              the manager ${email} from your team.`}
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

export default ManagerActions;
