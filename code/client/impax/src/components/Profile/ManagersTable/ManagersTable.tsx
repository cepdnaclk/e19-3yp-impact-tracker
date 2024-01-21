import React from "react";
import styles from "./ManagersTable.module.scss";

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
import { Manager } from "../../../types";
import { Verification } from "../../PlayerManagement/PlayersTable/Verification/Verification";
import ManagerActions from "./ManagerActions";
import { managers } from "./managersData";

const columns: ColumnDef<Manager>[] = [
  {
    accessorKey: "name",
    size: 2,
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <FaSort className={styles.icon} />
        </button>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
    id: "email",
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
    size: 20,
    cell: ({ row }) => (
      <ManagerActions
        name={row.getValue("name")}
        email={row.getValue("email")}
      />
    ),
  },
];
const ManagersTable = () => {
  const [data] = React.useState(() => [...managers]);
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

export default ManagersTable;
