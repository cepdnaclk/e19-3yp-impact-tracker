import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { Role } from "../../types";
import { useRoleState, useSignupState } from "../../states/formState";
const LoginManager = () => {
  interface formData {
    role: Role;
    teamId: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    retypePassword: string;
    teamName: string;
  }
  const [formData, setFormData] = useState<formData>({
    role: "manager",
    teamId: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    retypePassword: "",
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

export default LoginManager;
