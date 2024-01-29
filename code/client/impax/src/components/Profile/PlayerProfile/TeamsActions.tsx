import React from "react";
import Btn from "../../Buttons/Btn";
import { FaTimes, FaTrash } from "react-icons/fa";
import styles from "./TeamsActions.module.scss";
import AlertModal from "../../Modal/AlertModal";
import { FaCheck } from "react-icons/fa6";
import { MyTeam } from "../../../types";
import { renewAccessToken } from "../../../services/authService";
import { BASE_URL } from "../../../config/config";

const TeamActions: React.FC<{ myTeam: MyTeam; handleActions: () => void }> = ({
  myTeam,
  handleActions,
}) => {
  const { team_id, team_name, verification } = myTeam;
  const denyTeam = async () => {
    // renew access Token
    console.log("I am here");
    renewAccessToken();

    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      `${BASE_URL}/player/accept-invite/${team_id}/${0}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      // for debugging
      handleActions();
      console.log("response OK", responseData);
    }
    console.log("Hello", response);
    return response;
  };

  return (
    <div className={styles.actions}>
      <AlertModal
        forceAction={true}
        trigger={
          <Btn
            buttonStyle="secondary"
            bgColor="#0c493f"
            Icon={FaCheck}
            iconSizeEm={1.2}
            disabled={verification === "verified"}
          >
            Accept
          </Btn>
        }
        title="Accept Invitation?"
        description={`You will be added to ${team_name}`}
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
          <Btn buttonStyle="primary" Icon={FaCheck} iconSizeEm={1}>
            Accept
          </Btn>
        }
      />
      <AlertModal
        trigger={
          <Btn
            buttonStyle="secondary"
            bgColor="rgba(255,255,255,0)"
            Icon={FaTrash}
            iconSizeEm={1.2}
            disabled={verification === "verified"}
          >
            Deny
          </Btn>
        }
        title="Are you absolutely sure to deny?"
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
            onClick={() => denyTeam()}
          >
            Deny
          </Btn>
        }
      />
    </div>
  );
};

export default TeamActions;
