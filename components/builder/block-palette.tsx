'use client'

import { useDraggable } from '@dnd-kit/core';
import { Card } from '@/components/ui/card';
import { BlockType } from '@/app/page'; // Import BlockType from app/page

interface DraggableBlockProps {
  id: string;
  blockType: BlockType;
  label: string;
}

function DraggableBlock({ id, blockType, label }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      type: 'palette-item',
      blockType: blockType,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 mb-2 cursor-grab active:cursor-grabbing bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
    >
      {label}
    </Card>
  );
}

export function BlockPalette() {
  return (
    <div className="flex flex-col gap-2">
      <DraggableBlock id="palette-hero" blockType="hero" label="Hero Section" />
      <DraggableBlock id="palette-contact" blockType="contact" label="Contact Us" />
      <DraggableBlock id="palette-about" blockType="about" label="About Host" />
      <DraggableBlock id="palette-availability" blockType="availability" label="Availability" />
      <DraggableBlock id="palette-room" blockType="room" label="Room Section" />
    </div>
  );
}
