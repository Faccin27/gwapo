"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  LayoutTemplate,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Sample ready-made sites data
const sampleSites = [
  {
    id: "1",
    title: "Nakai Sushi",
    description: "Showcase your work with this elegant portfolio template.",
    images: ["/images/nakai.png", "/images/nakai2.png"],
    price: "R$ 299",
    features: [
      "Project Gallery",
      "About Section",
      "Contact Form",
      "Blog Integration",
      "Social Media Links",
    ],
  },
  {
    id: "2",
    title: "Business Website",
    description:
      "A complete solution for small to medium businesses looking to establish an online presence.",
    images: ["/images/blazim.png", "/placeholder.svg?height=400&width=600"],
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
    description:
      "Start selling online with this comprehensive e-commerce template.",
    images: ["/images/mw.png", "/placeholder.svg?height=400&width=600"],
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
    description:
      "Share your thoughts and stories with this clean and minimalist blog template.",
    images: [
      "/images/nakai_mockup.png",
      "/placeholder.svg?height=400&width=600",
    ],
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
];

export default function ReadyMadeSitesList() {
  const [sites, setSites] = useState(sampleSites);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [siteToDelete, setSiteToDelete] = useState<string | null>(null);

  const filteredSites = sites.filter(
    (site) =>
      site.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id: string) => {
    setSiteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // AQUI PRECISA ENVIAR PRO BACK

    if (siteToDelete) {
      setSites(sites.filter((site) => site.id !== siteToDelete));
      setDeleteDialogOpen(false);
      setSiteToDelete(null);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Ready Made Sites
          </h1>
          <Link href="/admin/ready-made-sites/new">
            <Button className="bg-gwapo hover:bg-gwapo/90">
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              type="search"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredSites.map((site) => (
            <Card key={site.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={site.images[0] || "/placeholder.svg"}
                  alt={site.title}
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="line-clamp-1">{site.title}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary" className="mt-1">
                        {site.price}
                      </Badge>
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/admin/ready-made-sites/edit/${site.id}`}>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteClick(site.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {site.description}
                </p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {site.features.slice(0, 3).map((feature, index) => (
                      <li
                        key={index}
                        className="text-xs text-muted-foreground flex items-center"
                      >
                        <Check className="h-3 w-3 mr-2 text-gwapo" />
                        {feature}
                      </li>
                    ))}
                    {site.features.length > 3 && (
                      <li className="text-xs text-muted-foreground">
                        +{site.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link
                  href={`/admin/ready-made-sites/${site.id}`}
                  className="text-sm text-gwapo hover:underline"
                >
                  View Details
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredSites.length === 0 && (
          <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <LayoutTemplate className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No templates found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchTerm
                ? "Try adjusting your search to find what you're looking for."
                : "Get started by creating a new template."}
            </p>
            {!searchTerm && (
              <Link href="/admin/ready-made-sites/new">
                <Button className="mt-4 bg-gwapo hover:bg-gwapo/90">
                  <Plus className="mr-2 h-4 w-4" />
                  New Template
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
              This action cannot be undone. This will permanently delete the
              template and all associated data.
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
  );
}
