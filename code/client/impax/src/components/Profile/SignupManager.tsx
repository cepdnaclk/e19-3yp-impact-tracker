import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { Role } from "../../types";
import { useRoleState, useSignupState } from "../../states/formState";
import { useForm, type FieldValues } from "react-hook-form";
import { useAppState } from "../../states/appState";

const SignupManager = () => {
  const isSignup = useSignupState((state) => state.isSignup);
  const setIsSignup = useSignupState((state) => state.setIsSignup);
  const isManagerExists = useSignupState((state) => state.isManagerExist);
  const setIsManagerExists = useSignupState((state) => state.setIsManagerExist);
  const isTeamExists = useSignupState((state) => state.isTeamExist);
  const setIsTeamExists = useSignupState((state) => state.setIsTeamExist);
  const signupInfo = useSignupState((state) => state.signupInfo);
  const setSignupInfo = useSignupState((state) => state.setSignupInfo);
  const activePage = useAppState((state) => state.activePage);
  const setActivePage = useAppState((state) => state.setActivePage);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    // TODO: submit to server
    // ...\
    const { teamId, email } = data;
    setSignupInfo({ teamId, email });

    const url = new URL("http://localhost:5000/team/exists"); // Create a URL object for flexible query param handling
    url.searchParams.set("teamId", teamId); // Add teamId as a query parameter
    url.searchParams.set("email", email);
    const response = await fetch(url.toString(), {
      // Use the constructed URL with query params
      method: "GET", // Change the method to GET
      headers: {
        "Content-Type": "application/json", // Keep the Content-Type header for consistency
      },
    });
    const responseData = await response.json();
    if (!responseData.teamExists) {
      setIsTeamExists(false);
    }
    // const responseData = await response.json();
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // console.log(data);

    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="teamId">Team ID</label>
          {errors.teamId && <p>{`${errors.teamId.message}`}</p>}
          <input
            {...register("teamId", { required: "Team ID is required" })}
            type="text"
            id="teamId"
            placeholder="peradeniya-baseball"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          {errors.email && <p>{`${errors.email.message}`}</p>}
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
            placeholder="johndoe@email.com"
          />
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className={styles.nextBtn}
        >
          Next
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
    </>
  );
};

export default SignupManager;
