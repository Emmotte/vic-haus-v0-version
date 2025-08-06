"use server"

import { Resend } from "resend"
import { revalidatePath } from "next/cache"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all fields." }
  }

  try {
    // In a real application, you might send to a specific recipient
    // For this example, we'll send to a placeholder email.
    // Ensure the 'from' domain is verified in your Resend account.
    await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified domain/email
      to: "delivered@resend.dev", // Replace with your actual recipient email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    revalidatePath("/") // Revalidate the home page if needed
    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send message. Please try again later." }
  }
}
