"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger)

interface ProjectCardProps {
  title: string
  category: string
  imageUrl: string
  index: number
  id: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, imageUrl, index, id }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage();

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [index])

  const handleViewProject = () => {
    alert("falta criar aqui pra levar pro projeto")
  }

  return (
    <Card ref={cardRef} className="overflow-hidden group cursor-pointer border-none shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <span className="text-fixteam font-medium text-sm mb-2">{category}</span>
          <h3 className="text-white text-xl font-semibold mb-4">{title}</h3>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900 w-fit"
            onClick={handleViewProject}
          >
            {t('view-project')} 
          </Button>
        </div>
      </div>
    </Card>
  )
}

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
  const { t } = useLanguage();

  // Sample projects data - in a real application, this would come from a database
  const projects = [
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      category: "Web Development",
      imageUrl: "/images/mw.png",
    },
    {
      id: "corporate-brand-identity",
      title: "Corporate Brand Identity",
      category: "Visual Identity",
      imageUrl: "/images/mw.png",
    },
    {
      id: "inventory-management-rpa",
      title: "Inventory Management RPA",
      category: "RPA Solutions",
      imageUrl: "/images/mw.png",
    },
    {
      id: "restaurant-website",
      title: "Restaurant Website",
      category: "Web Development",
      imageUrl: "/images/mw.png",
    },
    {
      id: "mobile-app-ui",
      title: "Mobile App UI/UX",
      category: "UI/UX Design",
      imageUrl: "/images/mw.png",
    },
    {
      id: "fashion-brand-logo",
      title: "Fashion Brand Logo",
      category: "Visual Identity",
      imageUrl: "/images/mw.png",
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16">
          <h6 className="text-fixteam font-medium mb-2">{t('projects-title')} </h6>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('projects-subtitle')} </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
          {t('projects-description')} 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              category={project.category}
              imageUrl={project.imageUrl}
              index={index}
              id={project.id}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-fixteam text-fixteam hover:bg-fixteam/10 px-8 py-6 text-lg">
          {t('view-all-projects')} 
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
