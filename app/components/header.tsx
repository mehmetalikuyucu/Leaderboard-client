"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "../hooks/useTheme";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="bg-game-light-background-80 dark:bg-game-dark-background 
                      border-b border-game-light-border dark:border-game-dark-border 
                      shadow-sm dark:shadow-none
                      transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 
                      bg-game-light-border dark:bg-transparent
                        px-4 py-2"
          >
            <Image
              src="https://www.panteon.games/wp-content/themes/panteon/assets/img/logo@2x.png"
              alt="Panteon Games"
              width={120}
              height={40}
              className="h-8 w-auto
                       transition-opacity duration-200 
                       hover:opacity-90"
              priority
            />
          </div>

          <div className="ml-auto relative z-10">
            <div
              className="p-1 rounded-lg 
                          hover:bg-gray-100 dark:hover:bg-game-dark-background-80 
                          transition-colors duration-200"
            >
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
