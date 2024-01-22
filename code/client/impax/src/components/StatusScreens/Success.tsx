import { FaCheckCircle, FaRegUserCircle } from "react-icons/fa";
import styles from "./status.module.scss";
import Hero from "../Profile/Hero";
import { useNavigate } from "react-router-dom";
import Btn from "../Buttons/Btn";
import { useSignupState } from "../../states/formState";
interface Props {
  title: string;
  description: string;
}
const LoginSuccess = ({ title, description }: Props) => {
  const isLoggedInManager = useSignupState((state) => state.isLoggedInManager);
  const isLoggedInPlayer = useSignupState((state) => state.isLoggedInPlayer);
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
            if (isLoggedInManager) navigate("/manager-profile");
            else if (isLoggedInPlayer) navigate("/player-profile");
          }}
          Icon={FaRegUserCircle}
          buttonStyle="primary"
        >
          Visit Profile
        </Btn>
      </div>
      <Hero />
    </main>
  );
};

export default LoginSuccess;
