import { Row } from "@tanstack/react-table";
import { CountryFlag } from "./country-flag";
import { ChevronsUpDown } from "lucide-react";
import { Player } from "../types/leader-board.types";

export const RankCell = ({ row }: { row: Row<Player> }) => (
  <div className="text-gray-700 dark:text-gray-300 font-medium">
    #{row.original.rank}
  </div>
);

export const PlayerCell = ({ row }: { row: Row<Player> }) => (
  <div className="flex flex-col">
    <span className="text-gray-900 dark:text-gray-200 font-medium">
      {row.original.playerName}
    </span>
    <span className="text-sm text-gray-500 dark:text-gray-400">
      {row.original.details.name} {row.original.details.surname}
    </span>
  </div>
);

export const CountryCell = ({ row }: { row: Row<Player> }) => (
  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
    <CountryFlag country={row.original.details.country} />
    <span>{row.original.details.country}</span>
  </div>
);

export const MoneyCell = ({ row }: { row: Row<Player> }) => (
  <div className="text-green-600 dark:text-green-400 font-medium">
    ${row.original.details.money}
  </div>
);

export const ColumnHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-400 font-medium">
    {title}
    <ChevronsUpDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
  </div>
);
