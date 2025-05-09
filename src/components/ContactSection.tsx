'use client'
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current && formRef.current && infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
      
      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-gwapo font-medium mb-2">{t('contact-title').toUpperCase()}</h6>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('contact-title')}</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            {t('contact-subtitle')}
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={infoRef} className="neo-glass p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-white">{t('contact-subtitle')}</h3>
            <p className="text-gray-300 mb-8">
              {t('contact-description')}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gwapo/10 rounded-full p-3 text-gwapo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">{t('contact-phone')}</h4>
                  <p className="text-gray-300">+44 12 3456 7890</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gwapo/10 rounded-full p-3 text-gwapo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="16" height="12" x="4" y="6" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">{t('contact-email')}</h4>
                  <p className="text-gray-300">info@gwapo.uk</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gwapo/10 rounded-full p-3 text-gwapo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">{t('contact-location')}</h4>
                  <p className="text-gray-300">Joaseba-sc</p>
                </div>
              </div>
            </div>
          </div>
          
          <form ref={formRef} className="neo-glass p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('contact-name')}
                </label>
                <Input
                  id="name"
                  placeholder={t('contact-name')}
                  className="w-full bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('contact-email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('contact-email')}
                  className="w-full bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                {t('contact-subject')}
              </label>
              <Input
                id="subject"
                placeholder={t('contact-subject-text')}
                className="w-full bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                {t('contact-message')}
              </label>
              <Textarea
                id="message"
                placeholder={t('contact-message')}
                className="w-full min-h-[150px] bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <Button className="w-full bg-gwapo-gradient hover:opacity-90 transition-opacity py-6 text-lg">
              {t('contact-send')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
