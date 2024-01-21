import React from "react";
import styles from "./MyTeams.module.scss";

import {
  ColumnDef,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MyTeam } from "../../../types";
import { Verification } from "../../PlayerManagement/PlayersTable/Verification/Verification";
import { myTeams } from "./myTeams";
import TeamActions from "./TeamsActions";

const columns: ColumnDef<MyTeam>[] = [
  {
    accessorKey: "team_id",
    size: 60,
    id: "team_id",
    header: "Team ID",
  },

  {
    accessorKey: "team_name",
    header: "Team Name",
    id: "team_name",
    size: 80,
  },

  {
    accessorKey: "verification",
    header: "Verification",
    id: "verification",
    size: 10,
    cell: ({ row }) => <Verification status={row.getValue("verification")} />,
  },
  {
    accessorKey: "edit",
    header: "",
    id: "edit",
    size: 20,
    cell: ({ row }) => (
      <TeamActions
        team_id={row.getValue("team_id")}
        team_name={row.getValue("team_name")}
        verification={row.getValue("verification")}
      />
    ),
  },
];
const MyTeamsTable = () => {
  const [data] = React.useState(() => [...myTeams]);
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
  return (
    <table className={styles.managersTable}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  width: header.column.getSize(),
                }}
              >
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
              <td
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyTeamsTable;
