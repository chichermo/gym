import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700 rounded';
  
  const getClasses = () => {
    switch (variant) {
      case 'text':
        return `${baseClasses} h-4`;
      case 'circular':
        return `${baseClasses} rounded-full`;
      case 'rectangular':
      default:
        return baseClasses;
    }
  };

  const style = {
    width: width,
    height: height,
  };

  return (
    <motion.div
      className={`${getClasses()} ${className}`}
      style={style}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Componentes específicos
export const SkeletonCard: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1">
        <Skeleton variant="text" className="mb-2" />
        <Skeleton variant="text" className="w-3/4" />
      </div>
    </div>
    <Skeleton variant="rectangular" height={100} className="mb-4" />
    <div className="space-y-2">
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  </div>
);

export const SkeletonList: React.FC = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton variant="text" className="mb-2" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
        <Skeleton variant="circular" width={24} height={24} />
      </div>
    ))}
  </div>
);

export const SkeletonGrid: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default Skeleton; 