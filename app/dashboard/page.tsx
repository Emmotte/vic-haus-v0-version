import { CreateSiteButton } from "@/components/dashboard/create-site-button"
import { SiteCard } from "@/components/dashboard/site-card"

// This is a Server Component. In a real application, you would fetch
// the user's sites from a database (e.g., Supabase) here.
// This page would also typically be protected by authentication.

interface Site {
  id: string
  name: string
  description: string
  imageUrl: string
}

async function getSites(): Promise<Site[]> {
  // Simulate fetching data from a database
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Cozy Beachfront Villa",
          description: "A beautiful villa right on the beach, perfect for a relaxing getaway.",
          imageUrl: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "2",
          name: "Mountain Retreat Cabin",
          description: "Escape to this serene cabin nestled in the mountains, ideal for nature lovers.",
          imageUrl: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "3",
          name: "Urban Loft in Downtown",
          description: "Stylish loft in the heart of the city, close to all major attractions.",
          imageUrl: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "4",
          name: "Lakeside Family Home",
          description: "Spacious home with stunning lake views, great for family vacations.",
          imageUrl: "/placeholder.svg?height=200&width=300",
        },
      ])
    }, 500) // Simulate network delay
  })
}

export default async function DashboardPage() {
  const sites = await getSites()

  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Websites</h1>
        <CreateSiteButton />
      </div>

      {sites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-gray-500">You haven't created any websites yet.</p>
          <p className="text-md text-gray-500 mt-2">Click the button above to get started!</p>
        </div>
      ) : (
        <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sites.map((site) => (
            <SiteCard key={site.id} {...site} />
          ))}
        </section>
      )}
    </main>
  )
}
