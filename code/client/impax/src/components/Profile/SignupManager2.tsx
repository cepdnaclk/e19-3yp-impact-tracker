import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { Role } from "../../types";
import { useSignupState } from "../../states/formState";
import Hero from "./Hero";
const SignupManager2 = () => {
  const setIsSignup = useSignupState((state) => state.setIsSignup);
  const signupInfo = useSignupState((state) => state.signupInfo);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.selectorContainer}>
            <img src="../../src/assets/logos/Logo-Impax.svg" alt="IMPAX" />
            <h4>Create a Team for {signupInfo.teamId}</h4>
          </div>
          <form>
            <div className={styles.inputContainer}>
              <label htmlFor="teamName">Team Name</label>
              <input
                type="text"
                id="teamName"
                required
                placeholder="Enter team name"
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                required
                placeholder="Enter first name"
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                required
                placeholder="Enter last name"
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                placeholder="Enter password"
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="retypepassword">Retype Password</label>
              <input
                type="retypepassword"
                id="retypepassword"
                required
                placeholder="Retype password"
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
