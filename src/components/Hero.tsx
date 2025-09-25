import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { CTA } from './CTA';
import heroImage from '@/assets/boxing-hero.jpg';

/**
 * Hero section with boxing atmosphere and parallax effects
 */
export const Hero: React.FC = () => {
  const { t } = useI18n();
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -150]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Reduce motion for users who prefer it
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      id="hero"
      className="relative min-h-screen pb-28 md:pb-36 flex items-center justify-center overflow-hidden bg-boxing-dark"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={prefersReducedMotion ? {} : { y: y1 }}
      >
        {/* subtle dark vignette over the image */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/40 via-black/10 to-transparent" />
        <img
          src={heroImage}
          alt="Professional boxing gym atmosphere"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
      </motion.div>

      {/* Animated Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-boxing-gold rounded-full opacity-60"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        style={prefersReducedMotion ? {} : { y: y2, opacity }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block text-boxing-gold text-2xl sm:text-3xl lg:text-4xl font-medium mb-2">
            🥊
          </span>
          {t('hero.title')}
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl lg:text-3xl mb-8 text-gray-200 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Benefits */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-12 text-gray-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-boxing-gold">✓</span>
            <span className="text-sm sm:text-base">{t('hero.benefit1')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-boxing-gold">✓</span>
            <span className="text-sm sm:text-base">{t('hero.benefit2')}</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            type: 'spring',
            stiffness: 200,
          }}
        >
          <CTA variant="hero" size="lg" className="mb-6" />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator pinned to the bottom, single-line arrow */}
      {!prefersReducedMotion && (
        <motion.a
          href="#about"
          className="group absolute left-1/2 -translate-x-1/2 bottom-14 md:bottom-14 z-30"
          aria-label={t('hero.scroll') ?? 'Scroll to content'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.0, duration: 0.6 },
            y: { delay: 1.0, duration: 1.6, ease: 'easeInOut', repeat: Infinity },
          }}
        >
          <svg
            className="w-12 h-12 text-gray-300 group-hover:text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            aria-hidden="true"
          >
            {/* вертикальный шток */}
            <line x1="12" y1="5" x2="12" y2="15" />
            {/* наконечник */}
            <polyline points="7 10 12 15 17 10" />
          </svg>
        </motion.a>
      )}
    </section>
  );
};