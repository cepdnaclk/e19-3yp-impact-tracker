import { FaCheckCircle } from "react-icons/fa";
import styles from "./status.module.scss";
import Hero from "../Profile/Hero";
const SignupSuccess = () => {
  return (
    <main className={`${styles.main} ${styles.divider}`}>
      <div className={`${styles.container} ${styles.success}`}>
        <h2>
          <FaCheckCircle className={styles.icon} />
          Signup Successfull
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

export default SignupSuccess;
