"use client";

import { Search as SearchIcon } from "lucide-react";
import { useAtom } from "jotai";
import { searchPlayerAtom } from "../store/search-player";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
const Search = () => {
  const [searchValue, setSearchValue] = useAtom(searchPlayerAtom);

  const [inputValue, setInputValue] = useState(searchValue);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearchValue(value);
    }, 300),
    [searchValue]
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearch(value);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400 dark:text-white" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full bg-game-light-background-80 dark:bg-game-dark-background-80 
                   text-gray-800 dark:text-white 
                   placeholder-gray-400
                   pl-11 pr-14 py-3 rounded-lg 
                   border border-game-light-border dark:border-game-dark-border 
                   focus:outline-none focus:ring-2 
                   focus:ring-game-light-ring dark:focus:ring-game-dark-ring 
                   transition-all duration-200"
          placeholder="Search Player Name"
        />
      </div>

      {searchValue.length > 0 && (
        <div
          className="absolute w-full mt-2 
                      bg-game-light-background dark:bg-game-dark-background 
                      border border-game-light-border dark:border-game-dark-border 
                      rounded-lg shadow-lg py-2 z-10"
        >
          <div className="px-4 py-2 text-gray-600 dark:text-gray-400 text-sm">
            No results found
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
