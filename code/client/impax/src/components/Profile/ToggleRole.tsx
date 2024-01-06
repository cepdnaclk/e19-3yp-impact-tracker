import React from "react";
import styles from "./ToggleRole.module.scss";
import { Role } from "../../types";

interface ToggleRoleProps {
  role: "player" | "manager";
  toggleRole: (role: Role) => void;
}

const ToggleRole: React.FC<ToggleRoleProps> = ({ role, toggleRole }) => {
  return (
    <button
      className={`${styles.toggleSwitch}  ${role == "manager" && styles.manager}
    }`}
      onClick={() => {
        toggleRole(role);
      }}
    >
      <p className={styles.toggleItem}>Player</p>
      <p className={styles.toggleItem}>Team Management</p>
    </button>
  );
};

export default ToggleRole;
