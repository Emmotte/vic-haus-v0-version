"use server"

import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveSiteDetails(siteName: string, siteDescription: string) {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login") // Redirect if not authenticated
  }

  // Try to fetch existing site data for the user
  const { data: existingSite, error: fetchError } = await supabase
    .from("sites")
    .select("id")
    .eq("user_id", user.id)
    .single()

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 means "no rows found"
    console.error("Error fetching existing site:", fetchError)
    return { success: false, message: "Error fetching site data." }
  }

  if (existingSite) {
    // Update existing site
    const { error } = await supabase
      .from("sites")
      .update({ site_name: siteName, site_description: siteDescription, updated_at: new Date().toISOString() })
      .eq("id", existingSite.id)

    if (error) {
      console.error("Error updating site:", error)
      return { success: false, message: "Failed to update site details." }
    }
  } else {
    // Insert new site
    const { error } = await supabase
      .from("sites")
      .insert({ user_id: user.id, site_name: siteName, site_description: siteDescription })

    if (error) {
      console.error("Error inserting site:", error)
      return { success: false, message: "Failed to save site details." }
    }
  }

  revalidatePath("/dashboard") // Revalidate the dashboard page to show updated data
  // Note: Revalidating dynamic site pages like /_sites/[site] is complex without knowing the exact slug.
  // For a real application, you'd likely have a slug column and revalidate that specific path.
  // For now, changes to site name/description will only reflect on the dashboard preview.
  return { success: true, message: "Site details saved successfully!" }
}

export async function signOut() {
  const supabase = createServerClient()
  await supabase.auth.signOut()
  redirect("/login")
}
