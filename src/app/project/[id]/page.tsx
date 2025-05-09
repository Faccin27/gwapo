"use client";

import { useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectGallery from "@/components/ProjectGallery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: "ecommerce-platform",
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
  {
    id: "corporate-brand-identity",
    title: "Corporate Brand Identity",
    category: "Visual Identity",
    description:
      "A complete brand identity redesign for a corporate client in the financial sector. The project included logo design, color palette development, typography selection, and creation of brand guidelines.",
    longDescription:
      "This corporate rebranding project was undertaken to modernize the client's image while maintaining their established market presence. We began with extensive market research and competitor analysis to identify opportunities for differentiation. The design process involved multiple stakeholders and went through several iterations to ensure alignment with the company's values and strategic goals.\n\nThe final deliverables included a comprehensive brand guidelines document, logo variations for different applications, custom iconography, and templates for various marketing materials. The new identity has been successfully implemented across all digital and physical touchpoints, resulting in improved brand recognition and customer perception.",
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign",
      "Figma",
      "Brand Strategy",
    ],
    liveUrl: "https://example-corporate.com",
    githubUrl: "",
    images: [
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "inventory-management-rpa",
    title: "Inventory Management RPA",
    category: "RPA Solutions",
    description:
      "An automated inventory management system using Robotic Process Automation (RPA) to streamline operations for a wholesale distributor.",
    longDescription:
      "This RPA solution was developed to address the client's challenge of managing inventory across multiple warehouses and sales channels. The system automates data entry, reconciliation, and reporting tasks that were previously performed manually, reducing errors and freeing up staff for more valuable activities.\n\nThe solution integrates with the client's existing ERP system and e-commerce platforms to maintain accurate inventory levels in real-time. It includes automated purchase order generation based on predefined rules, barcode scanning integration for physical inventory counts, and customizable alerts for low stock levels or discrepancies.\n\nThe implementation has resulted in a 70% reduction in inventory management time, near-zero data entry errors, and improved inventory turnover rates due to more accurate stocking decisions.",
    technologies: [
      "UiPath",
      "Python",
      "SQL",
      "REST APIs",
      "Power BI",
      "Azure Functions",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/example/inventory-rpa",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "restaurant-website",
    title: "Restaurant Website",
    category: "Web Development",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    description:
      "A modern, responsive website for a high-end restaurant featuring online reservations and menu display.",
    longDescription:
      "This restaurant website was designed to showcase the unique dining experience while providing practical functionality for customers. The site features high-quality food photography, an interactive menu with filtering options, and a seamless reservation system integrated with the restaurant's booking software.\n\nThe design emphasizes the restaurant's ambiance and culinary style, with careful attention to typography and color choices that reflect the brand identity. Mobile optimization was a key priority, ensuring that customers can easily browse the menu and make reservations from any device.",
    technologies: [
      "Next.js",
      "Framer Motion",
      "Tailwind CSS",
      "Reservation API",
      "Contentful CMS",
    ],
    liveUrl: "https://example-restaurant.com",
    githubUrl: "https://github.com/example/restaurant-website",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "mobile-app-ui",
    title: "Mobile App UI/UX",
    category: "UI/UX Design",
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80",
    description:
      "A comprehensive UI/UX design for a fitness tracking mobile application with personalized workout plans.",
    longDescription:
      "This mobile app UI/UX project focused on creating an intuitive and engaging experience for fitness enthusiasts. We conducted extensive user research to understand the pain points of existing fitness apps and designed solutions that address these challenges.\n\nThe interface features a clean, minimalist design with a focus on data visualization, making it easy for users to track their progress. Custom animations and micro-interactions enhance the user experience, providing feedback and encouragement throughout the fitness journey.",
    technologies: [
      "Figma",
      "Protopie",
      "Adobe XD",
      "User Testing",
      "Motion Design",
    ],
    liveUrl: "https://example-fitness-app.com",
    githubUrl: "",
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "fashion-brand-logo",
    title: "Fashion Brand Logo",
    category: "Visual Identity",
    imageUrl:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&q=80",
    description:
      "A sophisticated logo and visual identity system for an emerging sustainable fashion brand.",
    longDescription:
      "This visual identity project for a sustainable fashion brand required a delicate balance between contemporary design trends and timeless elegance. The client needed a logo that would communicate their commitment to sustainability while appealing to fashion-conscious consumers.\n\nThe final logo design uses organic forms and a carefully selected color palette that reflects the brand's natural materials and ethical production methods. The accompanying identity system includes custom typography, packaging design, and social media templates that maintain consistency across all brand touchpoints.",
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Typography",
      "Color Theory",
      "Sustainable Design",
    ],
    liveUrl: "https://example-fashion-brand.com",
    githubUrl: "",
    images: [
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52d01a7b321?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52d01a7b321?auto=format&fit=crop&q=80",
    ],
  },
];

export default function ProjectDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const project = projectsData.find((p) => p.id === id);

  useEffect(() => {
    const header = headerRef.current;
    const content = contentRef.current;

    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    }

    window.scrollTo(0, 0);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-8">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="bg-gwapo-gradient"
        >
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-900 text-white min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/" passHref>
            <Button
              variant="ghost"
              className="mb-8 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>

          <div ref={headerRef} className="mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <Badge className="mb-2 bg-gwapo text-white">
                  {project.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold">
                  {project.title}
                </h1>
              </div>

              <div className="flex gap-4">
                {project.liveUrl && (
                  <Button
                    className="bg-gwapo-gradient hover:opacity-90"
                    onClick={() => window.open(project.liveUrl, "_blank")}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    View Live
                  </Button>
                )}

                {project.githubUrl && (
                  <Button
                    variant="outline"
                    className="border-gwapo text-gwapo hover:bg-gwapo/10"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2">
              <ProjectGallery images={project.images} />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gwapo">
                  About the Project
                </h2>
                <div className="text-gray-300 space-y-4">
                  {project.longDescription
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gwapo">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-800 text-gray-200 border-gray-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
