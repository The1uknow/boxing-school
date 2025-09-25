import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { CTA } from './CTA';

/**
 * Contacts section with contact information and map
 */
export const Contacts: React.FC = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const TG_BOT_URL = import.meta.env.VITE_TG_BOT_URL || 'https://t.me/boxing_school_tashkent_bot';
  const PHONE_NUMBER = '+998903173808';
  
  const contactInfo = [
    {
      icon: MapPin,
      label: t('contacts.address_label'),
      value: t('contacts.address_value'),
      action: () => window.open('https://yandex.com/maps/?text=Tashkent,Uzbekistan', '_blank')
    },
    {
      icon: Phone,
      label: t('contacts.phone_label'),
      value: t('contacts.phone_value'),
      action: () => window.location.href = `tel:${PHONE_NUMBER}`
    },
    {
      icon: Clock,
      label: t('contacts.hours_label'),
      value: t('contacts.hours_value'),
      action: null
    }
  ];

  const actionButtons = [
    {
      icon: MessageCircle,
      label: t('contacts.actions.telegram'),
      action: () => window.open(TG_BOT_URL, '_blank'),
      variant: 'primary' as const
    },
    {
      icon: Phone,
      label: t('contacts.actions.call'),
      action: () => window.location.href = `tel:${PHONE_NUMBER}`,
      variant: 'secondary' as const
    },
    {
      icon: Navigation,
      label: t('contacts.actions.route'),
      action: () => window.open('https://yandex.com/maps/?text=Tashkent,Uzbekistan', '_blank'),
      variant: 'secondary' as const
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section id="contacts" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              {t('contacts.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contacts.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8" transition={{ duration: 0.6 }}>
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Наша информация
              </h3>
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className={`group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                    info.action ? 'hover:bg-secondary/50 cursor-pointer' : ''
                  }`}
                  onClick={info.action || undefined}
                  whileHover={info.action ? { x: 10 } : {}}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <info.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground mb-1">{info.label}</p>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </motion.div>
              ))}

              {/* Action Buttons */}
              <div className="space-y-4 pt-8">
                {actionButtons.map((button, index) => (
                  <motion.button
                    key={index}
                    onClick={button.action}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl font-medium transition-all duration-300 ${
                      button.variant === 'primary'
                        ? 'bg-gradient-cta text-white shadow-boxing hover:shadow-glow'
                        : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border hover:border-primary/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <button.icon size={20} />
                    {button.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div variants={itemVariants} className="space-y-8" transition={{ duration: 0.6 }}>
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Наше местоположение
              </h3>
              
              <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-boxing transition-all duration-300 group">
                <motion.div
                  className="aspect-square lg:aspect-[4/3] bg-gradient-card border border-border group-hover:border-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <iframe
                    src="https://yandex.com/map-widget/v1/?um=constructor%3A5b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b&amp;source=constructor"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Tashkent Boxing School Location"
                    loading="lazy"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
                
                {/* Map Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-boxing-dark/20 to-transparent pointer-events-none" />
                
                {/* Map Action Button */}
                <motion.button
                  onClick={() => window.open('https://yandex.com/maps/?text=Tashkent,Uzbekistan', '_blank')}
                  className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-boxing hover:shadow-glow transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Navigation size={20} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Final CTA */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
            transition={{ duration: 0.6 }}
          >
            <CTA variant="primary" size="lg" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};