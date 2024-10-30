export type PlayerDetails = {
    playerName: string;
    money: string;
    rank: string;
    country: string;
    userId: string;
    username: string;
    name: string;
    surname: string;
  };
  
  export type Player = {
    playerName: string;
    score: number;
    rank: number;
    details: PlayerDetails;
  };
  
  export type CountryFlagProps = {
    country: string;
  };
  
  export type SupportedCountries = "United States" | "United Kingdom" | "Turkey" | "France" | "Germany";