import { SupportedCountries } from '../types/leader-board.types';

export const COUNTRY_FLAGS: Record<SupportedCountries, string> = {
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  "Turkey": "🇹🇷",
  "France": "🇫🇷",
  "Germany": "🇩🇪",
} as const;