import { IoMdExit } from "react-icons/io";
import Btn from "../../Buttons/Btn";
import Title from "../../Title/Title";
import styles from "./PlayerProfile.module.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { useLoginState } from "../../../states/profileState";
import { useSignupState } from "../../../states/formState";
import MyTeamsTable from "./MyTeamsTable";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../states/appState";
import NoInternetConnection from "../../StatusScreens/NoInternetConnection";
import { useQuery } from "@tanstack/react-query";
import { renewAccessToken } from "../../../services/authService";
import { BASE_URL } from "../../../config/config";
import { MyTeam } from "../../../types";
import Spinner from "../../StatusScreens/Spinner";

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

  const { data: myTeamsData, isLoading } = useQuery({
    queryFn: () => fetchplayerProfileTableData(),
    queryKey: ["data"],
  });
  async function fetchplayerProfileTableData(): Promise<MyTeam[]> {
    // Renew access Token
    await renewAccessToken();
    const response = await fetch(`${BASE_URL}/player/myTeams`, {
      // Use the constructed URL with query params
      method: "GET", // Change the method to GET
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json", // Keep the Content-Type header for consistency
      },
    });
    const responseData = await response.json();
    console.log(responseData.teams);
    return responseData.teams;
  }
  const isInternetAvailable = useAppState((state) => state.isInternetAvailable);
  if (!isInternetAvailable) {
    //show no internet connection component
    if (!isInternetAvailable) {
      return (
        <main>
          <Title title={"Player Profile"} Icon={FaRegUserCircle} />
          <NoInternetConnection />
        </main>
      );
    }
  }

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
            {isLoading || myTeamsData === undefined ? (
              <div className={styles.spinnerContainer}>
                <Spinner />
              </div>
            ) : (
              <MyTeamsTable playerProfileTable={myTeamsData} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlayerProfile;
