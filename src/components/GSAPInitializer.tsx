'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface GSAPInitializerProps {
  children: React.ReactNode;
}

const GSAPInitializer: React.FC<GSAPInitializerProps> = ({ children }) => {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add smooth scroll class to body
    document.body.classList.add('smooth-scroll');
    document.body.classList.add('bg-gray-900');

    // Create the smooth scroller
    let smoother: ScrollSmoother | null = null;
    
    if (smoothWrapperRef.current && smoothContentRef.current) {
      smoother = ScrollSmoother.create({
        smooth: 1.5, // The smoothness level (higher = smoother)
        effects: true, // Enable effects
        smoothTouch: 0.1, // Lower value for touch devices
        wrapper: smoothWrapperRef.current,
        content: smoothContentRef.current,
        normalizeScroll: true, // Normalize scroll behavior across devices
      });
    }

    // Add glass blur effect on scroll
    const addBlurEffects = () => {
      gsap.utils.toArray('.glass-card').forEach((card: any) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          backdropFilter: 'blur(15px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          ease: 'none',
        });
      });
    };

    addBlurEffects();

    // Clean up on unmount
    return () => {
      document.body.classList.remove('smooth-scroll');
      document.body.classList.remove('bg-gray-900');
      smoother?.kill();
      
      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={smoothWrapperRef} id="smooth-wrapper" className="bg-gray-900">
      <div ref={smoothContentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default GSAPInitializer;
