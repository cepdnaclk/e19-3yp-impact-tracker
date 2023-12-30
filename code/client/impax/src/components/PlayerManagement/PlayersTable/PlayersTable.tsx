import React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
];

const columnHelper = createColumnHelper<Player>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const PlayersTable = () => {
  const [data, setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
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
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default PlayersTable;
