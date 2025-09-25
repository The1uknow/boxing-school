import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface CTAProps {
  variant?: 'primary' | 'secondary' | 'hero';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TG_BOT_URL = import.meta.env.VITE_TG_BOT_URL || 'https://t.me/boxing_school_tashkent_bot';
const PHONE_NUMBER = '+998903173808';

/**
 * Reusable CTA component with boxing-themed animations
 * All CTAs lead to Telegram bot with fallback to phone call
 */
export const CTA: React.FC<CTAProps> = ({ 
  variant = 'primary', 
  size = 'md',
  className 
}) => {
  const { t } = useI18n();

  const handleClick = () => {
    // Try to open Telegram bot
    const link = document.createElement('a');
    link.href = TG_BOT_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Fallback to phone if Telegram fails
    link.onerror = () => {
      window.location.href = `tel:${PHONE_NUMBER}`;
    };
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const variants = {
    primary: 'bg-gradient-cta text-white shadow-boxing hover:shadow-glow border-0',
    secondary: 'bg-gradient-card text-foreground border border-primary/20 hover:border-primary/40',
    hero: 'bg-gradient-cta text-white shadow-glow hover:shadow-boxing scale-110 border-0 font-bold'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        'relative rounded-lg font-medium transition-all duration-300',
        'focus:outline-none focus:ring-4 focus:ring-primary/20',
        'overflow-hidden group',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ 
        scale: variant === 'hero' ? 1.05 : 1.02,
        transition: { type: 'spring', stiffness: 400 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { type: 'spring', stiffness: 400 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-boxing-red-dark via-primary to-boxing-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
      
      {/* Impact ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        whileHover={{
          boxShadow: [
            '0 0 0 0 hsl(var(--boxing-red) / 0.7)',
            '0 0 0 10px hsl(var(--boxing-red) / 0)',
          ],
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      
      {/* Button text */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {t('cta')}
        <motion.span
          className="text-lg"
          animate={{ x: [0, 3, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: 'easeInOut'
          }}
        >
          👊
        </motion.span>
      </span>
    </motion.button>
  );
};