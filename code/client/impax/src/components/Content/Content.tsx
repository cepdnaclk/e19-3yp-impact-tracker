import React from "react";
import Live from "../Live/Live";
import Test from "../Test/Test";
import { useAppState } from "../../store/appState";

const Content: React.FC = () => {
  const activePage = useAppState((state) => state.activePage);

  return (
    <>
      {activePage === "live" && <Live />}
      {activePage === "devices" && <Test />}
      {activePage === "analytics" && <Test />}
      {activePage === "profile" && <Test />}
    </>
  );
};

export default Content;
