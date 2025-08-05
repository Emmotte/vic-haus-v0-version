"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase" // Import the client-side Supabase client

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ChromeIcon } from "lucide-react" // Using ChromeIcon as a generic Google icon

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient() // Initialize client-side Supabase client

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous errors
    setMessage(null) // Clear previous messages

    if (password !== confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`, // Redirect after email confirmation
      },
    })

    if (error) {
      setError(error.message)
      console.error("Signup error:", error.message)
    } else {
      setMessage("Please check your email to confirm your account.")
      // Optionally redirect after a short delay or show a success message
      // router.push("/login?message=Check your email for verification")
    }
  }

  const handleGoogleSignup = async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      console.error("Google signup error:", error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <Card className="mx-auto max-w-sm p-6 shadow-lg rounded-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">Sign Up</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSignup} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-base font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-base font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password" className="text-base font-medium text-gray-700">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {message && <p className="text-green-600 text-sm text-center">{message}</p>}
            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Sign Up
            </Button>
          </form>
          <Button
            variant="outline"
            onClick={handleGoogleSignup}
            className="w-full py-3 text-lg font-semibold border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md transition-colors bg-transparent"
          >
            <ChromeIcon className="mr-2 h-5 w-5" /> Sign Up with Google
          </Button>
          <div className="mt-8 text-center text-base text-gray-700">
            Already have an account?
            <Link href="/login" className="underline text-blue-600 hover:text-blue-700" prefetch={false}>
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
