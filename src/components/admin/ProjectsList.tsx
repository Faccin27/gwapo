"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Trash2, Plus, Search, FolderKanban, ExternalLink, Github, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample project data
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
  {
    id: "2",
    title: "Healthcare Management System",
    category: "Web Application",
    description:
      "A comprehensive healthcare management system for a medical clinic. Features include patient records management, appointment scheduling, billing integration, and staff management.",
    longDescription:
      "This healthcare management system was built to streamline operations for a busy medical clinic. The system integrates various aspects of clinic management including patient records, appointment scheduling, billing, and staff management into a single, cohesive platform.\n\nThe application features role-based access control, ensuring that different staff members have appropriate access levels. The appointment system includes automated reminders and integrates with the clinic's existing calendar systems. Patient records are securely stored and easily accessible to authorized personnel, with comprehensive audit logging for all access and changes.",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "AWS", "Twilio API"],
    liveUrl: "https://healthcare-system-demo.com",
    githubUrl: "https://github.com/example/healthcare-system",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "3",
    title: "Financial Dashboard",
    category: "Data Visualization",
    description:
      "An interactive financial dashboard for investment analysis. Provides real-time data visualization, portfolio tracking, and performance analytics for investors.",
    longDescription:
      "This financial dashboard was designed to help investors track and analyze their investment portfolios in real-time. The dashboard pulls data from multiple financial APIs to provide up-to-date information on stocks, bonds, cryptocurrencies, and other investment vehicles.\n\nThe interface features interactive charts and graphs that allow users to visualize their portfolio performance over time, compare against market benchmarks, and identify trends. Advanced filtering options enable users to drill down into specific aspects of their investments, while customizable alerts notify them of significant market movements or portfolio changes.",
    technologies: ["Vue.js", "D3.js", "Python", "Flask", "Redis", "PostgreSQL", "Docker"],
    liveUrl: "https://finance-dashboard-demo.com",
    githubUrl: "https://github.com/example/finance-dashboard",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80",
    ],
  },
]

export default function ProjectsList() {
  const [projects, setProjects] = useState(sampleProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
    return matchesSearch && matchesCategory
  })
  const categories = ["all", ...Array.from(new Set(projects.map((project) => project.category)))]

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // AQUI PRECISA ENVIAR PRO BACK
    if (projectToDelete) {
      setProjects(projects.filter((project) => project.id !== projectToDelete))
      setDeleteDialogOpen(false)
      setProjectToDelete(null)
    }
  }

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <Link href="/admin/projects/new">
            <Button className="bg-gwapo hover:bg-gwapo/90">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              type="search"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline" className="mt-1">
                        {project.category}
                      </Badge>
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/admin/projects/edit/${project.id}`}>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteClick(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-3 text-sm text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-gwapo"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-gwapo"
                    >
                      <Github className="mr-1 h-3 w-3" />
                      Code
                    </a>
                  )}
                </div>
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center text-sm text-gwapo hover:underline"
                >
                  View Details
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <FolderKanban className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchTerm || categoryFilter !== "all"
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Get started by creating a new project."}
            </p>
            {!searchTerm && categoryFilter === "all" && (
              <Link href="/admin/projects/new">
                <Button className="mt-4 bg-gwapo hover:bg-gwapo/90">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </Link>
            )}
          </div>
        )}
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
              onClick={confirmDelete}
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
