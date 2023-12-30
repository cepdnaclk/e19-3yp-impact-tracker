import React from "react";
import Title from "../Title/Title";
import { FaUsers } from "react-icons/fa";
import PlayersTable from "./PlayersTable/PlayersTable";

const PlayerManagement = () => {
  return (
    <main>
      <Title title="Player Management" Icon={FaUsers} />
      <PlayersTable />
    </main>
  );
};

export default PlayerManagement;
