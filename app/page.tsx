"use client"
import Link from "next/link"
import { useActionState } from "react"
import { CheckCircleIcon, XCircleIcon, Sparkles, Layout, ImageIcon, Mail, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MountainIcon } from "@/components/ui/mountain-icon"
import { submitContactForm } from "@/app/actions/contact" // Import the server action

export default function Component() {
  const [contactState, contactAction] = useActionState(submitContactForm, null)

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-earthy-900 text-earthy-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-forest-400" />
          <span className="sr-only">open-bnb</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Pricing
          </Link>
          <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Link href="/signup" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-b bg-earthy-50 text-earthy-950">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Create Stunning House Listing Websites with open-bnb
                </h1>
                <p className="mx-auto max-w-[700px] text-earthy-700 md:text-xl">
                  Effortlessly build beautiful, responsive websites for your rental properties.
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    href="/signup"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-earthy-700 px-4 py-2 text-sm font-medium text-earthy-50 shadow transition-colors hover:bg-earthy-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-earthy-950 disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Start Building for Free
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-earthy-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-earthy-100 hover:text-earthy-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-earthy-950 disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                {/* Placeholder for a builder-specific hero image */}
                <img
                  src="/placeholder.svg?height=550&width=550"
                  width="550"
                  height="550"
                  alt="open-bnb Website Builder Interface"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square animate-float"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-earthy-100 text-earthy-950">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-earthy-200 px-3 py-1 text-sm text-earthy-800">
                  Powerful Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Showcase Your Property</h2>
                <p className="max-w-[900px] text-earthy-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From stunning photo galleries to integrated contact forms, open-bnb has you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <Sparkles className="h-6 w-6 text-forest-600 mb-2" />
                <h3 className="text-lg font-bold">Intuitive Drag & Drop Builder</h3>
                <p className="text-sm text-earthy-700">Design your site with ease, no coding required.</p>
              </div>
              <div className="grid gap-1">
                <ImageIcon className="h-6 w-6 text-forest-600 mb-2" />
                <h3 className="text-lg font-bold">Stunning Photo Galleries</h3>
                <p className="text-sm text-earthy-700">Showcase every detail of your property with high-quality images.</p>
              </div>
              <div className="grid gap-1">
                <Layout className="h-6 w-6 text-forest-600 mb-2" />
                <h3 className="text-lg font-bold">Responsive & Mobile-Ready</h3>
                <p className="text-sm text-earthy-700">Your site will look great on any device, automatically.</p>
              </div>
              <div className="grid gap-1">
                <Mail className="h-6 w-6 text-forest-600 mb-2" />
                <h3 className="text-lg font-bold">Integrated Contact Forms</h3>
                <p className="text-sm text-earthy-700">Allow potential renters to easily get in touch with you.</p>
              </div>
              <div className="grid gap-1">
                <Phone className="h-6 w-6 text-forest-600 mb-2" />
                <h3 className="text-lg font-bold">Direct Booking Links</h3>
                <p className="text-sm text-earthy-700">Connect to your preferred booking platform seamlessly.</p>
              </div>
              <div className="grid gap-1">
                <Sparkles className="h-6 w-6 text-forest-600 mb-2" />
                <h3 className="text-lg font-bold">SEO Friendly</h3>
                <p className="text-sm text-earthy-700">Get found easily on search engines with optimized pages.</p>
              </div>
            </div>
            <div className="flex justify-center flex-col sm:flex-row items-center gap-2">
              <Link
                href="/signup"
                className="inline-flex h-9 items-center justify-center rounded-md bg-earthy-700 px-4 py-2 text-sm font-medium text-earthy-50 shadow transition-colors hover:bg-earthy-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-earthy-950 disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Sign Up for Free
              </Link>
              <Link
                href="#contact"
                className="inline-flex h-9 items-center justify-center rounded-md border border-earthy-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-earthy-100 hover:text-earthy-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-earthy-950 disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-earthy-900 text-earthy-50">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple & Transparent Pricing</h2>
              <p className="mx-auto max-w-[600px] text-earthy-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for you. No hidden fees, no surprises.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <Card className="bg-earthy-800 text-earthy-50 border-earthy-700">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <p className="text-4xl font-extrabold mb-4">$0<span className="text-lg font-normal">/month</span></p>
                  <ul className="text-sm text-earthy-300 space-y-2 mb-6">
                    <li>1 Website</li>
                    <li>Basic Features</li>
                    <li>open-bnb branding</li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full bg-forest-600 hover:bg-forest-700 text-earthy-50 border-forest-600 hover:border-forest-700"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-earthy-800 text-earthy-50 border-earthy-700">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <p className="text-4xl font-extrabold mb-4">$19<span className="text-lg font-normal">/month</span></p>
                  <ul className="text-sm text-earthy-300 space-y-2 mb-6">
                    <li>Unlimited Websites</li>
                    <li>Advanced Features</li>
                    <li>Custom Domain</li>
                    <li>No open-bnb branding</li>
                  </ul>
                  <Button
                    variant="default"
                    className="w-full bg-forest-600 hover:bg-forest-700 text-earthy-50"
                  >
                    Choose Pro
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-earthy-800 text-earthy-50 border-earthy-700">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-4xl font-extrabold mb-4">Custom</p>
                  <ul className="text-sm text-earthy-300 space-y-2 mb-6">
                    <li>Dedicated Support</li>
                    <li>Custom Integrations</li>
                    <li>Volume Discounts</li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full bg-forest-600 hover:bg-forest-700 text-earthy-50 border-forest-600 hover:border-forest-700"
                  >
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-earthy-50 text-earthy-950">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">About open-bnb</h2>
              <p className="mx-auto max-w-[600px] text-earthy-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We believe every property deserves a beautiful online presence.
              </p>
            </div>
            <div className="mx-auto w-full max-w-3xl space-y-6 text-left">
              <p className="text-lg text-earthy-800 leading-relaxed">
                open-bnb was founded with a simple mission: to empower property owners and managers to create stunning, professional websites for their listings without the need for complex coding or expensive designers. We understand the unique challenges of showcasing rental properties online, and we've built a platform that addresses those needs directly.
              </p>
              <p className="text-lg text-earthy-800 leading-relaxed">
                Our team is passionate about design, technology, and making beautiful tools accessible to everyone. We're constantly working to improve open-bnb, adding new features and refining the user experience to ensure you have the best possible platform to highlight your properties and attract more guests.
              </p>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-earthy-200 text-earthy-950">
          <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:grid-cols-2 lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch with open-bnb</h2>
              <p className="max-w-[600px] text-earthy-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions about open-bnb, our features, or need support? Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <Card className="w-full max-w-md mx-auto bg-white text-earthy-950 border-earthy-300 shadow-lg">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Send us a message about open-bnb.</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={contactAction} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-earthy-50 border-earthy-300"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@example.com"
                      required
                      className="bg-earthy-50 border-earthy-300"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      required
                      className="min-h-[100px] bg-earthy-50 border-earthy-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-3 text-lg font-semibold bg-forest-600 hover:bg-forest-700 text-white rounded-md transition-colors"
                  >
                    Send Message
                  </Button>
                  {contactState && (
                    <div
                      className={`mt-4 flex items-center justify-center gap-2 text-sm ${
                        contactState.success ? "text-forest-600" : "text-destructive-foreground"
                      }`}
                    >
                      {contactState.success ? (
                        <CheckCircleIcon className="h-5 w-5" />
                      ) : (
                        <XCircleIcon className="h-5 w-5" />
                      )}
                      {contactState.message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-earthy-900 text-earthy-50">
        <p className="text-xs text-earthy-300">&copy; 2024 open-bnb. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/terms-of-service"
            className="text-xs hover:underline underline-offset-4 text-earthy-300"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4 text-earthy-300" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
