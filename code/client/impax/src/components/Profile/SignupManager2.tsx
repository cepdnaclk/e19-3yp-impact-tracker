import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { Role } from "../../types";
import { useSignupState } from "../../states/formState";
import Hero from "./Hero";
const SignupManager2 = () => {
  const setIsSignup = useSignupState((state) => state.setIsSignup);
  const signupInfo = useSignupState((state) => state.signupInfo);

  interface formData {
    role: Role;
    teamId: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    teamName: string;
  }
  const [formData, setFormData] = useState<formData>({
    role: "manager",
    teamId: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    teamName: "",
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
  return (
    <>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.selectorContainer}>
            <img src="../../src/assets/logos/Logo-Impax.svg" alt="IMPAX" />
            <h4>Create a Team for {signupInfo.teamId}</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label htmlFor="teamName">Team Name</label>
              <input
                type="text"
                id="teamName"
                required
                placeholder="Enter team name"
                value={formData.teamName}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                required
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                required
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="retypepassword">Retype Password</label>
              <input
                type="retypepassword"
                id="retypepassword"
                required
                placeholder="Retype password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className={styles.nextBtn}>
              Signup
            </button>
          </form>
          <p className={styles.loginText}>
            Already have an account?{" "}
            <span
              tabIndex={0}
              onClick={() => {
                setIsSignup(false);
              }}
            >
              Login
            </span>
          </p>
        </div>
        <Hero />
      </main>
    </>
  );
};

export default SignupManager2;
