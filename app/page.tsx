'use client'

import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { BlockPalette } from '@/components/builder/block-palette';
import { Canvas } from '@/components/builder/canvas';
import { BlockRenderer } from '@/components/builder/block-renderer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Trash2, Pencil } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/context/theme-context'; // Import useTheme
import { themes } from '@/lib/themes'; // Import themes list

// Define types for blocks
export type BlockType = 'hero' | 'contact' | 'about' | 'availability' | 'room';

export interface BlockItem {
  id: string;
  type: BlockType;
  data: any; // This will hold the content for the block
}

export default function WebsiteBuilder() {
  const [blocks, setBlocks] = useState<BlockItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const { currentTheme, setTheme } = useTheme(); // Use the theme hook

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Load blocks from localStorage on initial render
  useEffect(() => {
    const savedBlocks = localStorage.getItem('websiteBuilderBlocks');
    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks));
    }
  }, []);

  // Save blocks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('websiteBuilderBlocks', JSON.stringify(blocks));
  }, [blocks]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    // Handle dropping a new block from the palette onto the canvas
    if (active.data.current?.type === 'palette-item') {
      const newBlockType = active.data.current.blockType as BlockType;
      const newBlockId = `block-${Date.now()}`; // Unique ID for the new block
      const newBlock: BlockItem = {
        id: newBlockId,
        type: newBlockType,
        data: {}, // Initialize with empty data
      };

      // If dropped onto an existing block, insert it there
      if (over.id && blocks.some(block => block.id === over.id)) {
        const overIndex = blocks.findIndex(block => block.id === over.id);
        const newBlocks = [...blocks];
        newBlocks.splice(overIndex, 0, newBlock);
        setBlocks(newBlocks);
      } else {
        // Otherwise, add to the end of the canvas
        setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
      }
    } else if (active.id !== over.id) {
      // Handle reordering existing blocks on the canvas
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);
      setBlocks((blocks) => arrayMove(blocks, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleUpdateBlock = (id: string, newData: any) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, data: { ...block.data, ...newData } } : block
      )
    );
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  const activeBlockType = activeId ? (blocks.find(b => b.id === activeId)?.type || (activeId.startsWith('palette-') ? activeId.replace('palette-', '') : null)) : null;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {/* Left Sidebar: Block Palette */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Blocks</h2>
          <BlockPalette />
        </aside>

        {/* Main Content: Canvas */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h1 className="text-xl font-bold">Website Builder</h1>
            <div className="flex items-center gap-4">
              <Select onValueChange={(value) => setTheme(value as ThemeName)} value={currentTheme}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.name} value={theme.name}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link href="/preview" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Preview Site</Button>
              </Link>
              <Button>Generate Site</Button>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-950">
            <Canvas blocks={blocks}>
              <SortableContext items={blocks.map(block => block.id)} strategy={verticalListSortingStrategy}>
                {blocks.map((block) => (
                  <BlockRenderer
                    key={block.id}
                    id={block.id}
                    type={block.type}
                    data={block.data}
                    isEditing={editingBlockId === block.id}
                    onUpdate={(newData) => handleUpdateBlock(block.id, newData)}
                    onToggleEdit={() => setEditingBlockId(editingBlockId === block.id ? null : block.id)}
                    onDelete={() => handleDeleteBlock(block.id)}
                  />
                ))}
              </SortableContext>
            </Canvas>
          </div>
        </main>

        <DragOverlay>
          {activeId && (
            <Card className="p-4 bg-white dark:bg-gray-800 shadow-lg">
              {activeBlockType === 'hero' && <div>Hero Section</div>}
              {activeBlockType === 'contact' && <div>Contact Us</div>}
              {activeBlockType === 'about' && <div>About Host</div>}
              {activeBlockType === 'availability' && <div>Availability</div>}
              {activeBlockType === 'room' && <div>Room Section</div>}
              {activeId.startsWith('palette-') && (
                <div>{activeId.replace('palette-', '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}</div>
              )}
            </Card>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
