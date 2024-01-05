import React from "react";
import Live from "../Live/Live";
import Test from "../Test/Test";
import { useAppState } from "../../store/appState";
import SignUp from "../Profile/SignUp";
import Devices from "../Devices/Devices";
import PlayerManagement from "../PlayerManagement/PlayerManagement";

import { Detector } from "react-detect-offline";

const Content: React.FC = () => {
  const activePage = useAppState((state) => state.activePage);
  // const isMqttOnline = useAppState((state) => state.isMqttOnine);
  const isMqttOnline = true;

  return (
    <>
      {activePage === "live" &&
        (isMqttOnline ? <Live /> : <div>MQTT is offline</div>)}
      {activePage === "devices" &&
        (isMqttOnline ? <Devices /> : <div>MQTT is offline</div>)}
      {activePage === "analytics" && (
        <Detector
          render={({ online }) =>
            online ? <Test /> : <div>You are offline</div>
          }
        />
      )}
      {activePage === "profile" && (
        <Detector
          render={({ online }) =>
            online ? <SignUp /> : <div>You are offline</div>
          }
        />
      )}

      {activePage === "player-management" && <PlayerManagement />}
    </>
  );
};

export default Content;
