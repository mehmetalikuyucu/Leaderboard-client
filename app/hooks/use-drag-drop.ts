import { useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';

export const useDragAndDrop = (onMove: (dragIndex: number, hoverIndex: number) => void) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      onMove(Number(active.id), Number(over?.id));
    }
  };

  return {
    sensors,
    handleDragEnd,
  };
};