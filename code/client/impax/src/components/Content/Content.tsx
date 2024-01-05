import React from "react";
import Live from "../Live/Live";
import Test from "../Test/Test";
import { useAppState } from "../../store/appState";
import SignUp from "../Profile/SignUp";
import Devices from "../Devices/Devices";
import PlayerManagement from "../PlayerManagement/PlayerManagement";

import { Detector } from "react-detect-offline";
import { on } from "serialport";

const Content: React.FC = () => {
  const activePage = useAppState((state) => state.activePage);
  // const isMqttOnline = useAppState((state) => state.isMqttOnine);
  const isMqttOnline = true;
  const isInternetAvailable = useAppState((state) => state.isInternetAvailable);

  return (
    <>
      {activePage === "live" &&
        (isMqttOnline ? <Live /> : <div>MQTT is offline</div>)}
      {activePage === "devices" &&
        (isMqttOnline ? <Devices /> : <div>MQTT is offline</div>)}
      {activePage === "analytics" &&
        (isInternetAvailable ? <Test /> : <div>No INTERNETT</div>)}
      {activePage === "profile" &&
        (isInternetAvailable ? <SignUp /> : <div>No INTERNETT</div>)}

      {activePage === "player-management" &&
        (isInternetAvailable ? <PlayerManagement /> : <div>No INTERNETT</div>)}
    </>
  );
};

export default Content;
