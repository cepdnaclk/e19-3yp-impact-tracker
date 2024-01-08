import styles from "./SignUp.module.scss";
import { useSignupState } from "../../states/formState";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginManager = () => {
  const setIsSignup = useSignupState((state) => state.setIsSignup);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const { teamId, email, password } = data;
    console.log(teamId, email, password);
    const response = await fetch("http://localhost:5000/login/manager", {
      method: "POST",
      body: JSON.stringify({
        password: password,
        userName: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      navigate("/login/manager");
    }

    console.log(response.ok);
    console.log(responseData);
    //   const url = new URL("http://localhost:5000/team/exists"); // Create a URL object for flexible query param handling
    //   url.searchParams.set("teamId", teamId); // Add teamId as a query parameter
    //   url.searchParams.set("email", email);
    //   const response = await fetch(url.toString(), {
    //     // Use the constructed URL with query params
    //     method: "GET", // Change the method to GET
    //     headers: {
    //       "Content-Type": "application/json", // Keep the Content-Type header for consistency
    //     },
    //   });
    //   const responseData = await response.json();

    //   // console.log(signupInfo);
    //   // const responseData = await response.json();
    //   // await new Promise((resolve) => setTimeout(resolve, 5000));
    //   // console.log(data);

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
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          {errors.password && <p>{`${errors.password.message}`}</p>}
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            id="password"
            placeholder="Enter password"
          />
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className={styles.nextBtn}
        >
          Login
        </button>
      </form>
      <p className={styles.loginText}>
        Don't have an account?{" "}
        <span
          tabIndex={0}
          onClick={() => {
            setIsSignup(true);
          }}
        >
          Signup
        </span>
      </p>
    </>
  );
};

export default LoginManager;
