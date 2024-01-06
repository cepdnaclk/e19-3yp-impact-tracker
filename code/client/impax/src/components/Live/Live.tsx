import { useState } from "react";
import { BsBroadcast } from "react-icons/bs";

import Title from "../Title/Title";
import ActiveSession from "./ActiveSession.tsx";
import StartSession from "./StartSession.tsx";
import { useAppState } from "../../states/appState.ts";

const Live = () => {
  const session = useAppState((state) => state.sessionDetails);

  return (
    <main>
      <Title title="Live Dashboard" Icon={BsBroadcast} />
      {session ? <ActiveSession /> : <StartSession />}
    </main>
  );
};

export default Live;
