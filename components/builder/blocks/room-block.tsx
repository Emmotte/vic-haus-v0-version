import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface RoomBlockProps {
  title?: string;
  description?: string;
  images?: string[];
  isEditing?: boolean;
  onUpdate?: (data: { title?: string; description?: string; images?: string[] }) => void;
}

export function RoomBlock({ title = "Cozy Room", description = "A beautiful and comfortable room perfect for your stay.", images = [], isEditing = false, onUpdate }: RoomBlockProps) {
  const handleImageChange = (index: number, url: string | undefined) => {
    const newImages = [...images];
    if (url) {
      newImages[index] = url;
    } else {
      newImages.splice(index, 1); // Remove image if undefined
    }
    onUpdate?.({ images: newImages.filter(Boolean) }); // Filter out any null/undefined
  };

  const handleAddImage = () => {
    onUpdate?.({ images: [...images, ""] }); // Add an empty string for a new upload slot
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onUpdate?.({ images: newImages });
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-theme-card-bg text-theme-card-text">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            {isEditing ? (
              <Input
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-transparent border-b border-theme-card-text focus:outline-none focus:ring-0"
                value={title}
                onChange={(e) => onUpdate?.({ title: e.target.value })}
                placeholder="Room Title"
              />
            ) : (
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {isEditing ? (
              <Textarea
                className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed bg-transparent border-b border-theme-card-text/50 focus:outline-none focus:ring-0 text-theme-card-text"
                value={description}
                onChange={(e) => onUpdate?.({ description: e.target.value })}
                placeholder="Room Description"
              />
            ) : (
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-theme-card-text/90">
                {description}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((imgUrl, index) => (
              <div key={index} className="relative">
                {isEditing ? (
                  <>
                    <ImageUpload
                      label={`Image ${index + 1}`}
                      value={imgUrl}
                      onChange={(url) => handleImageChange(index, url)}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full z-10"
                      onClick={() => handleRemoveImage(index)}
                      aria-label="Remove image"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Image
                    src={imgUrl || "/placeholder.svg?height=200&width=300&text=Room+Image"}
                    width="300"
                    height="200"
                    alt={`Room Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
            ))}
            {isEditing && (
              <Button onClick={handleAddImage} className="w-full h-48 border-2 border-dashed border-theme-border rounded-md flex flex-col items-center justify-center text-theme-secondary-text hover:bg-theme-secondary-bg/50">
                <PlusCircle className="h-8 w-8" />
                Add Image
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
