"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/context/LanguageContext"

gsap.registerPlugin(ScrollTrigger)

interface ProcessStepProps {
  number: string
  title: string
  description: string
  index: number
  totalSteps: number
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description, index, totalSteps }) => {
  const stepRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const step = stepRef.current
    const line = lineRef.current

    if (step) {
      gsap.fromTo(
        step,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      )
    }

    if (line && index < totalSteps - 1) {
      gsap.fromTo(
        line,
        { height: "0%" },
        {
          height: "150%",
          duration: 2,
          delay: index * 0.2 + 0.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: step,
            start: "top bottom-=120",
            toggleActions: "play none none none",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [index, totalSteps])

  return (
    <div className="relative" ref={stepRef}>
      <div className="flex items-start">
        <div className="flex-shrink-0 relative">
          <div className="w-12 h-12 rounded-full bg-gwapo-gradient flex items-center justify-center text-white font-bold shadow-lg">
            {number}
          </div>

          {/* The vertical line that connects to the next step */}
          {index < totalSteps - 1 && (
            <div
              ref={lineRef}
              className="absolute w-1 bg-gwapo-gradient h-0"
              style={{
                left: "50%",
                top: "100%",
                transform: "translateX(-50%)",
                height: "0%",
              }}
            />
          )}
        </div>

        <div className="ml-6">
          <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}

// Define just 3 different images
const processImages = [
  "/images/nakai_mockup.png",
  "/images/mw.png",
  "/images/blazim.png",
]

const ProcessSection: React.FC = () => {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState("")

  useEffect(() => {
    const title = titleRef.current
    const section = sectionRef.current

    if (title) {
      gsap.fromTo(
        title,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      )
    }

    // Create scroll triggers for image changes
    if (section) {
      // Divide the section into three equal parts
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "33% center",
        onEnter: () => setActiveImageIndex(0),
        onEnterBack: () => setActiveImageIndex(0),
      })

      ScrollTrigger.create({
        trigger: section,
        start: "33% center",
        end: "66% center",
        onEnter: () => setActiveImageIndex(1),
        onEnterBack: () => setActiveImageIndex(1),
      })

      ScrollTrigger.create({
        trigger: section,
        start: "66% center",
        end: "bottom center",
        onEnter: () => setActiveImageIndex(2),
        onEnterBack: () => setActiveImageIndex(2),
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Animate image changes
  useEffect(() => {
    if (!imageRef.current) return

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
    )
  }, [activeImageIndex])

  // Handle lightbox animations and scroll closing
  useEffect(() => {
    if (!lightboxRef.current) return

    if (lightboxOpen) {
      // Animate opening
      gsap.fromTo(
        lightboxRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
      )

      // Close lightbox on scroll
      const handleScroll = () => {
        setLightboxOpen(false)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    } else {
      // Animate closing
      const tl = gsap.timeline()
      tl.to(lightboxRef.current, { opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.in" })
    }
  }, [lightboxOpen])

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl)
    setLightboxOpen(true)
  }

  const processSteps = [
    {
      number: "1",
      titleKey: "process-step1",
      descriptionKey: "process-step1-desc",
    },
    {
      number: "2",
      titleKey: "process-step2",
      descriptionKey: "process-step2-desc",
    },
    {
      number: "3",
      titleKey: "process-step3",
      descriptionKey: "process-step3-desc",
    },
    {
      number: "4",
      titleKey: "process-step4",
      descriptionKey: "process-step4-desc",
    },
    {
      number: "5",
      titleKey: "process-step5",
      descriptionKey: "process-step5-desc",
    },
    {
      number: "6",
      titleKey: "process-step6",
      descriptionKey: "process-step6-desc",
    },
  ]

  return (
    <section id="process" ref={sectionRef} className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <h6 className="text-gwapo font-medium mb-2">{t("process-title").toUpperCase()}</h6>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t("process-title")}</h2>
          <p className="max-w-2xl mx-auto text-gray-300">{t("process-subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side: Process steps */}
          <div className="max-w-3xl mx-auto space-y-16">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                number={step.number}
                title={t(step.titleKey)}
                description={t(step.descriptionKey)}
                index={index}
                totalSteps={processSteps.length}
              />
            ))}
          </div>

          {/* Right side: Images that change with scroll */}
          <div className="hidden lg:flex items-center justify-center sticky top-32 h-[calc(100vh-200px)]">
            <div
              ref={imageRef}
              className="w-full max-w-[500px] aspect-square rounded-lg overflow-hidden shadow-xl cursor-pointer"
              onClick={() => openLightbox(processImages[activeImageIndex])}
            >
              <img
                key={activeImageIndex}
                src={processImages[activeImageIndex] || "/placeholder.svg"}
                alt="Process visualization"
                className="w-full h-full object-cover"
              />

              {/* Click to enlarge indicator */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 text-xs rounded-full flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
                Click to enlarge
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => setLightboxOpen(false)}
        >
          <div
            ref={lightboxRef}
            className="relative max-w-5xl max-h-[90vh] w-full"
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          >
            <img
              src={lightboxImage || "/placeholder.svg"}
              alt="Enlarged view"
              className="w-full h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(false)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProcessSection
