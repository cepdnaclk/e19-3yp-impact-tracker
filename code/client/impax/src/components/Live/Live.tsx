import React, { useState } from "react";
import { BsBroadcast } from "react-icons/bs";

import Title from "../Title/Title";

import ActiveSession from "./activeSession";
import StartSession from "./StartSession";

const Live = () => {
  const [isSession, setSession] = useState<Boolean>(false);

  return (
    <main>
      <Title title="Live Dashboard" Icon={BsBroadcast} />
      {isSession ? (
        <ActiveSession />
      ) : (
        <StartSession onClick={() => setSession(true)} />
      )}
    </main>
  );
};

export default Live;
