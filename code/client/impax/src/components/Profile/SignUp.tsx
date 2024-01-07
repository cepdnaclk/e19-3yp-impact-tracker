import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import Hero from "./Hero";
import ToggleRole from "./ToggleRole";
import { useAppState } from "../../states/appState";
import NoInternetConnection from "../OfflineStatus/NoInternetConnection";
import { Role } from "../../types";
import { useRoleState, useSignupState } from "../../states/formState";
import SignupManager from "./SignupManager";
import LoginManager from "./LoginManager";
import SignupPlayer from "./SignupPlayer";
import LoginPlayer from "./LoginPlayer";
import SignupManager2 from "./TeamCreation";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Log the form data object
  };

  //TODO: Disable Next button if the two inputs are empty
  // const toggleRole = () => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     role: prevData.role === "player" ? "manager" : "player",
  //   }));
  // };

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
        {role == "manager" &&
          isSignup &&
          (isTeamExist ? <SignupManager /> : <SignupManager2 />)}
        {role == "manager" && !isSignup && <LoginManager />}

        {role == "player" && isSignup && <SignupPlayer />}
        {role == "player" && !isSignup && <LoginPlayer />}
      </div>
      <Hero />
    </main>
  );
};

export default SignUp;
