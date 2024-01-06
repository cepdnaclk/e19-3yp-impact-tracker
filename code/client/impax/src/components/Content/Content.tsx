import React from "react";
import Live from "../Live/Live";
import Test from "../Test/Test";
import { useAppState } from "../../states/appState";
import SignUp from "../Profile/SignUp";
import Devices from "../Devices/Devices";
import PlayerManagement from "../PlayerManagement/PlayerManagement";

// interface Props {
//   isOnline: boolean;
// }

const Content: React.FC = () => {
  const activePage = useAppState((state) => state.activePage);
  // const isMqttOnline = useAppState((state) => state.isMqttOnine);
  const isMqttOnline = true;
  // const setIsInternetAvailable = useAppState(
  //   (state) => state.setIsInternetAvailable
  // );
  // // console.log("issss", isOnline);
  // isOnline ? setIsInternetAvailable(true) : setIsInternetAvailable(false);

  return (
    <>
      {activePage === "live" &&
        (isMqttOnline ? <Live /> : <div>MQTT is offline</div>)}
      {activePage === "devices" &&
        (isMqttOnline ? <Devices /> : <div>MQTT is offline</div>)}
      {activePage === "analytics" && <Test />}
      {activePage === "profile" && <SignUp />}

      {activePage === "player-management" && <PlayerManagement />}
    </>
  );
};

export default Content;
