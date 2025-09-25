import React from 'react';
import { motion } from 'framer-motion';
import { useI18n, Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LangSwitcherProps {
  className?: string;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'uz', label: 'UZ', flag: '🇺🇿' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
];

/**
 * Language switcher component with smooth animations
 * Stores language preference in localStorage
 */
export const LangSwitcher: React.FC<LangSwitcherProps> = ({ className }) => {
  const { language, setLanguage } = useI18n();

  return (
    <div className={cn('flex items-center gap-1 bg-secondary rounded-lg p-1', className)}>
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={cn(
            'relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            'hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
            language === lang.code
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${lang.label}`}
        >
          {language === lang.code && (
            <motion.div
              className="absolute inset-0 bg-primary/10 rounded-md"
              layoutId="activeLanguage"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative flex items-center gap-1">
            <span className="text-xs" aria-hidden="true">{lang.flag}</span>
            {lang.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};