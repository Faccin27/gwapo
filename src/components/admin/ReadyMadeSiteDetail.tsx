"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, ChevronLeft, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample ready-made sites data
const sampleSites = [
  {
    id: "1",
    title: "Professional Portfolio",
    description: "Showcase your work with this elegant portfolio template.",
    images: ["/images/nakai.png", "/images/nakai2.png"],
    price: "R$ 299",
    features: ["Project Gallery", "About Section", "Contact Form", "Blog Integration", "Social Media Links"],
  },
  {
    id: "2",
    title: "Business Website",
    description: "A complete solution for small to medium businesses looking to establish an online presence.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    price: "R$ 499",
    features: [
      "Service Showcase",
      "Team Profiles",
      "Testimonials",
      "Contact Page",
      "Google Maps Integration",
      "Newsletter Signup",
    ],
  },
  {
    id: "3",
    title: "E-commerce Store",
    description: "Start selling online with this comprehensive e-commerce template.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    price: "R$ 799",
    features: [
      "Product Catalog",
      "Shopping Cart",
      "Secure Checkout",
      "Customer Accounts",
      "Order Tracking",
      "Inventory Management",
      "Payment Gateway Integration",
    ],
  },
  {
    id: "4",
    title: "Personal Blog",
    description: "Share your thoughts and stories with this clean and minimalist blog template.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    price: "R$ 199",
    features: [
      "Responsive Design",
      "Category Organization",
      "Search Functionality",
      "Comment System",
      "Social Sharing",
      "SEO Optimized",
    ],
  },
]

interface ReadyMadeSiteDetailProps {
  siteId: string
}

export default function ReadyMadeSiteDetail({ siteId }: ReadyMadeSiteDetailProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const site = sampleSites.find((s) => s.id === siteId)

  const handleDelete = () => {
    console.log("Deleting site:", siteId)
    // AQUI PRECISA ENVIAR PRO BACK
    setDeleteDialogOpen(false)
    router.push("/admin/ready-made-sites")
  }

  if (!site) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Template Not Found</h1>
        <p className="text-muted-foreground mb-6">The template you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/admin/ready-made-sites">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/ready-made-sites">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{site.title}</h1>
            <Badge variant="secondary" className="ml-2">
              {site.price}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/ready-made-sites/edit/${site.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="w-full">
          <Carousel className="w-full">
            <CarouselContent>
              {site.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${site.title} - Image ${index + 1}`}
                        className="aspect-video w-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Template Overview</h2>
              <p className="text-muted-foreground">{site.description}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {site.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-gwapo mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gwapo">{site.price}</div>
                <p className="text-sm text-muted-foreground mt-2">One-time payment for a complete website solution.</p>
                <Button className="w-full mt-4 bg-gwapo hover:bg-gwapo/90">Purchase Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gwapo mr-2" />
                    <span className="text-sm">Responsive Design</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gwapo mr-2" />
                    <span className="text-sm">SEO Optimization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gwapo mr-2" />
                    <span className="text-sm">6 Months Support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gwapo mr-2" />
                    <span className="text-sm">Documentation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gwapo mr-2" />
                    <span className="text-sm">Free Updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the template and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
