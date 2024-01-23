import React, { useState } from "react";
import Btn from "../../Buttons/Btn";
import { FaTimes, FaTrash } from "react-icons/fa";
import styles from "./TeamsActions.module.scss";
import AlertModal from "../../Modal/AlertModal";
import { FaCheck } from "react-icons/fa6";
import { MyTeam } from "../../../types";

const TeamActions: React.FC<MyTeam> = ({
  team_id,
  team_name,
  verification,
}) => {
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
          >
            Deny
          </Btn>
        }
      />
    </div>
  );
};

export default TeamActions;
