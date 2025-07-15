import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  color?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  color = 'text-slate-800 dark:text-white'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <CountUp
        end={end}
        duration={duration}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        className={`text-3xl font-bold ${color}`}
        enableScrollSpy
        scrollSpyOnce
      />
    </motion.div>
  );
};

export default AnimatedCounter; 