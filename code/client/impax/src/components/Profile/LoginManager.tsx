import styles from "./SignUp.module.scss";
import { useSignupState } from "../../states/formState";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "../../states/profileState";

const LoginManager = () => {
  const setIsSignup = useSignupState((state) => state.setIsSignup);
  const setIsLoggedIn = useSignupState((state) => state.setIsLoggedIn);
  const setLoginInfo = useLoginState((state) => state.setLoginInfo);
  const tokens = useLoginState((state) => state.tokens);
  const setTokens = useLoginState((state) => state.setTokens);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const getTeamInfo = async (teamId: string, token: string) => {
    // console.log("Hello", tokens.accessToken);
    try {
      const response = await fetch(
        `http://16.170.235.219:5000/manager/${teamId}`,
        {
          // Use the constructed URL with query params
          method: "GET", // Change the method to GET
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Keep the Content-Type header for consistency
          },
        }
      );
      console.log(response.status);
      const responseData = await response.json();
      return responseData.teamName;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const { teamId, email, password } = data;
    // console.log(teamId, email, password);
    const response = await fetch("http://16.170.235.219:5000/login/manager", {
      method: "POST",
      body: JSON.stringify({
        teamId: teamId,
        password: password,
        userName: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      setIsLoggedIn(true);
      setTokens({
        accessToken: responseData.accessToken,
        refreshToken: responseData.refreshToken,
      });
      // const teamName = await getTeamInfo(teamId, responseData.accessToken);
      setLoginInfo({ teamId, teamName: "Team Name", email });
      navigate("/login/manager");
    }

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
