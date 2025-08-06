'use client'

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { BlockItem, BlockType } from '@/app/page'; // Import types
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import actual block components
import { HeroBlock } from './blocks/hero-block';
import { ContactBlock } from './blocks/contact-block';
import { AboutBlock } from './blocks/about-block';
import { AvailabilityBlock } from './blocks/availability-block';
import { RoomBlock } from './blocks/room-block'; // Import the new RoomBlock

interface BlockRendererProps extends BlockItem {
  isEditing: boolean;
  onUpdate: (data: any) => void;
  onToggleEdit: () => void;
  onDelete: () => void;
}

export function BlockRenderer({ id, type, data, isEditing, onUpdate, onToggleEdit, onDelete }: BlockRendererProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderBlockComponent = (blockType: BlockType, blockData: any, editing: boolean, updateHandler: (data: any) => void) => {
    switch (blockType) {
      case 'hero':
        return <HeroBlock {...blockData} isEditing={editing} onUpdate={updateHandler} />;
      case 'contact':
        return <ContactBlock {...blockData} isEditing={editing} onUpdate={updateHandler} />;
      case 'about':
        return <AboutBlock {...blockData} isEditing={editing} onUpdate={updateHandler} />;
      case 'availability':
        return <AvailabilityBlock {...blockData} isEditing={editing} onUpdate={updateHandler} />;
      case 'room':
        return <RoomBlock {...blockData} isEditing={editing} onUpdate={updateHandler} />;
      default:
        return <div>Unknown Block Type</div>;
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="relative p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm group"
    >
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleEdit} aria-label={isEditing ? "Stop editing" : "Edit block"}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" {...listeners} {...attributes} aria-label="Drag block">
          <GripVertical className="h-4 w-4" />
          <span className="sr-only">Drag block</span>
        </Button>
        <Button variant="destructive" size="icon" className="h-8 w-8" onClick={onDelete} aria-label="Delete block">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {renderBlockComponent(type, data, isEditing, onUpdate)}
    </Card>
  );
}
