import Search from "@/app/components/search";
import LeaderboardTable from "@/app/components/leader-board-table/leader-board-table";
import { Providers } from "./components/providers";

export default function Home() {
  return (
    <Providers>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1
            className="text-4xl font-bold 
                     bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 
                     bg-clip-text text-transparent
                     transition-colors duration-200"
          >
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your rankings and compete with others
          </p>
        </div>

        {/* Search Section */}
        <div className="relative">
          <div
            className="absolute inset-0 
                      bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/5 dark:to-blue-500/5 
                      blur-3xl 
                      -z-10"
          />
          <Search />
        </div>

        {/* Table Section */}
        <div className="relative">
          <div
            className="absolute inset-0 
                      bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 
                      blur-3xl 
                      -z-10"
          />
          <LeaderboardTable />
        </div>
      </div>
    </Providers>
  );
}
