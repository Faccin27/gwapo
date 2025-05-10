"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/context/LanguageContext"

gsap.registerPlugin(ScrollTrigger)

// Define just 3 different images
const processImages = ["/images/nakai_mockup.png", "/images/mw.png", "/images/blazim.png"]

const ProcessSection: React.FC = () => {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState("")

  useEffect(() => {
    const title = titleRef.current
    const section = sectionRef.current
    const stepsContainer = stepsContainerRef.current

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

    // Animate steps and lines
    if (stepsContainer) {
      // Get all steps, circles and lines
      const steps = stepsContainer.querySelectorAll(".process-step")
      const circles = stepsContainer.querySelectorAll(".process-circle")
      const lines = stepsContainer.querySelectorAll(".process-line")

      // Animate each step appearance
      steps.forEach((step, index) => {
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
      })

      // Animate each line and then the next circle
      lines.forEach((line, index) => {
        // Create a timeline for this line animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: steps[index],
            start: "top bottom-=120",
            toggleActions: "play none none none",
          },
        })

        // Animate the line growing
        tl.fromTo(
          line,
          { height: "0%" },
          {
            height: "150%",
            duration: 2,
            delay: index * 0.2 + 0.4,
            ease: "power3.inOut",
          },
        )
          // Then animate the next circle to full color
          .to(
            circles[index + 1], // Target the NEXT circle
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            },
          )
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
          <div ref={stepsContainerRef} className="max-w-3xl mx-auto space-y-16">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="flex items-start">
                  <div className="flex-shrink-0 relative">
                    <div
                      className="process-circle w-12 h-12 rounded-full bg-gwapo-gradient flex items-center justify-center text-white font-bold shadow-lg"
                      style={{ opacity: index === 0 ? 1 : 0.3 }} // First circle is fully visible, others are faded
                    >
                      {step.number}
                    </div>

                    {/* The vertical line that connects to the next step */}
                    {index < processSteps.length - 1 && (
                      <div
                        className="process-line absolute w-1 bg-gwapo-gradient"
                        style={{
                          left: "50%",
                          top: "100%",
                          transform: "translateX(-50%)",
                          height: "0%", // Start with 0 height
                        }}
                      />
                    )}
                  </div>

                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">{t(step.titleKey)}</h3>
                    <p className="text-gray-300 text-sm">{t(step.descriptionKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Images that change with scroll */}
          <div className="hidden lg:flex items-center justify-center sticky top-32 h-[calc(100vh-200px)]">
            <div
              ref={imageRef}
              className="w-full max-w-[500px] aspect-square rounded-lg overflow-hidden shadow-xl"
            >
              <img
                key={activeImageIndex}
                src={processImages[activeImageIndex] || "/placeholder.svg"}
                alt="Process visualization"
                className="w-full h-full object-cover"
              />


            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <div
            ref={lightboxRef}
            className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center p-4"
            style={{
              position: "relative", // Changed from fixed to relative
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={lightboxImage || "/placeholder.svg"}
                alt="Enlarged view"
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
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
        </div>
      )}
    </section>
  )
}

export default ProcessSection
