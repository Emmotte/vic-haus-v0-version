import { notFound } from "next/navigation"
import SitePreview from "@/app/site/site-preview"
import { createServerClient } from "@/lib/supabase" // Server-side Supabase client

export default async function SitePage({ params }: { params: { site: string } }) {
  if (!params.site) {
    notFound()
  }

  const supabase = createServerClient()

  // Convert the URL slug (e.g., "nook-on-cook") back to a potential site name (e.g., "Nook on Cook")
  // This is a simplified approach. For a robust solution, consider adding a 'slug' column to your 'sites' table.
  const siteNameFromSlug = decodeURIComponent(params.site)
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const { data: siteData, error } = await supabase
    .from("sites")
    .select("site_name, site_description")
    .eq("site_name", siteNameFromSlug) // Attempt to match by the converted site name
    .single()

  if (error || !siteData) {
    console.error("Error fetching site data for preview:", error)
    notFound() // Site not found
  }

  return <SitePreview siteName={siteData.site_name} siteDescription={siteData.site_description || ""} />
}
