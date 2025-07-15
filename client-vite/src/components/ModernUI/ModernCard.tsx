import React from 'react';

interface ModernCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'glass' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
}

const ModernCard: React.FC<ModernCardProps> = ({
  title,
  subtitle,
  children,
  variant = 'default',
  size = 'md',
  hover = true,
  className = ''
}) => {
  const baseClasses = "card-modern transition-all duration-300";
  
  const variantClasses = {
    default: "bg-white border-gray-200",
    gradient: "bg-gradient-to-br from-primary-500 to-purple-500 text-white",
    glass: "glass-effect border-white/20",
    success: "bg-success-50 border-success-200 text-success-800",
    warning: "bg-warning-50 border-warning-200 text-warning-800",
    danger: "bg-danger-50 border-danger-200 text-danger-800"
  };
  
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };
  
  const hoverClasses = hover ? "hover-lift" : "";
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses} ${className}`;

  return (
    <div className={classes}>
      <div className="space-y-2">
        <h3 className="text-heading font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-body text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
};

export default ModernCard; 