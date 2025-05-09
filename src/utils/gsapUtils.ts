
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Initialize GSAP ScrollSmoother
export const initScrollSmoother = () => {
  return ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.1,
  });
};

// Hook for scroll animations
export const useGSAPScrollAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  animations: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
) => {
  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
            ...triggerOptions,
          },
          ...animations,
        }
      );
    });

    return () => ctx.revert();
  }, [elementRef, animations, triggerOptions]);
};

// Hook for timeline animations
export const useGSAPTimeline = (
  refs: Array<React.RefObject<HTMLElement>>,
  animationConfig: Array<{ target: number; vars: gsap.TweenVars; position?: string | number }>,
  timelineOptions?: gsap.TimelineVars
) => {
  useLayoutEffect(() => {
    const elements = refs.map(ref => ref.current).filter(Boolean);
    if (elements.length !== refs.length) return;

    const tl = gsap.timeline(timelineOptions);
    
    animationConfig.forEach((config) => {
      const element = refs[config.target].current;
      if (element) {
        tl.to(element, config.vars, config.position);
      }
    });

    return () => {
      tl.kill();
    };
  }, [refs, animationConfig, timelineOptions]);
};

// Initialize ScrollTrigger
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

// Create a staggered animation effect
export const staggerAnimation = (
  elementsClass: string,
  animations: gsap.TweenVars,
  staggerAmount: number = 0.1,
  scrollTriggerOptions?: ScrollTrigger.Vars
) => {
  gsap.utils.toArray(elementsClass).forEach((element: any, i) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: i * staggerAmount,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
          ...scrollTriggerOptions,
        },
        ...animations,
      }
    );
  });
};

// Canvas lines animation for circuit board effect
export const initCircuitAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  color: string = '#00BFD8',
  density: number = 20
) => {
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCircuit();
    };

    const drawCircuit = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = Math.max(canvas.width, canvas.height) / density;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      
      for (let i = 0; i < density; i++) {
        // Random starting positions
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        // Random paths with right angles
        let currentX = startX;
        let currentY = startY;
        
        const steps = 2 + Math.floor(Math.random() * 4);
        
        for (let j = 0; j < steps; j++) {
          const direction = Math.floor(Math.random() * 4);
          const distance = gridSize * (0.5 + Math.random() * 1.5);
          
          switch (direction) {
            case 0: // Right
              currentX += distance;
              break;
            case 1: // Down
              currentY += distance;
              break;
            case 2: // Left
              currentX -= distance;
              break;
            case 3: // Up
              currentY -= distance;
              break;
          }
          
          ctx.lineTo(currentX, currentY);
          
          // Random dots at corners
          if (Math.random() > 0.7) {
            ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
          }
        }
        
        ctx.globalAlpha = 0.3 + Math.random() * 0.4;
        ctx.stroke();
      }
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      drawCircuit();
      setTimeout(animate, 2000 + Math.random() * 2000);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef, color, density]);
};

export default {
  initScrollSmoother,
  useGSAPScrollAnimation,
  useGSAPTimeline,
  refreshScrollTrigger,
  staggerAnimation,
  initCircuitAnimation
};
