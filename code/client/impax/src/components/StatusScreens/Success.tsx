import { FaCheckCircle } from "react-icons/fa";
import styles from "./status.module.scss";
import Hero from "../Profile/Hero";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  description: string;
}
const LoginSuccess = ({ title, description }: Props) => {
  const navigate = useNavigate();
  return (
    <main className={`${styles.main} ${styles.divider}`}>
      <div className={`${styles.container} ${styles.success}`}>
        <h2>
          <FaCheckCircle className={styles.icon} />
          {title} Successfull
        </h2>
        <p>{description}</p>
        <button
          onClick={() => {
            navigate("/profile");
          }}
          type="submit"
          className={styles.nextBtn}
        >
          Go to Profile
        </button>
      </div>
      <Hero />
    </main>
  );
};

export default LoginSuccess;
