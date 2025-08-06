import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ContactBlockProps {
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  isEditing?: boolean;
  onUpdate?: (data: { title?: string; description?: string; email?: string; phone?: string; address?: string }) => void;
}

export function ContactBlock({ title = "Get in Touch", description = "Have a question or want to work together? Fill out the form below or reach out directly.", email = "info@example.com", phone = "+1 (123) 456-7890", address = "123 Main St, Anytown USA", isEditing = false, onUpdate }: ContactBlockProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-theme-secondary-bg text-theme-secondary-text">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {isEditing ? (
              <Input
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-transparent border-b border-theme-secondary-text focus:outline-none focus:ring-0"
                value={title}
                onChange={(e) => onUpdate?.({ title: e.target.value })}
                placeholder="Contact Title"
              />
            ) : (
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {isEditing ? (
              <Textarea
                className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed bg-transparent border-b border-theme-secondary-text/50 focus:outline-none focus:ring-0 text-theme-secondary-text"
                value={description}
                onChange={(e) => onUpdate?.({ description: e.target.value })}
                placeholder="Contact Description"
              />
            ) : (
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-theme-secondary-text/90">
                {description}
              </p>
            )}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-theme-secondary-text/70" />
                {isEditing ? (
                  <Input
                    value={email}
                    onChange={(e) => onUpdate?.({ email: e.target.value })}
                    placeholder="Email Address"
                    className="text-theme-secondary-text bg-theme-input-bg border-theme-input-border"
                  />
                ) : (
                  <p className="text-theme-secondary-text">{email}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-theme-secondary-text/70" />
                {isEditing ? (
                  <Input
                    value={phone}
                    onChange={(e) => onUpdate?.({ phone: e.target.value })}
                    placeholder="Phone Number"
                    className="text-theme-secondary-text bg-theme-input-bg border-theme-input-border"
                  />
                ) : (
                  <p className="text-theme-secondary-text">{phone}</p>
                )}
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-theme-secondary-text/70 flex-shrink-0 mt-1" />
                {isEditing ? (
                  <Textarea
                    value={address}
                    onChange={(e) => onUpdate?.({ address: e.target.value })}
                    placeholder="Address"
                    className="text-theme-secondary-text bg-theme-input-bg border-theme-input-border min-h-[unset]"
                  />
                ) : (
                  <p className="text-theme-secondary-text">{address}</p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto">
            <form className="grid gap-4">
              <Input placeholder="Name" type="text" disabled={isEditing} className="bg-theme-input-bg text-theme-input-text border-theme-input-border" />
              <Input placeholder="Email" type="email" disabled={isEditing} className="bg-theme-input-bg text-theme-input-text border-theme-input-border" />
              <Input placeholder="Subject" type="text" disabled={isEditing} className="bg-theme-input-bg text-theme-input-text border-theme-input-border" />
              <Textarea className="min-h-[120px] bg-theme-input-bg text-theme-input-text border-theme-input-border" placeholder="Message" disabled={isEditing} />
              <Button type="submit" disabled={isEditing} className="bg-theme-primary-bg text-theme-primary-text hover:bg-theme-primary-bg/90">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
