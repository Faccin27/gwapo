"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, ExternalLink, Github, ChevronLeft, AlertCircle } from "lucide-react"
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

const sampleProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "A comprehensive e-commerce solution built for a fashion retailer. This platform includes product catalog management, shopping cart functionality, secure payment processing, and an intuitive admin dashboard for inventory management.",
    longDescription:
      "This e-commerce platform was designed to provide a seamless shopping experience for customers while giving the business owner powerful tools to manage their online store. The frontend delivers a responsive, fast-loading interface with advanced filtering and search capabilities. The backend includes robust inventory management, order processing, and customer relationship management tools.\n\nOne of the key challenges was implementing a real-time inventory system that could handle high traffic during sales events without compromising performance. We solved this by implementing a caching layer and optimizing database queries for maximum efficiency.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Stripe API", "AWS S3"],
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/example/ecommerce-platform",
    images: [
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1491897554428-130a60dd4757?auto=format&fit=crop&q=80",
    ],
  },
]

interface ProjectDetailProps {
  projectId: string
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const project = sampleProjects.find((p) => p.id === projectId)

  const handleDelete = () => {
    console.log("Deleting project:", projectId)
    // AQUI PRECISA ENVIAR PRO BACK
    setDeleteDialogOpen(false)
    router.push("/admin/projects")
  }

  const formattedDescription = project?.longDescription.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-4">
      {paragraph}
    </p>
  ))

  if (!project) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/admin/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
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
              <Link href="/admin/projects">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
            <Badge variant="outline" className="ml-2">
              {project.category}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/projects/edit/${project.id}`}>
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

        {/* Image carousel */}
        <div className="w-full">
          <Carousel className="w-full">
            <CarouselContent>
              {project.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Image ${index + 1}`}
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
              <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-4">Detailed Description</h2>
              <div className="text-muted-foreground">{formattedDescription}</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">Project Links</h3>
              <div className="space-y-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gwapo hover:underline"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Project
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gwapo hover:underline"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">Project ID</h3>
              <p className="text-sm text-muted-foreground font-mono">{project.id}</p>
            </div>
          </div>
        </div>
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project and all associated data.
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
