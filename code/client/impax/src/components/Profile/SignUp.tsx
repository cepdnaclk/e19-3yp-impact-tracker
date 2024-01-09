import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import Hero from "./Hero";
import ToggleRole from "./ToggleRole";
import { useAppState } from "../../states/appState";
import NoInternetConnection from "../StatusScreens/NoInternetConnection";
import { Role } from "../../types";
import { useRoleState, useSignupState } from "../../states/formState";
import SignupManager from "./SignupManager";
import LoginManager from "./LoginManager";
import SignupPlayer from "./SignupPlayer";
import LoginPlayer from "./LoginPlayer";
import TeamCreation from "./TeamCreation";

const SignUp = () => {
  const role = useRoleState((state) => state.role);
  const setRole = useRoleState((state) => state.setRole);
  const isSignup = useSignupState((state) => state.isSignup);
  const setIsSignup = useSignupState((state) => state.setIsSignup);
  const isManagerExist = useSignupState((state) => state.isManagerExist);
  const isTeamExist = useSignupState((state) => state.isTeamExist);
  // console.log("RoLEEE", role);

  interface formData {
    role: Role;
    teamId: string;
    email: string;
  }
  const [formData, setFormData] = useState<formData>({
    role: "manager",
    teamId: "",
    email: "",
  });

  // If no internet connection then show error
  const isInternetAvailable = useAppState((state) => state.isInternetAvailable);
  if (!isInternetAvailable) {
    return (
      <main className={styles.main}>
        <NoInternetConnection />
        <Hero />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h2 className={styles.heading}>
          Welcome to
          <img src="../../src/assets/logos/Logo-Impax.svg" alt="IMPAX" />
        </h2>

        <div className={styles.selectorContainer}>
          <h4>Select Your Role</h4>
          <ToggleRole role={role} toggleRole={setRole} />
        </div>
        {role == "manager" && isSignup && <SignupManager />}
        {role == "manager" && !isSignup && <LoginManager />}

        {role == "player" && isSignup && <SignupPlayer />}
        {role == "player" && !isSignup && <LoginPlayer />}
      </div>
      <Hero />
    </main>
  );
};

export default SignUp;
