'use client'

import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Loader2, UploadCloud, XCircle } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const newBlob = await response.json();
      onChange(newBlob.url);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image.');
      onChange(undefined); // Clear value on error
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onChange(undefined);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      {value ? (
        <div className="relative w-full h-48 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <Image src={value || "/placeholder.svg"} alt="Uploaded image" layout="fill" objectFit="cover" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={handleRemoveImage}
            aria-label="Remove image"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Uploading...</span>
            </div>
          ) : (
            <>
              <UploadCloud className="h-10 w-10 text-gray-400 dark:text-gray-500" />
              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Drag & drop or click to upload</span>
              <Input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept="image/*"
              />
            </>
          )}
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
