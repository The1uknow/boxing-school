import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Star } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { CTA } from './CTA';

/**
 * Tariffs section with pricing cards and hover effects
 */
export const Tariffs: React.FC = () => {
  const { t, tArray } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const tariffs = tArray('tariffs.items');

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <section id="tariffs" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            variants={cardVariants}
            className="text-center mb-16"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              {t('tariffs.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('tariffs.subtitle')}
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tariffs.map((tariff: any, index: number) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`group relative ${
                  tariff.popular ? 'md:-mt-8' : ''
                }`}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { type: 'spring', stiffness: 300 }
                }}
              >
                {/* Popular Badge */}
                {tariff.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: -12 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    <div className="bg-gradient-cta text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star size={16} />
                      Популярный
                    </div>
                  </motion.div>
                )}

                <div className={`relative bg-gradient-card rounded-2xl p-8 h-full border transition-all duration-300 shadow-card group-hover:shadow-boxing ${
                  tariff.popular 
                    ? 'border-primary/50 shadow-glow' 
                    : 'border-border hover:border-primary/30'
                }`}>
                  
                  {/* Impact Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    initial={false}
                    whileHover={{
                      boxShadow: [
                        '0 0 0 0 hsl(var(--boxing-red) / 0.3)',
                        '0 0 0 20px hsl(var(--boxing-red) / 0)',
                      ],
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Plan Name */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {tariff.name}
                    </h3>
                    <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                      {tariff.price}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8 flex-1">
                    {tariff.features.map((feature: string, featureIndex: number) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start gap-3 text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Check size={12} className="text-primary" />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <CTA 
                      variant={tariff.popular ? "primary" : "secondary"} 
                      className="w-full justify-center"
                    />
                  </div>

                  {/* Boxing Decoration */}
                  <motion.div
                    className="absolute bottom-4 right-4 text-boxing-gold/10 text-4xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    🥊
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};