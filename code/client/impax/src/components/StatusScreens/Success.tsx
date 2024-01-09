import { FaCheckCircle } from "react-icons/fa";
import styles from "./status.module.scss";
import Hero from "../Profile/Hero";
interface Props {
  title: string;
  description: string;
}
const LoginSuccess = ({ title, description }: Props) => {
  return (
    <main className={`${styles.main} ${styles.divider}`}>
      <div className={`${styles.container} ${styles.success}`}>
        <h2>
          <FaCheckCircle className={styles.icon} />
          {title} Successfull
        </h2>
        <p>{description}</p>
      </div>
      <Hero />
    </main>
  );
};

export default LoginSuccess;
