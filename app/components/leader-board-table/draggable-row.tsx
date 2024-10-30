import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender } from '@tanstack/react-table';
import { GripVertical } from 'lucide-react';
import { Row } from '@tanstack/react-table';

interface DraggableRowProps {
  row: Row<any>;
}

export const DraggableRow = ({ row }: DraggableRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-game-light-background dark:bg-game-dark-background 
                hover:bg-gray-50 dark:hover:bg-[#2A2444] 
                border border-game-light-border dark:border-game-dark-border
                rounded-lg transition-colors
                ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center p-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-move mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <GripVertical className="h-5 w-5" />
        </div>
        
        {row.getVisibleCells().map((cell) => (
          <div
            key={cell.id}
            className="flex-1 text-sm text-gray-600 dark:text-gray-300"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        ))}
      </div>
    </div>
  );
};