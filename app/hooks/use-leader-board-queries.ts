import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CLIENT_URLS } from "../constants/client-urls";
import { Player } from "../types/leader-board.types";

export type QueryResponse = {
  data: Player[];
};

export const useLeaderboardQueries = (searchValue: string) => {
  const prizePoolQuery = useQuery({
    queryKey: ["prizePoolQuery"],
    queryFn: async () => {
      const response = await axios.get(
        CLIENT_URLS.base + CLIENT_URLS.prizePool
      );
      return response.data;
    },
  });

  const playerQuery = useQuery({
    queryKey: ["playersQuery", searchValue],
    queryFn: async () => {
      const response = await axios.get<QueryResponse>(
        `${CLIENT_URLS.base + CLIENT_URLS.search}?playerName=${searchValue}`
      );
      return response.data;
    },
    staleTime: 300,
  });

  return {
    prizePool: prizePoolQuery.data,
    players: playerQuery.data?.data || [],
    isPrizePoolLoading: prizePoolQuery.isLoading,
    isPlayersLoading: playerQuery.isLoading,
    isError: prizePoolQuery.isError || playerQuery.isError,
    error: prizePoolQuery.error || playerQuery.error,
  };
};
