import styles from "./SignUp.module.scss";
import { useSignupState } from "../../states/formState";
const LoginManager = () => {
  const isSignup = useSignupState((state) => state.isSignup);
  const setIsSignup = useSignupState((state) => state.setIsSignup);

  return (
    <>
      <form>
        <div className={styles.inputContainer}>
          <label htmlFor="teamId">Team ID</label>
          <input
            type="text"
            id="teamId"
            required
            placeholder="peradeniya-baseball"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            placeholder="johndoe@email.com"
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

        <button type="submit" className={styles.nextBtn}>
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
