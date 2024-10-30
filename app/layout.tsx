import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Panteon Games",
  description: "Panteon Games Leaderboard",
  authors: [{ name: "Panteon Games" }],
};

export const viewport:Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1625" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased selection:bg-purple-500/20 selection:text-purple-900 dark:selection:text-purple-200`}
      >
        <div
          className="min-h-screen 
                      bg-gradient-to-b from-game-light-background to-gray-50
                      dark:bg-gradient-to-b dark:from-game-dark-background dark:to-[#13111C]
                      text-gray-900 dark:text-gray-100
                      transition-colors duration-200"
        >
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
