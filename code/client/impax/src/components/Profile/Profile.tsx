import { IoMdExit } from "react-icons/io";
import Btn from "../Buttons/Btn";
import Title from "../Title/Title";
import styles from "./Profile.module.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { useLoginState } from "../../states/profileState";
import { useSignupState } from "../../states/formState";

const Profile = () => {
  // Get team-id
  // Get team-name
  // Get manager email
  const setIsLoggedIn = useSignupState((state) => state.setIsLoggedIn);
  const loginInfo = useLoginState((state) => state.loginInfo);
  const setLoginInfo = useLoginState((state) => state.setLoginInfo);
  // TODO: Stay logged in for 90 days and so much more
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
          <Btn
            buttonStyle="primary"
            Icon={IoMdExit}
            onClick={() => {
              setIsLoggedIn(false);
              setLoginInfo({
                teamId: "",
                teamName: "",
                email: "",
              });
            }}
          >
            Log Out
          </Btn>
        </div>
      </div>
    </main>
  );
};

export default Profile;
