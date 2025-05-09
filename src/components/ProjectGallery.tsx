"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface ProjectGalleryProps {
  images: string[]
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const mainImageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (galleryRef.current) {
      gsap.fromTo(galleryRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
    }
  }, [])

  // Handle lightbox animations
  useEffect(() => {
    if (!lightboxRef.current) return

    if (lightboxOpen) {
      // Animate opening
      gsap.fromTo(
        lightboxRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
      )

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

  useEffect(() => {
    if (mainImageRef.current) {
      gsap.fromTo(
        mainImageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
      )
    }
  }, [currentIndex])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div ref={galleryRef} className="w-full">
      <div className="relative rounded-lg overflow-hidden bg-gray-800 shadow-xl mb-4">
        <img
          ref={mainImageRef}
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Project image ${currentIndex + 1}`}
          className="w-full aspect-video object-cover"
          key={currentIndex}
        />

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          onClick={prevImage}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          onClick={nextImage}
        >
          <ChevronRight size={24} />
        </button>

        <button
          className="absolute right-4 bottom-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          onClick={() => openLightbox(currentIndex)}
        >
          <ZoomIn size={24} />
        </button>

        <div className="absolute left-4 bottom-4 bg-black/70 text-white px-3 py-1 text-sm rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <div ref={thumbnailsRef} className="flex gap-2 overflow-x-auto pb-2 snap-x">
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden cursor-pointer snap-start transition-all ${
              index === currentIndex ? "ring-2 ring-gwapo" : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => setLightboxOpen(false)}
        >
          <div
            ref={lightboxRef}
            className="relative max-w-7xl max-h-[90vh] w-full"
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          >
            <img
              src={images[lightboxIndex] || "/placeholder.svg"}
              alt={`Full size image ${lightboxIndex + 1}`}
              className="w-full h-full object-contain"
            />

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              onClick={prevLightboxImage}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              onClick={nextLightboxImage}
            >
              <ChevronRight size={28} />
            </button>

            <button
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
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

            <div className="absolute left-4 bottom-4 bg-black/70 text-white px-4 py-2 text-sm rounded-full">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectGallery
