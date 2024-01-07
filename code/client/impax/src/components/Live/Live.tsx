import { useState } from "react";
import { BsBroadcast } from "react-icons/bs";

import Title from "../Title/Title";
import ActiveSession from "./ActiveSession.tsx";
import StartSession from "./StartSession.tsx";
import { useAppState } from "../../states/appState.ts";
import NoMqttConnection from "../OfflineStatus/NoMqttConnection.tsx";

const Live = () => {
  const session = useAppState((state) => state.sessionDetails);

  //if mqtt is not connected, show no connection page
  const isMqttOnline = useAppState((state) => state.isMqttOnine);
  if (!isMqttOnline) {
    return (
      <main className="main">
        <Title title="Live Dashboard" Icon={BsBroadcast} />
        <NoMqttConnection />
      </main>
    );
  }
  return (
    <main>
      <Title title="Live Dashboard" Icon={BsBroadcast} />
      {session ? <ActiveSession /> : <StartSession />}
    </main>
  );
};

export default Live;
