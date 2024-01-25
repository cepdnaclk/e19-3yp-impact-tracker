import Title from "../Title/Title";
import { FaUsers } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import styles from "./PlayerManagement.module.scss";
import tableStyles from "./PlayersTable/PlayersTable.module.scss";
import { FieldValues, useForm } from "react-hook-form";

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
import DialogModal from "../Modal/DialogModal";
import { BASE_URL } from "../../config/config";

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
  //if internet unavailable return prematurely with no internet connection component
  const isInternetAvailable = useAppState((state) => state.isInternetAvailable);

  // const defaultData: Player[] = [];
  // //fill defaultData with playerDetails from useAppState
  // const playerDetails = useAppState((state) => state.playerDetails);

  // for (const jersey_number in playerDetails) {
  //   defaultData.push({
  //     jerseyId: parseInt(jersey_number),
  //     name: playerDetails[jersey_number].name,
  //     email: playerDetails[jersey_number].email,
  //     verification: playerDetails[jersey_number].verification,
  //   });
  // }
  // const [data] = React.useState(() => [...defaultData]);
  // RENDER ISSUE FIX START
  const [data, setData] = useState<Player[]>([]);

  // Player details from app state
  const playerDetails = useAppState((state) => state.playerDetails);

  // Update data state when playerDetails change
  useEffect(() => {
    const updatedData: Player[] = [];
    for (const jersey_number in playerDetails) {
      updatedData.push({
        jerseyId: parseInt(jersey_number),
        name: playerDetails[jersey_number].name,
        email: playerDetails[jersey_number].email,
        verification: playerDetails[jersey_number].verification,
      });
    }
    setData(updatedData);
  }, [playerDetails]);
  // RENDER ISSUE FIX END

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

  //Modal State
  const [addPlayerOpen, setAddPlayerOpen] = useState<boolean>(false);

  // Form Hook
  const { register, handleSubmit, reset } = useForm();
  const addPlayer = useAppState((state) => state.addPlayer);

  const onSubmit = async (data: FieldValues) => {
    setAddPlayerOpen(false);

    const response = await fetch(`${BASE_URL}/player/add`, {
      method: "POST",
      body: JSON.stringify({
        jerseyId: data.jersey_number,
        fullName: data.name,
        playerEmail: data.email,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      console.log("response OK", responseData);
      addPlayer(data.jersey_number, data.name, data.email);
    }

    reset();
  };

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
            <DialogModal
              open={addPlayerOpen}
              setOpen={setAddPlayerOpen}
              trigger={
                <Btn buttonStyle="primary" Icon={FaPlus} iconSizeEm={0.8}>
                  Add New Player
                </Btn>
              }
              title="Add New Player"
              description="Add a new player to your team, you can add player's email if you want them to see their impact analysis"
            >
              <form
                className={styles.addPlayerForm}
                onSubmit={handleSubmit(onSubmit)}
              >
                <label htmlFor="jersey_number">Jersey Number</label>
                <input
                  {...register("jersey_number", {
                    required: true,
                  })}
                  type="number"
                  name="jersey_number"
                  id="jersey_number"
                  placeholder="25"
                />
                <label htmlFor="name">Player Name</label>
                <input
                  {...register("name", {
                    required: true,
                  })}
                  type="text"
                  name="name"
                  placeholder="Johnathan Doe"
                />
                <label htmlFor="email">
                  Player's Email (Optional)
                  <span className={styles.additionalInfo}>
                    Link Impax Account
                  </span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="johndoe@gmail.com"
                />
                <Btn type="submit" Icon={FaPlus}>
                  Add New Player
                </Btn>
              </form>
            </DialogModal>
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
