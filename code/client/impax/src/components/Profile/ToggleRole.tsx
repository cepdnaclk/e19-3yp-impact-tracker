import React from "react";
import styles from "./ToggleRole.module.scss";

interface ToggleRoleProps {
  role: "player" | "manager";
  toggleRole: () => void;
}

const ToggleRole: React.FC<ToggleRoleProps> = ({ role, toggleRole }) => {
  return (
    <button
      className={`${styles.toggleSwitch}  ${role == "manager" && styles.manager}
    }`}
      onClick={toggleRole}
    >
      <p className={styles.toggleItem}>Player</p>
      <p className={styles.toggleItem}>Team Management</p>
    </button>
  );
};

export default ToggleRole;
