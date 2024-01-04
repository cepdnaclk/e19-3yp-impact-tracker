import React from "react";
import Live from "../Live/Live";
import Test from "../Test/Test";
import { useAppState } from "../../store/appState";
import SignUp from "../Profile/SignUp";
import Devices from "../Devices/Devices";
import PlayerManagement from "../PlayerManagement/PlayerManagement";

const Content: React.FC = () => {
  const activePage = useAppState((state) => state.activePage);
  //TODO: If mqtt is offline, live and devices should be replaced by a screen that says "mqtt is offline"
  return (
    <>
      {activePage === "live" && <Live />}
      {activePage === "devices" && <Devices />}
      {activePage === "analytics" && <Test />}
      {activePage === "profile" && <SignUp />}
      {activePage === "player-management" && <PlayerManagement />}
    </>
  );
};

export default Content;
