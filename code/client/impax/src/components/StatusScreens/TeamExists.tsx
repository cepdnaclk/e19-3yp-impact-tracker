/* eslint-disable react-hooks/rules-of-hooks */
import { FaCheckCircle } from "react-icons/fa";
import styles from "./status.module.scss";
import Hero from "../Profile/Hero";
import { useSignupState } from "../../states/formState";
import { useNavigate } from "react-router-dom";
import Btn from "../Buttons/Btn";
import { FaRegCircleUser } from "react-icons/fa6";

const teamExists = () => {
  const navigate = useNavigate();
  const setIsSignup = useSignupState((state) => state.setIsSignup);
  return (
    <main className={`${styles.main} ${styles.divider}`}>
      <div className={`${styles.container} ${styles.success}`}>
        <h2>
          <FaCheckCircle className={styles.icon} />
          You already have an account!
        </h2>
        <Btn
          Icon={FaRegCircleUser}
          onClick={() => {
            setIsSignup(false);
            navigate("login/manager");
          }}
          type="submit"
        >
          Login
        </Btn>
      </div>
      <Hero />
    </main>
  );
};

export default teamExists;
