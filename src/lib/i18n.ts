import { createContext, useContext } from 'react';

export type Language = 'ru' | 'uz' | 'en';

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => any[];
}

export const I18nContext = createContext<I18nContextType | null>(null);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

export const STORAGE_KEY = 'boxing-school-lang';
export const DEFAULT_LANGUAGE: Language = 'ru';

export const getStoredLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['ru', 'uz', 'en'].includes(stored)) {
      return stored as Language;
    }
  } catch (error) {
    console.warn('Failed to get stored language:', error);
  }
  return DEFAULT_LANGUAGE;
};

export const setStoredLanguage = (lang: Language): void => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    console.warn('Failed to store language:', error);
  }
};

/**
 * Get nested object value by dot notation key
 */
export const getNestedValue = (obj: any, key: string): any => {
  return key.split('.').reduce((current, keyPart) => {
    return current && current[keyPart] !== undefined ? current[keyPart] : null;
  }, obj);
};