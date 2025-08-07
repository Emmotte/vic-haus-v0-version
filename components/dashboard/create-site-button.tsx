import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon } from 'lucide-react'

export function CreateSiteButton() {
  return (
    <Button asChild className="w-full md:w-auto">
      <Link href="/dashboard/sites/new">
        <PlusIcon className="mr-2 h-4 w-4" />
        Create New Website
      </Link>
    </Button>
  )
}
