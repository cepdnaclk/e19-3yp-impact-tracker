import { FaCheckCircle } from "react-icons/fa";
import styles from "./NoInternetConnection.module.scss";
import signupStyles from "../Profile/SignUp.module.scss";

import Hero from "../Profile/Hero";
const LoginSuccess = () => {
  return (
    <main className={signupStyles.main}>
      <div className={styles.container}>
        <h2>
          <FaCheckCircle className={styles.icon} />
          Login Successfull
        </h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis
          autem tempore consectetur ex praesentium quidem odit nesciunt officiis
          quo ratione.
        </p>
      </div>
      <Hero />
    </main>
  );
};

export default LoginSuccess;
