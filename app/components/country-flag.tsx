import { CountryFlagProps, SupportedCountries } from '../types/leader-board.types';
import { COUNTRY_FLAGS } from '../constants/country-flags';

export const CountryFlag = ({ country }: CountryFlagProps) => {
  return (
    <span>{COUNTRY_FLAGS[country as SupportedCountries] || "🏳️"}</span>
  );
};