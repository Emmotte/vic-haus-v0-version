import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { cn } from "@/lib/utils";

interface AboutBlockProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  isEditing?: boolean;
  onUpdate?: (data: { title?: string; description?: string; imageUrl?: string }) => void;
}

export function AboutBlock({ title = "About Your Host", description = "Welcome! I'm [Host Name], and I'm passionate about providing a comfortable and memorable stay for my guests. With years of experience in hospitality, I strive to ensure every detail is perfect, from the cozy decor to the local recommendations. My goal is to make you feel right at home.", imageUrl = "/placeholder.svg?height=300&width=300&text=Host+Image", isEditing = false, onUpdate }: AboutBlockProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {isEditing ? (
            <ImageUpload
              label="Host Image"
              value={imageUrl}
              onChange={(url) => onUpdate?.({ imageUrl: url })}
            />
          ) : (
            <Image
              src={imageUrl || "/placeholder.svg?height=300&width=300&text=Host+Image"}
              width="300"
              height="300"
              alt="Host Image"
              className="mx-auto aspect-square overflow-hidden rounded-full object-cover object-center sm:w-full lg:order-first"
            />
          )}
          <div className="space-y-4 text-center lg:text-left">
            {isEditing ? (
              <Input
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-transparent border-b border-foreground focus:outline-none focus:ring-0"
                value={title}
                onChange={(e) => onUpdate?.({ title: e.target.value })}
                placeholder="About Title"
              />
            ) : (
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {isEditing ? (
              <Textarea
                className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed bg-transparent border-b border-foreground/50 focus:outline-none focus:ring-0 text-foreground"
                value={description}
                onChange={(e) => onUpdate?.({ description: e.target.value })}
                placeholder="About Description"
              />
            ) : (
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground mx-auto lg:mx-0">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
