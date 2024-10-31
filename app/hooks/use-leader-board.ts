import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { searchPlayerAtom } from "@/app/store/search-player";
import type { SortingState } from "@tanstack/react-table";
import { useLeaderboardQueries } from "./use-leader-board-queries";
import { Player } from "../types/leader-board.types";

export const useLeaderboard = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState(false);
  const [rows, setRows] = useState<Player[]>([]);
  const [searchValue] = useAtom(searchPlayerAtom);

  const {
    prizePool,
    players,
    isPrizePoolLoading,
    isPlayersLoading,
    isError,
    error,
  } = useLeaderboardQueries(searchValue);

  useEffect(() => {
    if (players) {
      setRows(players);
    }
  }, [players]);

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      const [draggedRow] = newRows.splice(dragIndex, 1);
      newRows.splice(hoverIndex, 0, draggedRow);
      return newRows;
    });
  };

  return {
    sorting,
    setSorting,
    grouping,
    setGrouping,
    rows,
    moveRow,
    prizePool,
    isPrizePoolLoading,
    isPlayersLoading,
    isError,
    error,
  };
};
