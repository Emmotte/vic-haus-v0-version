"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MountainIcon } from "@/components/ui/mountain-icon"
import { createClient } from "@/lib/supabase" // Client-side Supabase
import { createSite, deleteSite } from "./actions" // Server Actions
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
  SidebarInput,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronUp, Settings, User2, Search, LayoutDashboard, Globe } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar-provider"

// Menu items.
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Sites",
    url: "/dashboard/sites", // Example sub-page
    icon: Globe,
  },
  {
    title: "Settings",
    url: "/dashboard/settings", // Example sub-page
    icon: Settings,
  },
]

function AppSidebar({ sites }: { sites: { id: string; name: string; description: string }[] }) {
  const { state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center justify-center p-2" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold text-foreground">open-bnb</span>
        </Link>
        <SidebarInput id="search" placeholder="Search..." className="pl-8 bg-earth-input text-foreground" />
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 select-none opacity-50 text-muted-foreground" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="w-full flex items-center justify-between">
                Projects
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sites.length > 0 ? (
                    sites.map((site) => (
                      <SidebarMenuItem key={site.id}>
                        <SidebarMenuButton asChild>
                          <Link href={`/_sites/${site.id}`}>
                            <Globe />
                            <span>{site.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <SidebarMenuItem>
                      <span className="text-muted-foreground text-sm px-2">No sites yet.</span>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Guest
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width] bg-card text-card-foreground">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <form action="/auth/signout" method="post" className="w-full">
                    <Button type="submit" variant="ghost" className="w-full justify-start p-0 h-auto">
                      Sign out
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  const { data: sites, error } = await supabase.from("sites").select("*").eq("user_id", user.id)

  if (error) {
    console.error("Error fetching sites:", error)
  }

  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar sites={sites || []} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-background">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-card text-card-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sites?.length || 0}</div>
                <p className="text-xs text-muted-foreground">Your current number of active sites.</p>
              </CardContent>
            </Card>
            {/* Add more dashboard cards here if needed */}
          </div>
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle>Create New Site</CardTitle>
              <CardDescription>Fill out the form below to create a new vacation rental site.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createSite} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Site Name</Label>
                  <Input id="name" name="name" placeholder="My Awesome Rental" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="A beautiful beachfront villa." required />
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Create Site
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle>Your Sites</CardTitle>
              <CardDescription>Manage your existing vacation rental sites.</CardDescription>
            </CardHeader>
            <CardContent>
              {sites && sites.length > 0 ? (
                <div className="grid gap-4">
                  {sites.map((site) => (
                    <div
                      key={site.id}
                      className="flex items-center justify-between rounded-md border p-4 bg-secondary text-secondary-foreground"
                    >
                      <div>
                        <h3 className="font-semibold">{site.name}</h3>
                        <p className="text-sm text-muted-foreground">{site.description}</p>
                        <Link
                          href={`/_sites/${site.id}`}
                          className="text-sm text-primary hover:underline"
                          prefetch={false}
                        >
                          View Site
                        </Link>
                      </div>
                      <form action={deleteSite}>
                        <input type="hidden" name="id" value={site.id} />
                        <Button variant="destructive" size="sm" type="submit">
                          Delete
                        </Button>
                      </form>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">You haven't created any sites yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
