import React, { useEffect } from "react";
import Live from "../Live/Live";
import Test from "../Test/Test";
import { useAppState } from "../../states/appState";
import SignUp from "../Profile/SignUp";
import Devices from "../Devices/Devices";
import PlayerManagement from "../PlayerManagement/PlayerManagement";

interface Props {
  isOnline: boolean;
}

const Content: React.FC<Props> = ({ isOnline }: Props) => {
  const setIsInternetAvailable = useAppState(
    (state) => state.setIsInternetAvailable
  );
  const activePage = useAppState((state) => state.activePage);
  // const isMqttOnline = useAppState((state) => state.isMqttOnine);
  const isMqttOnline = true;
  useEffect(() => {
    isOnline ? setIsInternetAvailable(true) : setIsInternetAvailable(false);
  }, [isOnline, setIsInternetAvailable]);

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
