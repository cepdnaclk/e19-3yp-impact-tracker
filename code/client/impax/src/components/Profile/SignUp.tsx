import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import Hero from "./Hero";
const SignUp = () => {
  type role = "player" | "manager";
  const [role, setRole] = useState<role>("manager");

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "player" ? "manager" : "player"));
  };
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h2 className={styles.heading}>
          Welcome to
          <img src="../../src/assets/logos/Logo-Impax.svg" alt="IMPAX" />
        </h2>
        <div className={styles.selectorContainer}>
          <h4>Select Your Role</h4>

          {/* Toggle Between the state */}
          <button
            className={`${styles.toggleSwitch}  ${
              role == "manager" && styles.manager
            }
          }`}
            onClick={toggleRole}
          >
            <p className={styles.toggleItem}>Player</p>
            <p className={styles.toggleItem}>Team Management</p>
          </button>
        </div>
      </div>
      <Hero />
    </main>
  );
};

export default SignUp;
