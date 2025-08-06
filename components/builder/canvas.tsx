'use client'

import { useDroppable } from '@dnd-kit/core';
import { Card } from '@/components/ui/card';
import { BlockItem } from '@/app/page'; // Import BlockItem from app/page

interface CanvasProps {
  children: React.ReactNode;
  blocks: BlockItem[]; // Pass blocks to determine if canvas is empty
}

export function Canvas({ children, blocks }: CanvasProps) {
  const { setNodeRef } = useDroppable({
    id: 'canvas-drop-area',
  });

  return (
    <Card
      ref={setNodeRef}
      className="flex-1 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-y-auto relative"
    >
      {blocks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-lg">
          Drag blocks here to build your page
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </Card>
  );
}
