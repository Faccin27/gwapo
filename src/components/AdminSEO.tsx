"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Save, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"

const seoFormSchema = z.object({
  siteTitle: z.string().min(1, "Site title is required"),
  metaDescription: z
    .string()
    .min(10, "Meta description should be at least 10 characters")
    .max(160, "Meta description should not exceed 160 characters"),
  metaKeywords: z.string(),
  ogTitle: z.string(),
  ogDescription: z.string(),
  ogImage: z.string().url().optional().or(z.literal("")),
  twitterCard: z.string(),
  twitterTitle: z.string(),
  twitterDescription: z.string(),
  twitterImage: z.string().url().optional().or(z.literal("")),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
  robotsTxt: z.string(),
  structuredData: z.string(),
  enableIndexing: z.boolean(),
})

type SeoFormValues = z.infer<typeof seoFormSchema>

const contactFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  phone: z.string(),
  email: z.string().email("Invalid email address"),
  contactFormEmail: z.string().email("Invalid email address"),
  workingHours: z.string(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const socialMediaFormSchema = z.object({
  facebook: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  displayInFooter: z.boolean(),
  displayInHeader: z.boolean(),
})

type SocialMediaFormValues = z.infer<typeof socialMediaFormSchema>

export default function SEOSettings() {
  const [seoSuccess, setSeoSuccess] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)
  const [socialSuccess, setSocialSuccess] = useState(false)

  const seoForm = useForm<SeoFormValues>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      siteTitle: "GWAPO - Web Design & Development",
      metaDescription:
        "Professional web design and development services. We create beautiful, responsive websites tailored to your business needs.",
      metaKeywords: "web design, web development, responsive, SEO, website, professional",
      ogTitle: "GWAPO - Web Design & Development",
      ogDescription: "Professional web design and development services.",
      ogImage: "https://gwapo.com/images/og-image.jpg",
      twitterCard: "summary_large_image",
      twitterTitle: "GWAPO - Web Design & Development",
      twitterDescription: "Professional web design and development services.",
      twitterImage: "https://gwapo.com/images/twitter-image.jpg",
      canonicalUrl: "https://gwapo.com",
      robotsTxt: "User-agent: *\nAllow: /",
      structuredData: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "GWAPO",
          url: "https://gwapo.com",
          logo: "https://gwapo.com/images/logo.png",
        },
        null,
        2,
      ),
      enableIndexing: true,
    },
  })

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      companyName: "GWAPO Web Solutions",
      address: "123 Web Street",
      city: "São Paulo",
      state: "SP",
      zipCode: "01000-000",
      country: "Brazil",
      phone: "+55 11 1234-5678",
      email: "contact@gwapo.com",
      contactFormEmail: "forms@gwapo.com",
      workingHours: "Monday-Friday: 9am-6pm",
    },
  })

  const socialMediaForm = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      facebook: "https://facebook.com/gwapo",
      twitter: "https://twitter.com/gwapo",
      instagram: "https://instagram.com/gwapo",
      linkedin: "https://linkedin.com/company/gwapo",
      youtube: "https://youtube.com/c/gwapo",
      github: "https://github.com/gwapo",
      displayInFooter: true,
      displayInHeader: false,
    },
  })

  function onSeoSubmit(values: SeoFormValues) {
    console.log(values)
    // AQUI PRECISA ENVIAR PRO BACK
    setTimeout(() => {
      setSeoSuccess(true)
      setTimeout(() => setSeoSuccess(false), 3000)
    }, 1000)
  }

  function onContactSubmit(values: ContactFormValues) {
    console.log(values)
    // AQUI PRECISA ENVIAR PRO BACK
    setTimeout(() => {
      setContactSuccess(true)
      setTimeout(() => setContactSuccess(false), 3000)
    }, 1000)
  }

  function onSocialMediaSubmit(values: SocialMediaFormValues) {
    console.log(values)
    // AQUI PRECISA ENVIAR PRO BACK
    setTimeout(() => {
      setSocialSuccess(true)
      setTimeout(() => setSocialSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">SEO Settings</h1>
        </div>

        <Tabs defaultValue="seo" className="space-y-4">
          <TabsList>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-4">
            {seoSuccess && (
              <Alert className="bg-green-500/20 text-green-500 border-green-500/50">
                <Check className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Your SEO settings have been saved successfully.</AlertDescription>
              </Alert>
            )}

            <Form {...seoForm}>
              <form onSubmit={seoForm.handleSubmit(onSeoSubmit)} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic SEO Settings</CardTitle>
                    <CardDescription>Configure the basic SEO settings for your website.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={seoForm.control}
                      name="siteTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Your site title" {...field} />
                          </FormControl>
                          <FormDescription>This will be displayed in browser tabs and search results.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of your website"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Keep it between 50-160 characters for best results.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="metaKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Keywords</FormLabel>
                          <FormControl>
                            <Input placeholder="keyword1, keyword2, keyword3" {...field} />
                          </FormControl>
                          <FormDescription>Separate keywords with commas.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="canonicalUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Canonical URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourdomain.com" {...field} />
                          </FormControl>
                          <FormDescription>The preferred URL for your website.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="enableIndexing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Search Engine Indexing</FormLabel>
                            <FormDescription>Allow search engines to index your website.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Open Graph Settings</CardTitle>
                    <CardDescription>Configure how your site appears when shared on social media.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={seoForm.control}
                      name="ogTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OG Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title for social sharing" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="ogDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OG Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Description for social sharing" className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="ogImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OG Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourdomain.com/image.jpg" {...field} />
                          </FormControl>
                          <FormDescription>Recommended size: 1200x630 pixels.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Twitter Card Settings</CardTitle>
                    <CardDescription>Configure how your site appears when shared on Twitter.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={seoForm.control}
                      name="twitterCard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Card Type</FormLabel>
                          <FormControl>
                            <Input placeholder="summary_large_image" {...field} />
                          </FormControl>
                          <FormDescription>Common values: summary, summary_large_image</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="twitterTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title for Twitter sharing" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="twitterDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Description for Twitter sharing"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="twitterImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourdomain.com/twitter-image.jpg" {...field} />
                          </FormControl>
                          <FormDescription>Recommended size: 1200x600 pixels.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>Configure advanced SEO settings for your website.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={seoForm.control}
                      name="robotsTxt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Robots.txt Content</FormLabel>
                          <FormControl>
                            <Textarea placeholder="User-agent: *\nAllow: /" className="font-mono h-32" {...field} />
                          </FormControl>
                          <FormDescription>Instructions for search engine crawlers.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="structuredData"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Structured Data (JSON-LD)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='{"@context": "https://schema.org", "@type": "Organization", ...}'
                              className="font-mono h-48"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>JSON-LD format for rich search results.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-gwapo hover:bg-gwapo/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save SEO Settings
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          {/* Contact Information Tab */}
          <TabsContent value="contact" className="space-y-4">
            {contactSuccess && (
              <Alert className="bg-green-500/20 text-green-500 border-green-500/50">
                <Check className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Your contact information has been saved successfully.</AlertDescription>
              </Alert>
            )}

            <Form {...contactForm}>
              <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>Update your company's contact information.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={contactForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={contactForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={contactForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP/Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="ZIP Code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Details</CardTitle>
                    <CardDescription>Update your contact details for customers.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={contactForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                                  <Phone className="h-4 w-4" />
                                </span>
                                <Input className="rounded-l-none" placeholder="+1 (555) 123-4567" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                                  <Mail className="h-4 w-4" />
                                </span>
                                <Input className="rounded-l-none" placeholder="contact@example.com" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={contactForm.control}
                      name="contactFormEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Form Submission Email</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                                <Mail className="h-4 w-4" />
                              </span>
                              <Input className="rounded-l-none" placeholder="forms@example.com" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>Email address where contact form submissions will be sent.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="workingHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Working Hours</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Monday-Friday: 9am-5pm" className="resize-none" {...field} />
                          </FormControl>
                          <FormDescription>Your business hours, displayed on the contact page.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-gwapo hover:bg-gwapo/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Contact Information
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-4">
            {socialSuccess && (
              <Alert className="bg-green-500/20 text-green-500 border-green-500/50">
                <Check className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Your social media settings have been saved successfully.</AlertDescription>
              </Alert>
            )}

            <Form {...socialMediaForm}>
              <form onSubmit={socialMediaForm.handleSubmit(onSocialMediaSubmit)} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Social Media Profiles</CardTitle>
                    <CardDescription>Add your social media profile links.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={socialMediaForm.control}
                        name="facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                                  <Facebook className="h-4 w-4" />
                                </span>
                                <Input
                                  className="rounded-l-none"
                                  placeholder="https://facebook.com/yourpage"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={socialMediaForm.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                                  <Twitter className="h-4 w-4" />
                                </span>
                                <Input
                                  className="rounded-l-none"
                                  placeholder="https://twitter.com/yourhandle"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={socialMediaForm.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                                  <Instagram className="h-4 w-4" />
                                </span>
                                <Input
                                  className="rounded-l-none"
                                  placeholder="https://instagram.com/yourprofile"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={socialMediaForm.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                                  <Linkedin className="h-4 w-4" />
                                </span>
                                <Input
                                  className="rounded-l-none"
                                  placeholder="https://linkedin.com/company/yourcompany"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={socialMediaForm.control}
                        name="youtube"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>YouTube</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                                  <Youtube className="h-4 w-4" />
                                </span>
                                <Input
                                  className="rounded-l-none"
                                  placeholder="https://youtube.com/c/yourchannel"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={socialMediaForm.control}
                        name="github"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GitHub</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                                  <Github className="h-4 w-4" />
                                </span>
                                <Input
                                  className="rounded-l-none"
                                  placeholder="https://github.com/yourorganization"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Display Options</CardTitle>
                    <CardDescription>Configure how social media links are displayed on your site.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={socialMediaForm.control}
                      name="displayInFooter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Display in Footer</FormLabel>
                            <FormDescription>Show social media icons in the website footer.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={socialMediaForm.control}
                      name="displayInHeader"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Display in Header</FormLabel>
                            <FormDescription>Show social media icons in the website header.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-gwapo hover:bg-gwapo/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Social Media Settings
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
