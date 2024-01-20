import React from "react";
import styles from "./TeamAnalyticsTable.module.scss";

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
import { FaSort } from "react-icons/fa";
import { TeamAnalyticsColumns } from "../../../types";
import { teamAnalyticsTableData } from "./teamData";

const columns: ColumnDef<TeamAnalyticsColumns>[] = [
  {
    accessorKey: "jersey_number",
    size: 2,
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jersey No <FaSort className={styles.icon} />
        </button>
      );
    },
    cell: ({ row }) => {
      const jersey_number: number = row.getValue("jersey_number");
      return (
        <div className={styles.jerseyId}>
          {String(jersey_number).padStart(2, "0")}
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
    accessorKey: "impacts_recorded",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Impacts Recorded <FaSort className={styles.icon} />
        </button>
      );
    },
    id: "impacts_recorded",
    size: 100,
  },
  {
    accessorKey: "highest_impact",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Highest Impact <FaSort className={styles.icon} />
        </button>
      );
    },
    id: "highest_impact",
  },
  {
    accessorKey: "average_impact",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Average Impact <FaSort className={styles.icon} />
        </button>
      );
    },
    id: "average_impact",
  },
  {
    accessorKey: "dominant_direction",
    header: "Dominant Direction",
    id: "dominant_direction",
  },
  {
    accessorKey: "concussions",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Concussions <FaSort className={styles.icon} />
        </button>
      );
    },
    id: "concussions",
  },
];
const TeamAnalyticsTable = () => {
  const [data] = React.useState(() => [...teamAnalyticsTableData]);
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
    <table className={styles.playersTable}>
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
  );
};

export default TeamAnalyticsTable;
