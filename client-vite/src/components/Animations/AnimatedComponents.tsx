import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  hover?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  delay = 0, 
  className = "",
  hover = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: "easeOut"
      }}
      whileHover={hover ? { 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2 }
      } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  children, 
  delay = 0, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedIconProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  children, 
  delay = 0, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: "backOut"
      }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 5,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedButtonProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  asButton?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  delay = 0, 
  className = "",
  asButton = true
}) => {
  const Component = asButton ? motion.button : motion.div;
  
  return (
    <Component
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.3, 
        delay: delay,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className={className}
    >
      {children}
    </Component>
  );
};

interface AnimatedListProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedList: React.FC<AnimatedListProps> = ({ 
  children, 
  delay = 0, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedProgressProps {
  progress: number;
  delay?: number;
  className?: string;
  color?: string;
}

const AnimatedProgress: React.FC<AnimatedProgressProps> = ({ 
  progress, 
  delay = 0, 
  className = "",
  color = "bg-blue-500"
}) => {
  return (
    <div className={`w-full bg-gray-700 rounded-full h-2 ${className}`}>
      <motion.div
        className={`${color} h-2 rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ 
          duration: 1, 
          delay: delay,
          ease: "easeOut"
        }}
      />
    </div>
  );
};

interface AnimatedCounterProps {
  value: number;
  delay?: number;
  className?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  delay = 0, 
  className = "",
  duration = 2
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: "backOut"
      }}
      className={className}
    >
      <motion.span
        initial={{ number: 0 }}
        animate={{ number: value }}
        transition={{ 
          duration: duration, 
          delay: delay + 0.3,
          ease: "easeOut"
        }}
      >
        {Math.round(value)}
      </motion.span>
    </motion.span>
  );
};

export {
  AnimatedCard,
  AnimatedText,
  AnimatedIcon,
  AnimatedButton,
  AnimatedList,
  AnimatedProgress,
  AnimatedCounter
};
