import React, { useState, useEffect, ReactNode } from 'react';
import { I18nContext, Language, getStoredLanguage, setStoredLanguage, getNestedValue } from '@/lib/i18n';

// Import all locales
import ruLocale from '@/locales/ru.json';
import uzLocale from '@/locales/uz.json';
import enLocale from '@/locales/en.json';

interface I18nProviderProps {
  children: ReactNode;
}

const locales = {
  ru: ruLocale,
  uz: uzLocale,
  en: enLocale,
};

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getStoredLanguage());

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setStoredLanguage(lang);
    
    // Update document attributes for SEO
    document.documentElement.lang = lang === 'uz' ? 'uz-UZ' : lang === 'en' ? 'en-US' : 'ru-RU';
    
    // Update meta tags dynamically
    const locale = locales[lang];
    document.title = locale.meta.title;
    
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', locale.meta.description);
    }

    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', locale.meta.title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', locale.meta.description);
    }

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      const localeCode = lang === 'uz' ? 'uz_UZ' : lang === 'en' ? 'en_US' : 'ru_RU';
      ogLocale.setAttribute('content', localeCode);
    }
  };

  const t = (key: string): string => {
    const locale = locales[language];
    const value = getNestedValue(locale, key);
    return typeof value === 'string' ? value : key;
  };

  const tArray = (key: string): any[] => {
    const locale = locales[language];
    const value = getNestedValue(locale, key);
    return Array.isArray(value) ? value : [];
  };

  // Initialize document language on mount
  useEffect(() => {
    handleSetLanguage(language);
  }, []);

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
    tArray,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};