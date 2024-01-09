import { IoMdExit } from "react-icons/io";
import Btn from "../Buttons/Btn";
import Title from "../Title/Title";
import styles from "./Profile.module.scss";
import { FaRegUserCircle } from "react-icons/fa";

const Profile = () => {
  return (
    <main>
      <Title Icon={FaRegUserCircle} title="Profile" />
      <div className={styles.loggedInStatus}>
        <div className={styles.info}>
          <h2>Team Name (Team Id)</h2>
          <span>manager email: </span>
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
