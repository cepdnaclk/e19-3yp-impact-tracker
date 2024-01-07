import React from "react";
import styles from "./PlayersTable.module.scss";
import { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Player } from "../PlayerManagement";

const PlayersTable: React.FC<{ table: Table<Player> }> = ({ table }) => {
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

export default PlayersTable;
