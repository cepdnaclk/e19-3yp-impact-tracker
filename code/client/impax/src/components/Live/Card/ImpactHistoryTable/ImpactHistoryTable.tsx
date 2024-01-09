import React from "react";
import styles from "./ImpactHistoryTable.module.scss"; // Import your styles
import { Impact } from "../../../../types";

import {
  flexRender,
  ColumnDef,
  // createColumnHelper,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columns: ColumnDef<Impact>[] = [
  {
    accessorKey: "magnitude",
    header: "Magnitude",
    size: 2, // Adjust column sizes as needed
  },
  {
    accessorKey: "direction",
    header: "Direction",
    size: 80, // Adjust column sizes as needed
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    size: 30, // Adjust column sizes as needed
    cell: ({ row }) => new Date(row.getValue("timestamp")).toLocaleTimeString(),
  },
];
const ImpactHistoryTable: React.FC<{
  impactHistory: Impact[];
}> = ({ impactHistory }) => {
  const defaultData = impactHistory;

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
  return (
    <table className={styles.impactHistoryTable}>
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

export default ImpactHistoryTable;
