import { IoMdExit } from "react-icons/io";
import Btn from "../Buttons/Btn";
import Title from "../Title/Title";
import styles from "./Profile.module.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { useSignupState } from "../../states/formState";

const Profile = () => {
  // Get team-id
  // Get team-name
  // Get manager email

  return (
    <main>
      <Title Icon={FaRegUserCircle} title="Profile" />
      <div className={styles.loggedInStatus}>
        <div className={styles.info}>
          <h2>
            Sri Lanka A <span>(SL-A_2024)</span>
          </h2>
          <span>manager email: chrissiilverwood@gmail.com</span>
        </div>
        <div className={styles.controls}>
          <Btn buttonStyle="primary" Icon={IoMdExit} onClick={() => {}}>
            Log Out
          </Btn>
        </div>
      </div>
    </main>
  );
};

export default Profile;
