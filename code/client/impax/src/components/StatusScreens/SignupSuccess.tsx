import { FaCheckCircle, FaRegUserCircle } from "react-icons/fa";
import styles from "./status.module.scss";
import Hero from "../Profile/Hero";
import { useNavigate } from "react-router-dom";
import Btn from "../Buttons/Btn";

interface Props {
  title: string;
  description: string;
}
const SignupSuccess = ({ title, description }: Props) => {
  const navigate = useNavigate();
  return (
    <main className={`${styles.main} ${styles.divider}`}>
      <div className={`${styles.container} ${styles.success}`}>
        <h2>
          <FaCheckCircle className={styles.icon} />
          {title} Successful
        </h2>
        <p>{description}</p>
        <Btn
          type="submit"
          onClick={() => {
            navigate("/");
          }}
          Icon={FaRegUserCircle}
          buttonStyle="primary"
        >
          Login
        </Btn>
      </div>
      <Hero />
    </main>
  );
};

export default SignupSuccess;
