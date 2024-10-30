import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        game: {
          dark: {
            background: "#1a1625",
            "background-80": "rgba(26, 22, 37, 0.8)",
            border: "rgba(147, 51, 234, 0.2)",
            ring: "rgba(147, 51, 234, 0.5)",
          },
          light: {
            background: "#ffffff",
            "background-80": "rgba(249, 250, 251, 0.8)",
            border: "rgba(233, 236, 239, 1)",
            ring: "rgba(167, 139, 250, 0.5)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
