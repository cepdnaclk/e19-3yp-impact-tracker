import styles from "./SignUp.module.scss";
import { useSignupState } from "../../states/formState";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/config";

const SignupPlayer = () => {
  const setIsSignup = useSignupState((state) => state.setIsSignup);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const { password, email } = data;
    const request = { email, password };
    // console.log(data);
    const response = await fetch(`${BASE_URL}/player`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      navigate("/signup/player/success");
    }
    reset();
    // setSignupInfo({ teamId, email });

    // reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          {errors.email && <p>{`${errors.email.message}`}</p>}
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            required
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
            required
            placeholder="Enter password"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="retypePassword">Retype Password</label>
          {errors.retypepassword && <p>{`${errors.retypepassword.message}`}</p>}
          <input
            {...register("retypepassword", {
              required: "Retype password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords must match",
            })}
            type="password"
            id="retypePassword"
            placeholder="Retype password"
          />
        </div>

        <button
          type="submit"
          className={styles.nextBtn}
          disabled={isSubmitting}
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
    </>
  );
};

export default SignupPlayer;
