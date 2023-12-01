import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import Hero from "./Hero";
import ToggleRole from "./ToggleRole";
const SignUp = () => {
  type role = "player" | "manager";
  const [role, setRole] = useState<role>("manager");

  //TODO: Disable Next button if the two inputs are empty
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

          <ToggleRole role={role} toggleRole={toggleRole} />
        </div>
        <form>
          <div className={styles.inputContainer}>
            <label htmlFor="team-id">Team ID</label>
            <input
              type="text"
              id="team-id"
              required
              placeholder="peradeniya-baseball"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="johndoe@email.com"
            />
          </div>

          <button type="submit" className={styles.nextBtn}>
            Next
          </button>
        </form>
        <p className={styles.loginText}>
          Already have an account? <span>Log In</span>
        </p>
      </div>
      <Hero />
    </main>
  );
};

export default SignUp;
