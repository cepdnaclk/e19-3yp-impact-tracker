import styles from "./SignUp.module.scss";
import { useSignupState } from "../../states/formState";
import Hero from "./Hero";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TeamCreation = () => {
  const setIsSignup = useSignupState((state) => state.setIsSignup);
  const signupInfo = useSignupState((state) => state.signupInfo);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const request = {
      teamId: signupInfo.teamId,
      email: signupInfo.email,
      teamName: data.teamName,
      firstName: data.yourName.split(" ")[0],
      lastName: data.yourName.split(" ")[1],
      password: data.password,
    };
    // console.log(data);
    console.log(request);
    const response = await fetch("http://13.235.86.11:5000/team/manager", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      navigate("/signup/manager/success");
    }
    reset();
  };
  return (
    <>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.selectorContainer}>
            <img src="../../src/assets/logos/Logo-Impax.svg" alt="IMPAX" />
            <h4>Create a Team for {signupInfo.teamId}</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputContainer}>
              <label htmlFor="teamName">Team Name</label>
              {errors.teamName && <p>{`${errors.teamName.message}`}</p>}
              <input
                {...register("teamName", { required: "Team name is required" })}
                type="text"
                id="teamName"
                required
                placeholder="Enter team name"
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="yourName">Your Name</label>
              {errors.firstName && <p>{`${errors.firstName.message}`}</p>}
              <input
                {...register("yourName", {
                  required: "Your name is required",
                })}
                type="text"
                id="yourName"
                placeholder="Enter your name"
              />
            </div>

            {/* <div className={styles.inputContainer}>
              <label htmlFor="lastName">Last Name</label>
              {errors.lastName && <p>{`${errors.lastName.message}`}</p>}
              <input
                {...register("lastName", {
                  required: "Last name is required",
                })}
                type="text"
                id="lastName"
                placeholder="Enter last name"
              />
            </div> */}

            <div className={styles.inputContainer}>
              <label htmlFor="password">Password</label>
              {errors.password && <p>{`${errors.password.message}`}</p>}
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 10,
                    message: "Password must be at least 10 characters",
                  },
                })}
                type="password"
                id="password"
                placeholder="Enter password"
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="retypepassword">Retype Password</label>
              {errors.retypepassword && (
                <p>{`${errors.retypepassword.message}`}</p>
              )}
              <input
                {...register("retypepassword", {
                  required: "Retype password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords must match",
                })}
                type="password"
                id="retypepassword"
                placeholder="Retype password"
              />
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className={styles.nextBtn}
            >
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

export default TeamCreation;
