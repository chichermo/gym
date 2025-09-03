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
        scale: 1.05, 
        y: -5,
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
      initial={{ opacity: 0, y: 30 }}
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
        scale: 1.1, 
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
  onClick?: () => void;
  asButton?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  delay = 0, 
  className = "",
  onClick,
  asButton = true
}) => {
  const buttonProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      duration: 0.4, 
      delay: delay,
      ease: "easeOut"
    },
    whileHover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    whileTap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    onClick: onClick,
    className: className
  };

  if (asButton) {
    return (
      <motion.button {...buttonProps}>
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div {...buttonProps}>
      {children}
    </motion.div>
  );
};

interface AnimatedProgressProps {
  progress: number;
  delay?: number;
  className?: string;
}

const AnimatedProgress: React.FC<AnimatedProgressProps> = ({ 
  progress, 
  delay = 0, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ 
        duration: 1, 
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    />
  );
};

export { 
  AnimatedCard, 
  AnimatedText, 
  AnimatedIcon, 
  AnimatedButton, 
  AnimatedProgress 
};
