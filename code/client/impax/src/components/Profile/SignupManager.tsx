import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { Role } from "../../types";
import { useRoleState, useSignupState } from "../../states/formState";
const SignupManager = () => {
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
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="teamId">Team ID</label>
          <input
            type="text"
            id="teamId"
            required
            placeholder="peradeniya-baseball"
            value={formData.teamId}
            onChange={handleInputChange}
          />
        </div>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            placeholder="johndoe@email.com"
            value={formData.email}
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

        <button type="submit" className={styles.nextBtn}>
          Signup
        </button>
      </form>
    </>
  );
};

export default SignupManager;
