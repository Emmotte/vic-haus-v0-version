import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase"
import SitePreview from "@/app/site/site-preview" // Renamed from SitePreview to HouseListingPage

interface Room {
  id: string
  name: string
  description: string
  images: string[]
  display_order: number | null
}

export default async function HouseListingPage({ params }: { params: { siteId: string } }) {
  const supabase = createServerClient()
  const siteId = params.siteId

  // Fetch site details
  const { data: siteData, error: siteError } = await supabase
    .from("sites")
    .select("site_name, site_description")
    .eq("id", siteId)
    .single()

  if (siteError || !siteData) {
    console.error("Error fetching site:", siteError)
    notFound() // Or render a custom error page
  }

  // Fetch rooms for the site
  const { data: roomsData, error: roomsError } = await supabase
    .from("rooms")
    .select("id, name, description, images, display_order")
    .eq("site_id", siteId)
    .order("display_order", { ascending: true })

  if (roomsError) {
    console.error("Error fetching rooms:", roomsError)
    // Continue with empty rooms if there's an error fetching them
  }

  const rooms: Room[] = roomsData || []

  return (
    <SitePreview
      siteName={siteData.site_name || "My Awesome Rental"}
      siteDescription={siteData.site_description || "A beautiful place to stay!"}
      rooms={rooms}
    />
  )
}
