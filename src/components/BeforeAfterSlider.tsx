"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from '@/context/LanguageContext';


gsap.registerPlugin(ScrollTrigger)

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  height?: string
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  height = "500px",
}) => {
  const [position, setPosition] = useState(50)
  const sliderRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage();


  // Handle drag events
  const handleDrag = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!sliderRef.current) return

    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()

    // Get mouse/touch position
    let clientX: number
    if ("touches" in e) {
      clientX = e.touches[0].clientX
    } else {
      clientX = (e as MouseEvent).clientX
    }

    const x = clientX - rect.left
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))

    // Update position immediately without setState delay
    if (dividerRef.current) {
      dividerRef.current.style.left = `${newPosition}%`
    }

    // Also update state for other components that might depend on it
    setPosition(newPosition)
  }

  // Add drag event listeners
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()

    // For mouse events
    const handleMouseMove = (e: MouseEvent) => {
      handleDrag(e)
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    // For touch events
    const handleTouchMove = (e: TouchEvent) => {
      handleDrag(e)
    }

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }

    if (e.type === "mousedown") {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else if (e.type === "touchstart") {
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("touchend", handleTouchEnd)
    }
  }

  // GSAP animation
  useEffect(() => {
    const section = sectionRef.current

    if (section) {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
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

  return (
    <section id="before-after" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-gwapo font-medium mb-2">{t('before')} & {t('after')}</h6>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('before/after-title')}</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
          {t('before/after-description')}
          </p>
        </div>

        <div
          ref={sliderRef}
          className="before-after-slider mx-auto rounded-lg shadow-xl overflow-hidden relative select-none"
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "47.25%", // 16:9 aspect ratio (9 / 16 = 0.5625)
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* Before image */}
          <div
            className="slider-before absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url(${beforeImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              clipPath: `inset(0 ${100 - position}% 0 0)`,
            }}
          >
            <span className="absolute top-5 left-5 bg-black/70 text-white px-3 py-1 text-sm rounded-full">
              {beforeLabel}
            </span>
          </div>

          {/* After image */}
          <div
            className="slider-after absolute w-full h-full"
            style={{
              backgroundImage: `url(${afterImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="absolute top-5 right-5 bg-black/70 text-white px-3 py-1 text-sm rounded-full">
              {afterLabel}
            </span>
          </div>

          {/* Divider */}
          <div
            ref={dividerRef}
            className="slider-divider"
            style={{
              left: `${position}%`,
              transition: "left 0.00s ease-out",
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default BeforeAfterSlider
