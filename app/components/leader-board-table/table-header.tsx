import { flexRender, Header, HeaderGroup } from '@tanstack/react-table';

interface TableHeaderProps {
  headerGroups: HeaderGroup<any>[];
}

export const TableHeader = ({ headerGroups }: TableHeaderProps) => {
  return (
    <div className="mb-6 rounded-lg bg-game-light-background dark:bg-game-dark-background p-4 border border-game-light-border dark:border-game-dark-border">
      <div className="flex items-center justify-between">
        {headerGroups.map((headerGroup) => (
          <div key={headerGroup.id} className="flex w-full">
            <div className="w-12"></div>
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className="flex-1 text-left text-sm text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
                onClick={() => header.column.toggleSorting()}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};