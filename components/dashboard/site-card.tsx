import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { PencilIcon, EyeIcon } from 'lucide-react'

interface SiteCardProps {
  id: string
  name: string
  description: string
  imageUrl: string
}

export function SiteCard({ id, name, description, imageUrl }: SiteCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={`Image for ${name}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          priority
        />
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2 p-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/sites/${id}/edit`}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/sites/${id}`} target="_blank" rel="noopener noreferrer">
            <EyeIcon className="mr-2 h-4 w-4" />
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
