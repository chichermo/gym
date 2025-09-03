import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ModernBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
}

const ModernBadge: React.FC<ModernBadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
    info: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    glass: 'glass text-white border border-white/20'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const clickableClasses = onClick ? 'cursor-pointer hover:scale-105' : '';
  
  const badgeClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${clickableClasses} ${className}`;

  return (
    <div className={badgeClasses} onClick={onClick}>
      {Icon && iconPosition === 'left' && (
        <Icon className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'} mr-1`} />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'} ml-1`} />
      )}
    </div>
  );
};

export default ModernBadge; 