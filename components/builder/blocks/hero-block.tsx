import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Import cn for conditional class joining

interface HeroBlockProps {
  title?: string;
  description?: string;
  ctaText?: string;
  imageUrl?: string;
  isEditing?: boolean;
  onUpdate?: (data: { title?: string; description?: string; ctaText?: string; imageUrl?: string }) => void;
}

export function HeroBlock({ title = "Your Awesome Website", description = "Build and launch your dream website with ease.", ctaText = "Get Started", imageUrl = "/placeholder.svg?height=400&width=600&text=Hero+Image", isEditing = false, onUpdate }: HeroBlockProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-theme-primary-bg-from to-theme-primary-bg-to text-theme-primary-text">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              {isEditing ? (
                <Input
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-transparent border-b border-theme-primary-text focus:outline-none focus:ring-0"
                  value={title}
                  onChange={(e) => onUpdate?.({ title: e.target.value })}
                  placeholder="Hero Title"
                />
              ) : (
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {title}
                </h1>
              )}
              {isEditing ? (
                <Textarea
                  className="max-w-[600px] md:text-xl bg-transparent border-b border-theme-primary-text/50 focus:outline-none focus:ring-0 text-theme-primary-text"
                  value={description}
                  onChange={(e) => onUpdate?.({ description: e.target.value })}
                  placeholder="Hero Description"
                />
              ) : (
                <p className="max-w-[600px] md:text-xl text-theme-primary-text/90">
                  {description}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {isEditing ? (
                <Input
                  className="inline-flex h-10 items-center justify-center rounded-md bg-theme-button-bg px-8 text-sm font-medium text-theme-button-text shadow transition-colors hover:bg-theme-button-hover-bg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  value={ctaText}
                  onChange={(e) => onUpdate?.({ ctaText: e.target.value })}
                  placeholder="CTA Button Text"
                />
              ) : (
                <Button className="inline-flex h-10 items-center justify-center rounded-md bg-theme-button-bg px-8 text-sm font-medium text-theme-button-text shadow transition-colors hover:bg-theme-button-hover-bg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  {ctaText}
                </Button>
              )}
            </div>
          </div>
          {isEditing ? (
            <ImageUpload
              label="Hero Image"
              value={imageUrl}
              onChange={(url) => onUpdate?.({ imageUrl: url })}
            />
          ) : (
            <Image
              src={imageUrl || "/placeholder.svg?height=400&width=600&text=Hero+Image"}
              width="600"
              height="400"
              alt="Hero Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          )}
        </div>
      </div>
    </section>
  );
}
