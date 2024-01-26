import { IoMdExit } from "react-icons/io";
import Btn from "../../Buttons/Btn";
import Title from "../../Title/Title";
import styles from "./PlayerProfile.module.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { useLoginState } from "../../../states/profileState";
import { useSignupState } from "../../../states/formState";
import MyTeamsTable from "./MyTeamsTable";
import { useNavigate } from "react-router-dom";

const PlayerProfile = () => {
  // Get team-id
  // Get team-name
  // Get manager email
  const setIsLoggedInPlayer = useSignupState(
    (state) => state.setIsLoggedInPlayer
  );
  const loginInfo = useLoginState((state) => state.loginInfo);
  const setLoginInfo = useLoginState((state) => state.setLoginInfo);
  const navigate = useNavigate();
  // TODO: Stay logged in for 90 days and so much more
  return (
    <main>
      <Title Icon={FaRegUserCircle} title="Player's Profile" />
      <div className={styles.loggedInStatus}>
        <div className={styles.info}>
          <h2>Add, remove your teams</h2>
          <span>player email: {loginInfo.email}</span>
        </div>
        <div className={styles.controls}>
          <Btn
            buttonStyle="primary"
            Icon={IoMdExit}
            onClick={() => {
              setIsLoggedInPlayer(false);
              setLoginInfo({
                teamId: "",
                teamName: "",
                email: "",
              });
              navigate("/SignUp");
            }}
          >
            Log Out
          </Btn>
        </div>
      </div>
      <div className={styles.gridLayout}>
        <div className={styles.myTeamsContainer}>
          <h2>My Teams</h2>
          <div className={styles.tableContainer}>
            <MyTeamsTable />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlayerProfile;
