import React, { useEffect } from "react";
import Live from "../Live/Live";
import Test from "../Test/Test";
import { useAppState } from "../../states/appState";
import SignUp from "../Profile/SignUp";
import Devices from "../Devices/Devices";
import PlayerManagement from "../PlayerManagement/PlayerManagement";
import { useSignupState } from "../../states/formState";
import TeamCreation from "../Profile/TeamCreation";
interface Props {
  isOnline: boolean;
}

const Content: React.FC<Props> = ({ isOnline }: Props) => {
  const isTeamExist = useSignupState((state) => state.isTeamExist);

  const setIsInternetAvailable = useAppState(
    (state) => state.setIsInternetAvailable
  );
  const activePage = useAppState((state) => state.activePage);

  useEffect(() => {
    isOnline ? setIsInternetAvailable(true) : setIsInternetAvailable(false);
  }, [isOnline, setIsInternetAvailable]);

  return (
    <>
      {activePage === "live" && <Live />}
      {activePage === "devices" && <Devices />}
      {activePage === "analytics" && <Test />}
      {activePage === "profile" &&
        (isTeamExist ? <SignUp /> : <TeamCreation />)}

      {activePage === "player-management" && <PlayerManagement />}
    </>
  );
};

export default Content;
