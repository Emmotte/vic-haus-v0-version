"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { MountainIcon } from "@/components/ui/mountain-icon"
import { toast } from "@/hooks/use-toast"

export default function Home() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isPending, setIsPending] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("message", message)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
          variant: "default",
        })
        setName("")
        setEmail("")
        setMessage("")
      } else {
        toast({
          title: "Error!",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to submit contact form:", error)
      toast({
        title: "Error!",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="sr-only">open-bnb</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Pricing
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                    Create a stunning vacation rental website in minutes.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    open-bnb is the easiest way to build a professional website for your vacation rental. No coding
                    required.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="relative w-full h-full">
                <Image
                  src="/images/herosite.png"
                  width="550"
                  height="550"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground">
                  Everything you need to manage your rental.
                </h2>
                <p className="max-w-[900px] text-lg text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From stunning photo galleries to seamless booking and payment processing, open-bnb has you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16">
              <Image
                src="/images/roomshowcase.png"
                width="550"
                height="310"
                alt="Feature"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-lg"
              />
              <div className="flex flex-col justify-center space-y-6">
                <ul className="grid gap-8">
                  <li>
                    <div className="grid gap-2">
                      <h3 className="text-xl font-bold text-foreground">Beautiful Templates</h3>
                      <p className="text-muted-foreground text-base">
                        Choose from a variety of professionally designed templates to showcase your property.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-2">
                      <h3 className="text-xl font-bold text-foreground">Easy Content Management</h3>
                      <p className="text-muted-foreground text-base">
                        Update your photos, descriptions, and availability with our intuitive dashboard.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-2">
                      <h3 className="text-xl font-bold text-foreground">Seamless Booking</h3>
                      <p className="text-muted-foreground text-base">
                        Accept online bookings and payments with our secure and reliable system.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-16 md:py-24 lg:py-32 bg-background">
          <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground">
                Affordable pricing for every host.
              </h2>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for you. Get started for free, and upgrade when you're ready.
              </p>
            </div>
            <div className="mx-auto w-full max-w-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center rounded-lg border p-8 shadow-lg transition-transform duration-300 hover:scale-105">
                  <div className="space-y-3 text-center">
                    <h3 className="text-3xl font-bold text-foreground">Hobby</h3>
                    <p className="text-muted-foreground text-base">For personal projects and small teams.</p>
                  </div>
                  <div className="my-8">
                    <span className="text-5xl font-bold text-foreground">$19</span>
                    <span className="text-muted-foreground text-xl">/mo</span>
                  </div>
                  <Button
                    size="lg"
                    className="w-full py-3 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Get Started
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-8 shadow-lg transition-transform duration-300 hover:scale-105">
                  <div className="space-y-3 text-center">
                    <h3 className="text-3xl font-bold text-foreground">Pro</h3>
                    <p className="text-muted-foreground text-base">For growing businesses and professional hosts.</p>
                  </div>
                  <div className="my-8">
                    <span className="text-5xl font-bold text-foreground">$49</span>
                    <span className="text-muted-foreground text-xl">/mo</span>
                  </div>
                  <Button
                    size="lg"
                    className="w-full py-3 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-16 md:py-24 lg:py-32 border-t bg-secondary">
          <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground">Get in touch.</h2>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a question or want to learn more? We'd love to hear from you.
              </p>
            </div>
            <div className="mx-auto w-full max-w-md space-y-6">
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-5 py-3 rounded-md border border-input focus:ring-2 focus:ring-primary focus:border-transparent bg-earth-input text-foreground"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3 rounded-md border border-input focus:ring-2 focus:ring-primary focus:border-transparent bg-earth-input text-foreground"
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="px-5 py-3 rounded-md border border-input focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px] bg-earth-input text-foreground"
                ></Textarea>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full px-8 py-4 text-xl bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
              <p className="text-sm text-muted-foreground">
                Sign up to get notified when we launch.
                <Link href="/terms-of-service" className="underline underline-offset-2 ml-1" prefetch={false}>
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t bg-primary text-primary-foreground">
        <p className="text-sm text-primary-foreground/80">&copy; 2024 open-bnb. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-6 sm:gap-8">
          <Link
            href="/terms-of-service"
            className="text-sm hover:underline underline-offset-4 text-primary-foreground/80"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-sm hover:underline underline-offset-4 text-primary-foreground/80"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
