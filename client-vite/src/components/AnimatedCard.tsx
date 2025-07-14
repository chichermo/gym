import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  hover?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '', 
  delay = 0, 
  onClick,
  hover = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={hover ? {
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      onClick={onClick}
      className={`
        backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 
        border border-white/20 dark:border-slate-700/50 
        rounded-3xl shadow-xl hover:shadow-2xl
        transition-all duration-300 cursor-pointer
        ${onClick ? 'hover:cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 