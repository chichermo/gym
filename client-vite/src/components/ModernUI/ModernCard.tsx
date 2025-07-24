import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ModernCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  gradient?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'fitness' | 'stats' | 'action';
}

const ModernCard: React.FC<ModernCardProps> = ({
  title,
  description,
  icon: Icon,
  gradient = 'from-blue-500 to-cyan-500',
  children,
  onClick,
  className = '',
  variant = 'default'
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-300 cursor-pointer';
  
  const variantClasses = {
    default: 'fitness-card',
    fitness: 'fitness-card',
    stats: 'stats-card hover-lift',
    action: 'action-btn'
  };

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Efecto de fondo animado */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Contenido */}
      <div className="relative z-10">
        {/* Header con icono */}
        {(Icon || title) && (
          <div className="flex items-center gap-4 mb-4">
            {Icon && (
              <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              {description && (
                <p className="text-sm text-gray-300 mt-1">{description}</p>
              )}
            </div>
          </div>
        )}
        
        {/* Contenido personalizado */}
        {children}
      </div>
      
      {/* Efecto de borde superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

export default ModernCard; 