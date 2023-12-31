import Title from "../Title/Title";
import { FaUsers } from "react-icons/fa";
import React from "react";
import styles from "./PlayerManagement.module.scss";
import tableStyles from "./PlayersTable/PlayersTable.module.scss";

import {
  ColumnDef,
  // createColumnHelper,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import PlayerActions from "./PlayersTable/PlayerActions/PlayerActions";
import { Verification } from "./PlayersTable/Verification/Verification";
import { FaPlus, FaSearch, FaSort } from "react-icons/fa";
import Btn from "../Buttons/Btn";
import PlayersTable from "./PlayersTable/PlayersTable";
import NoInternetConnection from "../StatusScreens/NoInternetConnection";
import { useAppState } from "../../states/appState";

export type Player = {
  jerseyId: number;
  name: string;
  email?: string;
  verification?: "verified" | "pending" | "rejected";
};

// const columnHelper = createColumnHelper<Player>();

const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "jerseyId",
    size: 2,
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jersey No <FaSort className={tableStyles.icon} />
        </button>
      );
    },
    cell: ({ row }) => {
      const jerseyId: number = row.getValue("jerseyId");
      return (
        <div className={tableStyles.jerseyId}>
          {String(jerseyId).padStart(2, "0")}
        </div>
      );
    },
  },

  {
    accessorKey: "name",
    header: "Name",
    id: "name",
    size: 80,
  },

  {
    accessorKey: "email",
    header: "Email Address",
    id: "email",
    size: 100,
  },
  {
    accessorKey: "verification",
    header: "Verification",
    id: "verification",
    size: 40,
    cell: ({ row }) => <Verification status={row.getValue("verification")} />,
  },
  {
    accessorKey: "edit",
    header: "",
    id: "edit",
    size: 50,
    cell: ({ row }) => <PlayerActions jerseyId={row.getValue("jerseyId")} />,
  },
];

const PlayerManagement = () => {
  const defaultData: Player[] = [];
  //fill defaultData with playerDetails from useAppState
  const playerDetails = useAppState((state) => state.playerDetails);

  for (let jersey_number in playerDetails) {
    defaultData.push({
      jerseyId: parseInt(jersey_number),
      name: playerDetails[jersey_number].name,
      email: playerDetails[jersey_number].email,
      verification: playerDetails[jersey_number].verification,
    });
  }
  const [data] = React.useState(() => [...defaultData]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  const isInternetAvailable = useAppState((state) => state.isInternetAvailable);
  if (!isInternetAvailable) {
    return (
      <main>
        <Title title={"Player Management"} Icon={FaUsers} />
        <NoInternetConnection />
      </main>
    );
  }

  return (
    <main>
      <Title title={"Player Management"} Icon={FaUsers} />

      <div className={styles.banner}>
        <div className={styles.info}>
          <h3>Add, edit and remove players</h3>
          <span>Sync players analytics via impax account emails</span>
        </div>
        <div className={styles.controls}>
          <div className={styles.addNew}>
            <Btn buttonStyle="primary" Icon={FaPlus} iconSizeEm={0.8}>
              Add New Player
            </Btn>
          </div>
          <div className={styles.searchBox}>
            <FaSearch className={styles.icon} />
            <input
              placeholder="Search Player..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
            />
          </div>
        </div>
      </div>

      {table.getRowModel().rows.length == 0 ? (
        <div className={styles.empty}>No Players</div>
      ) : (
        <PlayersTable table={table} />
      )}
    </main>
  );
};

export default PlayerManagement;
