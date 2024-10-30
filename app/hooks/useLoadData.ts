import { useState } from "react";
import axios from "axios";

export enum Country {
  TR = "Turkey",
  US = "United States",
  UK = "United Kingdom",
  DE = "Germany",
  FR = "France",
}

export enum PlayerRank {
  BRONZE = "Bronze",
  SILVER = "Silver",
  GOLD = "Gold",
}


interface User {
  id: string;
  username: string;
  name: string;
  surname: string;
  country: Country;
}

interface Player {
  id: string;
  playerName: string;
  playerRank: PlayerRank;
  userId: string;
}

interface Stats {
  users: number;
  players: number;
  moneyAdded: number;
}

interface LogEntry {
  timestamp: string;
  message: string;
}


interface UseLoadDataReturn {
  isLoading: boolean;
  isDisabled: boolean;
  progress: number;
  currentStep: string;
  stats: Stats;
  error: string;

  createBulkData: () => Promise<void>;
}


const NAMES: string[] = [
  "John",
  "Jane",
  "Michael",
  "Emma",
  "William",
  "Olivia",
  "James",
  "Sophia",
];
const SURNAMES: string[] = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
];

const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
const getRandomMoney = (): number =>
  Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
const getRandomCountry = (): Country =>
  getRandomElement(Object.values(Country));
const getRandomRank = (): PlayerRank =>
  getRandomElement(Object.values(PlayerRank));

export const useLoadData = (): UseLoadDataReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [stats, setStats] = useState<Stats>({
    users: 0,
    players: 0,
    moneyAdded: 0,
  });
  const [error, setError] = useState<string>("");


  const createBulkData = async (): Promise<void> => {
    setIsLoading(true);
    setIsDisabled(true);
    setProgress(0);
    setError("");
    setStats({ users: 0, players: 0, moneyAdded: 0 });
    localStorage.setItem("loadDataDisabled", "true");
    try {
      const totalCount = 150;
      const createdUsers: User[] = [];
      const createdPlayers: Player[] = [];

      setCurrentStep("Creating Users");
      for (let i = 0; i < totalCount; i++) {
        try {
          const userData = {
            username: `testuser${i + 1}`,
            name: getRandomElement(NAMES),
            surname: getRandomElement(SURNAMES),
            country: getRandomCountry(),
          };

          const userResponse = await axios.post<User>(
            "http://localhost:3001/user",
            userData
          );
          createdUsers.push(userResponse.data);

          setStats((prev) => ({ ...prev, users: prev.users + 1 }));
          setProgress(((i + 1) * 33) / totalCount);

          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";
        }
      }

      setCurrentStep("Creating Players");
      for (let i = 0; i < createdUsers.length; i++) {
        try {
          const user = createdUsers[i];
          const playerData = {
            playerName: `${user.name}${user.surname}${i}`,
            playerRank: getRandomRank(),
            userId: user.id,
          };

          const playerResponse = await axios.post<Player>(
            "http://localhost:3001/player",
            playerData
          );

          setStats((prev) => ({ ...prev, players: prev.players + 1 }));
          setProgress(33 + ((i + 1) * 33) / createdUsers.length);
          createdPlayers.push(playerResponse.data);
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";

        }
      }


      setCurrentStep("Adding Money");
      for (let i = 0; i < createdUsers.length; i++) {
        try {
          const player = createdPlayers[i];
          const amount = getRandomMoney();

          await axios.post<void>(
            `http://localhost:3001/player/${player.id}/money?amount=${amount}`,
            ""
          );

          setStats((prev) => ({ ...prev, moneyAdded: prev.moneyAdded + 1 }));
          setProgress(66 + ((i + 1) * 34) / createdUsers.length);
         
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";
         
        }
      }

      setProgress(100);
      setCurrentStep("Completed");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isDisabled,
    progress,
    currentStep,
    stats,
    error,
    createBulkData,
  };
};
