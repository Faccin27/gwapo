'use client'

import React, { createContext, useContext, useState } from 'react';
import translations from '@/utils/translations';

export type Language = 'en' | 'pt';

type LanguageContextType = {
  language: Language;
  t: (key: string) => string;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ 
  children, 
  initialLanguage = 'en',
  onLanguageChange 
}: { 
  children: React.ReactNode;
  initialLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage as Language);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
