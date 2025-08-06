"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SitePreview from "@/app/site/site-preview"
import { MountainIcon } from "@/components/ui/mountain-icon"
import { createClient } from "@/lib/supabase" // Client-side Supabase
import { saveSiteDetails, signOut } from "./actions" // Server Actions
import { useRouter } from "next/navigation"
import { LogOutIcon } from 'lucide-react'
import { toast } from "@/hooks/use-toast" // Import toast for user feedback
import { Textarea } from "@/components/ui/textarea"

interface Room {
  id: string
  name: string
  description: string
  images: string[]
  display_order: number | null
}

export default function DashboardPage() {
  const [siteName, setSiteName] = useState("Loading...")
  const [siteDescription, setSiteDescription] = useState("Loading...")
  const [rooms, setRooms] = useState<Room[]>([]) // State to hold rooms
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchSiteData = async () => {
      setLoading(true)
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push("/login") // Redirect if no user session
        return
      }

      // Fetch site details
      const { data: siteData, error: fetchSiteError } = await supabase
        .from("sites")
        .select("id, site_name, site_description")
        .eq("user_id", user.id)
        .single()

      let currentSiteId: string | null = null;

      if (fetchSiteError && fetchSiteError.code !== "PGRST116") {
        console.error("Error fetching site data:", fetchSiteError)
        toast({
          title: "Error!",
          description: "Failed to load site data.",
          variant: "destructive",
        })
      } else if (siteData) {
        setSiteName(siteData.site_name || "")
        setSiteDescription(siteData.site_description || "")
        currentSiteId = siteData.id;
      } else {
        // If no site data, set defaults for a new user and create a new site
        setSiteName("My Awesome Rental")
        setSiteDescription("A beautiful place to stay!")
        // In a real app, you'd create the site here or on first save
      }

      // Fetch rooms if a site ID is available
      if (currentSiteId) {
        const { data: roomsData, error: fetchRoomsError } = await supabase
          .from("rooms")
          .select("id, name, description, images, display_order")
          .eq("site_id", currentSiteId)
          .order("display_order", { ascending: true });

        if (fetchRoomsError) {
          console.error("Error fetching rooms:", fetchRoomsError);
          toast({
            title: "Error!",
            description: "Failed to load room data.",
            variant: "destructive",
          });
        } else if (roomsData) {
          setRooms(roomsData);
        }
      }
      setLoading(false)
    }

    fetchSiteData()
  }, [router, supabase])

  const handleSaveChanges = async () => {
    const result = await saveSiteDetails(siteName, siteDescription)
    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
        variant: "default",
      })
    } else {
      toast({
        title: "Error!",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-earthy-50">
        <p className="text-earthy-950">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-earthy-50">
      <div className="hidden border-r bg-earthy-900 text-earthy-50 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b border-earthy-700 px-6">
            <a href="/" className="flex items-center gap-2 font-semibold text-earthy-50">
              <MountainIcon className="h-6 w-6 text-forest-400" />
              <span>open-bnb</span>
            </a>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-earthy-700 px-3 py-2 text-earthy-50 transition-all hover:text-earthy-50 hover:bg-earthy-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Settings
              </a>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-earthy-50 transition-all hover:text-earthy-50 hover:bg-earthy-600 justify-start"
              >
                <LogOutIcon className="h-4 w-4" />
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-16 lg:h-[70px] items-center gap-4 border-b bg-earthy-100 px-6 shadow-sm">
          <a href="#" className="lg:hidden text-earthy-900 hover:text-earthy-950">
            <MountainIcon className="h-7 w-7" />
            <span className="sr-only">Home</span>
          </a>
          <div className="w-full flex-1">
            <h1 className="text-xl font-semibold text-earthy-950">Site Settings</h1>
          </div>
          <Button
            onClick={handleSaveChanges}
            className="px-6 py-2 text-base font-medium bg-forest-600 text-earthy-50 hover:bg-forest-700"
          >
            Save Changes
          </Button>
        </header>
        <main className="flex-1 flex flex-col gap-6 p-6 md:gap-10 md:p-10 bg-earthy-50">
          <Card className="shadow-md rounded-lg bg-white text-earthy-950">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-earthy-950">Site Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="site-name" className="text-base font-medium text-earthy-900">
                  Site Name
                </Label>
                <Input
                  id="site-name"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="px-4 py-2 rounded-md border border-earthy-300 focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-earthy-100 text-earthy-900"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-description" className="text-base font-medium text-earthy-900">
                  Site Description
                </Label>
                <Textarea
                  id="site-description"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  className="px-4 py-2 rounded-md border border-earthy-300 focus:ring-2 focus:ring-forest-500 focus:border-transparent min-h-[100px] bg-earthy-100 text-earthy-900"
                />
              </div>
            </CardContent>
          </Card>
          <div>
            <h2 className="text-2xl font-bold text-earthy-950 mb-4">Live Site Preview</h2>
            <SitePreview siteName={siteName} siteDescription={siteDescription} rooms={rooms} />
          </div>
        </main>
      </div>
    </div>
  )
}
