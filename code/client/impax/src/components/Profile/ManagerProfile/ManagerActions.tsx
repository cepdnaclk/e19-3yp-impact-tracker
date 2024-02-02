import React from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import styles from "./ManagerActions.module.scss";

import Btn from "../../Buttons/Btn";
import AlertModal from "../../Modal/AlertModal";
import { BASE_URL } from "../../../config/config";
import { renewAccessToken } from "../../../services/authService";

const ManagerActions: React.FC<{
  name: string;
  email: string;
  handleAction: () => void;
}> = ({
  // name,
  email,
  handleAction,
}) => {
  // const [openEdit, setOpenEdit] = useState<boolean>(false);
  const removeManager = async () => {
    // react Delete request
    renewAccessToken();
    const response = await fetch(`${BASE_URL}/manager/remove`, {
      method: "DELETE",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      // for debugging
      handleAction();
      console.log("response OK", responseData);
    }
  };

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
            onClick={() => removeManager()}
          >
            Remove
          </Btn>
        }
      />
    </div>
  );
};

export default ManagerActions;
