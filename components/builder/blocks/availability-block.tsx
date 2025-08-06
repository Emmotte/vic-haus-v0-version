import { CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface AvailabilityBlockProps {
  title?: string;
  description?: string;
  availabilityInfo?: string;
  isEditing?: boolean;
  onUpdate?: (data: { title?: string; description?: string; availabilityInfo?: string }) => void;
}

export function AvailabilityBlock({ title = "Check Our Availability", description = "Find out when our property is available for your next stay. Use the calendar below to select your desired dates.", availabilityInfo = "Please contact us directly for the most up-to-date availability and booking.", isEditing = false, onUpdate }: AvailabilityBlockProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-theme-secondary-bg text-theme-secondary-text">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            {isEditing ? (
              <Input
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-transparent border-b border-theme-secondary-text focus:outline-none focus:ring-0"
                value={title}
                onChange={(e) => onUpdate?.({ title: e.target.value })}
                placeholder="Availability Title"
              />
            ) : (
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {isEditing ? (
              <Textarea
                className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed bg-transparent border-b border-theme-secondary-text/50 focus:outline-none focus:ring-0 text-theme-secondary-text"
                value={description}
                onChange={(e) => onUpdate?.({ description: e.target.value })}
                placeholder="Availability Description"
              />
            ) : (
              <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-theme-secondary-text/90">
                {description}
              </p>
            )}
          </div>
          <Card className="w-full max-w-md bg-theme-card-bg text-theme-card-text border-theme-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Availability Calendar</CardTitle>
              <CalendarDays className="h-4 w-4 text-theme-secondary-text/70" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">Coming Soon!</div>
              {isEditing ? (
                <Textarea
                  className="text-xs text-theme-secondary-text/70 min-h-[unset] bg-theme-input-bg border-theme-input-border"
                  value={availabilityInfo}
                  onChange={(e) => onUpdate?.({ availabilityInfo: e.target.value })}
                  placeholder="Availability Info"
                />
              ) : (
                <p className="text-xs text-theme-secondary-text/70">
                  {availabilityInfo}
                </p>
              )}
              <div className="mt-4 h-48 w-full bg-theme-secondary-bg rounded-md flex items-center justify-center text-theme-secondary-text/50 border border-theme-border">
                Calendar Placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
