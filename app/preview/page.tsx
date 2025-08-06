'use client'

import { useEffect, useState } from 'react';
import { BlockItem, BlockType } from '@/app/page'; // Import types
import { HeroBlock } from '@/components/builder/blocks/hero-block';
import { ContactBlock } from '@/components/builder/blocks/contact-block';
import { AboutBlock } from '@/components/builder/blocks/about-block';
import { AvailabilityBlock } from '@/components/builder/blocks/availability-block';
import { RoomBlock } from '@/components/builder/blocks/room-block';
import { ThemeProvider } from '@/context/theme-context'; // Import ThemeProvider

export default function PreviewPage() {
  const [blocks, setBlocks] = useState<BlockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedBlocks = localStorage.getItem('websiteBuilderBlocks');
    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading preview...</div>;
  }

  if (blocks.length === 0) {
    return <div className="flex items-center justify-center h-screen text-lg text-gray-500">No blocks to preview. Go back to the builder to add some!</div>;
  }

  const renderBlockComponent = (blockType: BlockType, blockData: any) => {
    switch (blockType) {
      case 'hero':
        return <HeroBlock {...blockData} />;
      case 'contact':
        return <ContactBlock {...blockData} />;
      case 'about':
        return <AboutBlock {...blockData} />;
      case 'availability':
        return <AvailabilityBlock {...blockData} />;
      case 'room':
        return <RoomBlock {...blockData} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider> {/* Wrap with ThemeProvider */}
      <div className="min-h-screen bg-background text-foreground">
        {blocks.map((block) => (
          <div key={block.id}>
            {renderBlockComponent(block.type, block.data)}
          </div>
        ))}
      </div>
    </ThemeProvider>
  );
}
