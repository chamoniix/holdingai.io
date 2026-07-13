'use client';

import React, { createContext, useContext, ReactNode } from 'react';

type Dictionary = Record<string, any>;

interface LanguageContextProps {
  lang: string;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children, lang, dict }: { children: ReactNode; lang: string; dict: Dictionary }) {
  return (
    <LanguageContext.Provider value={{ lang, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
