"use client";

import React from "react";
import { Coins, Users } from "lucide-react";
import { useLeaderboard } from "@hooks/use-leader-board";
import { useDragAndDrop } from "@hooks/use-drag-drop";
import { DraggableRow } from "@components/leader-board-table/draggable-row";
import { TableHeader } from "@components/leader-board-table/table-header";
import { getLeaderBoardColumns } from "./leader-board-table-columns";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

export default function LeaderboardTable() {
  const {
    sorting,
    setSorting,
    grouping,
    setGrouping,
    rows,
    moveRow,
    prizePool,
    isError,
    error,
    isPrizePoolLoading,
    isPlayersLoading,
  } = useLeaderboard();

  const { sensors, handleDragEnd } = useDragAndDrop(moveRow);

  const columns = React.useMemo(() => getLeaderBoardColumns(), []);

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
      grouping: grouping ? ["details_country"] : [],
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    enableGrouping: true,
  });

  if (isError) {
    return (
      <div className="text-red-500 p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
        Error loading data: {error?.message}
      </div>
    );
  }

  if (isPlayersLoading || isPrizePoolLoading) {
    return <div className="p-4">Loading leaderboard data...</div>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <button
          onClick={() => setGrouping(!grouping)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            grouping
              ? "bg-purple-500 text-white"
              : "bg-game-light-background dark:bg-game-dark-background text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
          }`}
        >
          <Users className="h-4 w-4" />
          Group by Country
        </button>

        <div className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-purple-500 text-white border border-transparent hover:border-purple-600 dark:hover:border-white">
          Prize Pool: {prizePool}
          <Coins className="h-4 w-4" />
        </div>
      </div>

      <TableHeader headerGroups={table.getHeaderGroups()} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={table.getRowModel().rows.map((row) => row.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {table.getRowModel().rows.map((row) => (
              <DraggableRow key={row.id} row={row} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
