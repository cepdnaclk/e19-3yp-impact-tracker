import React from "react";
import Live from "../Live/Live";
import Test from "../Test/Test";
import { useAppState } from "../../store/appState";
import SignUp from "../Profile/SignUp";
import Devices from "../Devices/Devices";
import PlayerManagement from "../PlayerManagement/PlayerManagement";

const Content: React.FC = () => {
  const activePage = useAppState((state) => state.activePage);
  // const isMqttOnline = useAppState((state) => state.isMqttOnine);
  const isMqttOnline = true;
  // const isInternetAvailable = useAppState((state) => state.isInternetAvailable);

  return (
    <>
      {activePage === "live" &&
        (isMqttOnline ? <Live /> : <div>MQTT is offline</div>)}
      {activePage === "devices" &&
        (isMqttOnline ? <Devices /> : <div>MQTT is offline</div>)}
      {
        activePage === "analytics" && <Test />
        //  &&
        //   (isInternetAvailable ? <Test /> : <div>No INTERNETT</div>)
      }
      {
        activePage === "profile" && <SignUp />

        // (isInternetAvailable ? <SignUp /> : <div>No INTERNETT</div>)
      }

      {
        activePage === "player-management" && <PlayerManagement />
        // (isInternetAvailable ? <PlayerManagement /> : <div>No INTERNETT</div>)
      }
    </>
  );
};

export default Content;
