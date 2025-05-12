"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, X, Plus, Trash2, Upload, AlertCircle } from "lucide-react";

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

const siteFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

type SiteFormValues = z.infer<typeof siteFormSchema>;

const sampleSites = [
  {
    id: "1",
    title: "Professional Portfolio",
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
];

interface ReadyMadeSiteFormProps {
  siteId?: string;
  isEditing?: boolean;
}

export default function ReadyMadeSiteForm({
  siteId,
  isEditing = false,
}: ReadyMadeSiteFormProps) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);

  const form = useForm<SiteFormValues>({
    resolver: zodResolver(siteFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      features: [],
      images: [],
    },
  });

  useEffect(() => {
    if (isEditing && siteId) {
      const site = sampleSites.find((s) => s.id === siteId);
      if (site) {
        form.reset({
          title: site.title,
          description: site.description,
          price: site.price,
          features: site.features,
          images: site.images,
        });
      } else {
        setError("Template not found");
      }
    }
  }, [isEditing, siteId, form]);

  const onSubmit = (values: SiteFormValues) => {
    try {
      console.log(values);
      // AQUI PRECISA ENVIAR PRO BACK
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/ready-made-sites");
        }, 1500);
      }, 1000);
    } catch (err) {
      setError("Failed to save template. Please try again.");
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      const currentFeatures = form.getValues("features") || [];
      if (!currentFeatures.includes(newFeature)) {
        form.setValue("features", [...currentFeatures, newFeature]);
        setNewFeature("");
      }
    }
  };

  const handleRemoveFeature = (feature: string) => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue(
      "features",
      currentFeatures.filter((f) => f !== feature)
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
            {isEditing ? "Edit Template" : "New Template"}
          </h1>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/ready-made-sites")}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              className="bg-gwapo hover:bg-gwapo/90"
              onClick={form.handleSubmit(onSubmit)}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </div>
        </div>

        {success && (
          <Alert className="bg-green-500/20 text-green-500 border-green-500/50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your template has been {isEditing ? "updated" : "created"}{" "}
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
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Template Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter template title"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              A clear, concise title for your template.
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief overview of the template"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              A brief summary of what the template offers
                              (100-200 characters recommended).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input placeholder="R$ 299" {...field} />
                            </FormControl>
                            <FormDescription>
                              The price of the template (e.g., R$ 299).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="new-feature">Add Features</Label>
                        <div className="flex mt-1.5 gap-2">
                          <Input
                            id="new-feature"
                            placeholder="e.g., Responsive Design, Contact Form"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                          />
                          <Button
                            type="button"
                            onClick={handleAddFeature}
                            className="bg-gwapo hover:bg-gwapo/90"
                          >
                            <Plus className="h-4 w-4" />
                            Add
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5">
                          Add all features included in this template.
                        </p>
                      </div>

                      <div>
                        <Label>Current Features</Label>
                        <div className="mt-2 flex flex-col gap-2">
                          {form.watch("features")?.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-secondary text-secondary-foreground px-3 py-2 rounded-md text-sm"
                            >
                              <span>{feature}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                onClick={() => handleRemoveFeature(feature)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          ))}
                          {form.watch("features")?.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                              No features added yet.
                            </p>
                          )}
                        </div>
                        {form.formState.errors.features && (
                          <p className="text-sm font-medium text-destructive mt-2">
                            {form.formState.errors.features.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Images Tab */}
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
                            <Plus className="h-4 w-4" />
                            Add URL
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5">
                          Add images from external URLs.
                        </p>
                      </div>

                      <div>
                        <Label>Template Images</Label>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {form.watch("images")?.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Template image ${index + 1}`}
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
            </Tabs>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/ready-made-sites")}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit" className="bg-gwapo hover:bg-gwapo/90">
                <Save className="mr-2 h-4 w-4" />
                Save Template
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
