import { IoMdExit } from "react-icons/io";
import Btn from "../Buttons/Btn";
import Title from "../Title/Title";
import styles from "./Profile.module.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { useLoginState } from "../../states/profileState";

const Profile = () => {
  // Get team-id
  // Get team-name
  // Get manager email
  const loginInfo = useLoginState((state) => state.loginInfo);

  return (
    <main>
      <Title Icon={FaRegUserCircle} title="Profile" />
      <div className={styles.loggedInStatus}>
        <div className={styles.info}>
          <h2>
            {loginInfo.teamName} <span>({loginInfo.teamId})</span>
          </h2>
          <span>manager email: {loginInfo.email}</span>
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
