import React from 'react';
import { motion } from 'framer-motion';
import { useI18n, Language } from '@/lib/i18n';
import { LangSwitcher } from './LangSwitcher';

/**
 * Footer with copyright, links and language selector
 */
export const Footer: React.FC = () => {
  const { t, language } = useI18n();

  const hreflangLinks = {
    ru: 'ru-RU',
    uz: 'uz-UZ', 
    en: 'en-US'
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-boxing-dark border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <motion.div 
              className="space-y-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center text-2xl font-bold text-primary">
                🥊 <span className="ml-2 text-foreground">BoxingSchool</span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {language === 'ru' ? 'Профессиональная школа бокса в Ташкенте' : 
                 language === 'uz' ? 'Toshkentdagi professional boks maktabi' :
                 'Professional boxing school in Tashkent'}
              </p>
            </motion.div>

            {/* Navigation Links */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-foreground font-semibold mb-4">
                {language === 'ru' ? 'Навигация' : 
                 language === 'uz' ? 'Navigatsiya' :
                 'Navigation'}
              </h4>
              <nav className="flex flex-col space-y-2">
                {[
                  { href: '#hero', key: 'nav.home' },
                  { href: '#about', key: 'nav.about' },
                  { href: '#tariffs', key: 'nav.tariffs' },
                  { href: '#contacts', key: 'nav.contacts' }
                ].map((link, index) => (
                  <motion.button
                    key={link.key}
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary text-left transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1 py-0.5"
                    whileHover={{ x: 10 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {t(link.key)}
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Contact & Language */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-foreground font-semibold mb-4">
                {language === 'ru' ? 'Контакты' : 
                 language === 'uz' ? 'Aloqa' :
                 'Contact'}
              </h4>
              <div className="space-y-3 text-muted-foreground">
                <p>📍 {t('contacts.address_value')}</p>
                <p>📞 {t('contacts.phone_value')}</p>
                <p>🕒 {t('contacts.hours_value')}</p>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'ru' ? 'Язык' : 
                   language === 'uz' ? 'Til' :
                   'Language'}:
                </p>
                <LangSwitcher />
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            className="border-t border-border"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />

          {/* Bottom Footer */}
          <motion.div
            className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © {currentYear} {t('footer.copyright')}
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <button className="text-muted-foreground hover:text-primary transition-colors">
                {t('footer.links.privacy')}
              </button>
              <span className="text-border">|</span>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                {t('footer.links.terms')}
              </button>
            </div>
          </motion.div>

          {/* Hidden hreflang links for SEO */}
          <div className="hidden">
            {Object.entries(hreflangLinks).map(([lang, locale]) => (
              <link
                key={lang}
                rel="alternate"
                hrefLang={locale}
                href={`${window.location.origin}?lang=${lang}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};