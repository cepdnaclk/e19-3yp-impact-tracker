import React from "react";
import Live from "../Live/Live";
import Test from "../Test/Test";
import { useAppState } from "../../store/appState";
import SignUp from "../Profile/SignUp";
import Devices from "../Devices/Devices";
import PlayerManagement from "../PlayerManagement/PlayerManagement";

const Content: React.FC = () => {
  const activePage = useAppState((state) => state.activePage);

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
