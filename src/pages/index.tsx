import React, { useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Tariffs } from '@/components/Tariffs';
import { Contacts } from '@/components/Contacts';
import { Footer } from '@/components/Footer';

/**
 * Main landing page for Boxing School in Tashkent
 * Fully responsive with i18n support and SEO optimization
 */
const Index: React.FC = () => {
  const { t, language } = useI18n();

  // Update document head for SEO
  useEffect(() => {
    // Set document language
    document.documentElement.lang = language === 'uz' ? 'uz-UZ' : language === 'en' ? 'en-US' : 'ru-RU';
    
    // Set canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin);
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = window.location.origin;
      document.head.appendChild(newCanonical);
    }
    
    // Add structured data for LocalBusiness
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation", 
      "name": t('meta.title'),
      "description": t('meta.description'),
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tashkent",
        "addressCountry": "UZ"
      },
      "areaServed": {
        "@type": "City",
        "name": "Tashkent"
      },
      "telephone": "+998-90-317-38-08",
      "sameAs": [
        "https://t.me/boxing_school_tashkent_bot"
      ],
      "openingHours": "Mo-Sa 09:00-21:00",
      "sport": "Boxing",
      "offers": {
        "@type": "Offer",
        "name": "Boxing Training Programs",
        "category": "Sports Training"
      }
    };
    
    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script') as HTMLScriptElement;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [t, language]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Tariffs />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
