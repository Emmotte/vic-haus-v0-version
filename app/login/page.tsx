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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient() // Initialize client-side Supabase client

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous errors

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      console.error("Login error:", error.message)
    } else {
      router.push("/dashboard") // Redirect to dashboard on successful login
      router.refresh() // Refresh the page to update session
    }
  }

  const handleGoogleLogin = async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      console.error("Google login error:", error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <Card className="mx-auto max-w-sm p-6 shadow-lg rounded-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="grid gap-6">
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
              <div className="flex items-center">
                <Label htmlFor="password" className="text-base font-medium text-gray-700">
                  Password
                </Label>
                <Link href="#" className="ml-auto inline-block text-sm text-blue-600 hover:underline" prefetch={false}>
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Login
            </Button>
          </form>
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full py-3 text-lg font-semibold border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md transition-colors bg-transparent"
          >
            <ChromeIcon className="mr-2 h-5 w-5" /> Login with Google
          </Button>
          <div className="mt-8 text-center text-base text-gray-700">
            Don&apos;t have an account?
            <Link href="/signup" className="underline text-blue-600 hover:text-blue-700" prefetch={false}>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
