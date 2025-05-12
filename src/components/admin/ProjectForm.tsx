"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Save,
  X,
  Plus,
  Trash2,
  Upload,
  LinkIcon,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
  longDescription: z
    .string()
    .min(50, "Long description should be at least 50 characters"),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const sampleProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "A comprehensive e-commerce solution built for a fashion retailer. This platform includes product catalog management, shopping cart functionality, secure payment processing, and an intuitive admin dashboard for inventory management.",
    longDescription:
      "This e-commerce platform was designed to provide a seamless shopping experience for customers while giving the business owner powerful tools to manage their online store. The frontend delivers a responsive, fast-loading interface with advanced filtering and search capabilities. The backend includes robust inventory management, order processing, and customer relationship management tools.\n\nOne of the key challenges was implementing a real-time inventory system that could handle high traffic during sales events without compromising performance. We solved this by implementing a caching layer and optimizing database queries for maximum efficiency.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Stripe API",
      "AWS S3",
    ],
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
];

interface ProjectFormProps {
  projectId?: string;
  isEditing?: boolean;
}

export default function ProjectForm({
  projectId,
  isEditing = false,
}: ProjectFormProps) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTechnology, setNewTechnology] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      longDescription: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
      images: [],
    },
  });

  useEffect(() => {
    if (isEditing && projectId) {
      const project = sampleProjects.find((p) => p.id === projectId);
      if (project) {
        form.reset({
          title: project.title,
          category: project.category,
          description: project.description,
          longDescription: project.longDescription,
          technologies: project.technologies,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
          images: project.images,
        });
      } else {
        setError("Project not found");
      }
    }
  }, [isEditing, projectId, form]);

  const onSubmit = (values: ProjectFormValues) => {
    try {
      console.log(values);
      // AQUI PRECISA ENVIAR PRO BACK
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/projects");
        }, 1500);
      }, 1000);
    } catch (err) {
      setError("Failed to save project. Please try again.");
    }
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim() !== "") {
      const currentTechnologies = form.getValues("technologies") || [];
      if (!currentTechnologies.includes(newTechnology)) {
        form.setValue("technologies", [...currentTechnologies, newTechnology]);
        setNewTechnology("");
      }
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    const currentTechnologies = form.getValues("technologies") || [];
    form.setValue(
      "technologies",
      currentTechnologies.filter((t) => t !== tech)
    );
  };

  const handleAddImageUrl = () => {
    if (newImageUrl.trim() !== "") {
      try {
        new URL(newImageUrl);
        const currentImages = form.getValues("images") || [];
        if (!currentImages.includes(newImageUrl)) {
          form.setValue("images", [...currentImages, newImageUrl]);
          setNewImageUrl("");
        }
      } catch (err) {
        setError("Please enter a valid URL");
      }
    }
  };

  const handleRemoveImage = (image: string) => {
    const currentImages = form.getValues("images") || [];
    form.setValue(
      "images",
      currentImages.filter((img) => img !== image)
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...files]);

      // Create preview URLs for the uploaded files
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setUploadPreviews((prev) => [...prev, ...newPreviews]);
    
      // AQUI PRECISA ENVIAR PRO BACK ou pra STORAGE, e receber o URL pra guardar no formulario.
      const currentImages = form.getValues("images") || [];
      form.setValue("images", [...currentImages, ...newPreviews]);
    }
  };

  const handleRemoveUploadedFile = (index: number) => {
    const newUploadedFiles = [...uploadedFiles];
    const newUploadPreviews = [...uploadPreviews];

    URL.revokeObjectURL(newUploadPreviews[index]);

    newUploadedFiles.splice(index, 1);
    newUploadPreviews.splice(index, 1);

    setUploadedFiles(newUploadedFiles);
    setUploadPreviews(newUploadPreviews);

    const currentImages = form.getValues("images") || [];
    const updatedImages = currentImages.filter(
      (img) => !newUploadPreviews.includes(img)
    );
    form.setValue("images", updatedImages);
  };

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Edit Project" : "New Project"}
          </h1>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/projects")}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              className="bg-gwapo hover:bg-gwapo/90"
              onClick={form.handleSubmit(onSubmit)}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Project
            </Button>
          </div>
        </div>

        {success && (
          <Alert className="bg-green-500/20 text-green-500 border-green-500/50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your project has been {isEditing ? "updated" : "created"}{" "}
              successfully.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="details">Detailed Description</TabsTrigger>
                <TabsTrigger value="tech">Technologies</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="links">Links</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter project title"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              A clear, concise title for your project.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Web Development, Mobile App, UI/UX Design"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              The primary category that best describes your
                              project.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief overview of the project"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              A brief summary of the project (100-200 characters
                              recommended).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <FormField
                      control={form.control}
                      name="longDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a comprehensive description of the project"
                              className="min-h-[300px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            A detailed explanation of the project, including
                            challenges, solutions, and key features. You can use
                            line breaks for paragraphs.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tech" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="new-technology">Add Technologies</Label>
                        <div className="flex mt-1.5 gap-2">
                          <Input
                            id="new-technology"
                            placeholder="e.g., React, Node.js, MongoDB"
                            value={newTechnology}
                            onChange={(e) => setNewTechnology(e.target.value)}
                          />
                          <Button
                            type="button"
                            onClick={handleAddTechnology}
                            className="bg-gwapo hover:bg-gwapo/90"
                          >
                            <Plus className="h-4 w-4" />
                            Add
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5">
                          Add all technologies used in this project.
                        </p>
                      </div>

                      <div>
                        <Label>Current Technologies</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {form.watch("technologies")?.map((tech, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm"
                            >
                              {tech}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 ml-1 text-muted-foreground hover:text-foreground"
                                onClick={() => handleRemoveTechnology(tech)}
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          ))}
                          {form.watch("technologies")?.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                              No technologies added yet.
                            </p>
                          )}
                        </div>
                        {form.formState.errors.technologies && (
                          <p className="text-sm font-medium text-destructive mt-2">
                            {form.formState.errors.technologies.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <Label>Upload Images</Label>
                        <div className="mt-2">
                          <Label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG or WEBP (MAX. 5MB)
                              </p>
                            </div>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleFileUpload}
                            />
                          </Label>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label htmlFor="image-url">Add Image URL</Label>
                        <div className="flex mt-1.5 gap-2">
                          <Input
                            id="image-url"
                            placeholder="https://example.com/image.jpg"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                          />
                          <Button
                            type="button"
                            onClick={handleAddImageUrl}
                            className="bg-gwapo hover:bg-gwapo/90"
                          >
                            <LinkIcon className="h-4 w-4 mr-2" />
                            Add URL
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5">
                          Add images from external URLs.
                        </p>
                      </div>

                      <div>
                        <Label>Project Images</Label>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {form.watch("images")?.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Project image ${index + 1}`}
                                className="w-full h-48 object-cover rounded-md"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveImage(image)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          ))}
                          {form.watch("images")?.length === 0 && (
                            <p className="text-sm text-muted-foreground col-span-full">
                              No images added yet.
                            </p>
                          )}
                        </div>
                        {form.formState.errors.images && (
                          <p className="text-sm font-medium text-destructive mt-2">
                            {form.formState.errors.images.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Links Tab */}
              <TabsContent value="links" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="liveUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Live Project URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              The URL where the live project can be viewed
                              (optional).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="githubUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GitHub Repository URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://github.com/username/repo"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              The URL to the project's GitHub repository
                              (optional).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/projects")}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit" className="bg-gwapo hover:bg-gwapo/90">
                <Save className="mr-2 h-4 w-4" />
                Save Project
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
