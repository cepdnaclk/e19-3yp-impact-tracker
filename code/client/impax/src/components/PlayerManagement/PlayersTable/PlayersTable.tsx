import React from "react";
import styles from "./PlayersTable.module.scss";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import PlayerActions from "./PlayerActions/PlayerActions";
import { Verification } from "./Verification/Verification";

type Player = {
  jerseyId: number;
  name: string;
  email: string;
  verification: "verified" | "pending" | "rejected";
};

const defaultData: Player[] = [
  {
    name: "Angelo Mathews",
    jerseyId: 69,
    email: "angelomathews@gmail.com",
    verification: "verified",
  },
  {
    name: "TM Dilshan",
    jerseyId: 23,
    email: "dilshan@gmail.com",
    verification: "pending",
  },
  {
    name: "Dasun Shanaka",
    jerseyId: 7,
    email: "shanaka@gmail.com",
    verification: "rejected",
  },
];

const columnHelper = createColumnHelper<Player>();

const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "jerseyId",
    header: "Jersey No.",
    cell: ({ row }) => {
      const jerseyId: number = row.getValue("jerseyId");
      return (
        <div className={styles.jerseyId}>
          {String(jerseyId).padStart(2, "0")}
        </div>
      );
    },
  },

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "verification",
    header: "Verification",
    cell: ({ row }) => <Verification status={row.getValue("verification")} />,
  },
  {
    accessorKey: "edit",
    header: "",
    cell: ({ row }) => <PlayerActions jerseyId={row.getValue("jerseyId")} />,
  },
];

const PlayersTable = () => {
  const [data, setData] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersTable;
