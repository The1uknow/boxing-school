import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Target, Trophy, Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { CTA } from './CTA';

/**
 * About section with features and micro-interactions
 */
export const About: React.FC = () => {
  const { t, tArray } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    { icon: Users, key: 'Individual approach to each student' },
    { icon: Shield, key: 'Safe training with proper technique' },
    { icon: Target, key: 'Modern equipment and inventory' },
    { icon: Trophy, key: 'Competition preparation' }
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
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0
    }
  };

  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
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
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              {t('about.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('about.text')}
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            transition={{ duration: 0.8 }}
          >
            {tArray('about.features').map((feature, index) => {
              const IconComponent = features[index]?.icon || Target;
              
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  <div className="bg-gradient-card rounded-xl p-6 h-full border border-border hover:border-primary/30 transition-all duration-300 shadow-card hover:shadow-boxing">
                    <motion.div
                      className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <IconComponent size={24} />
                    </motion.div>
                    
                    <p className="text-foreground font-medium leading-relaxed">
                      {feature}
                    </p>
                    
                    {/* Boxing glove accent */}
                    <motion.div
                      className="absolute top-2 right-2 text-boxing-gold/20 text-2xl"
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      🥊
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
            transition={{ duration: 0.8 }}
          >
            <CTA variant="secondary" size="lg" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};