'use client'

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Circuit animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    
    const particles: { x: number; y: number; directionX: number; directionY: number; size: number }[] = [];
    const particleCount = 30;
    const connectionDistance = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        directionX: (Math.random() - 0.5) * 0.5,
        directionY: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1
      });
    }
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.directionX;
        particle.y += particle.directionY;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.directionX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.directionY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 191, 216, 0.6)';
        ctx.fill();
        
        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 191, 216, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Hero animations with GSAP
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      '-=0.7'
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.7'
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      <div className="container mx-auto px-4 py-32 z-10 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t('hero-title')} <br />
            <span className="bg-clip-text text-transparent bg-gwapo-gradient">{t('hero-subtitle')}</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 mb-10"
          >
            {t('hero-subtitle')}
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-gwapo-gradient hover:opacity-90 text-white px-8 py-6 text-lg"
            >
              {t('hero-cta')}
            </Button>
            <Button 
              variant="outline" 
              className="border-gwapo border-2 text-gwapo hover:bg-gwapo/10 px-8 py-6 text-lg"
            >
              {t('hero-learn-more')}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path 
            d="M12 5V19M12 19L19 12M12 19L5 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
