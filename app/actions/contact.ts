"use server"

import { revalidatePath } from "next/cache"

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Simulate sending an email or saving to a database
  // In a real application, you would integrate with an email service (e.g., Resend, SendGrid)
  // or save the data to your Supabase database.
  console.log("Contact Form Submission Received:")
  console.log(`Name: ${name}`)
  console.log(`Email: ${email}`)
  console.log(`Message: ${message}`)

  // Simulate a delay for network request
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demonstration, we'll always return success.
  // In a real app, you'd check for errors from your email service/database.
  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all fields." }
  }

  revalidatePath("/") // Revalidate the home page if needed
  return { success: true, message: "Your message has been sent successfully!" }
}
