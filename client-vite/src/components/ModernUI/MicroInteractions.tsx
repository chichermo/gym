import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Heart, Star, Zap, Target, Trophy, 
  CheckCircle, X, Plus, Minus, Play, Pause
} from 'lucide-react';

interface MicroInteractionsProps {
  type: 'like' | 'star' | 'progress' | 'toggle' | 'pulse' | 'ripple';
  initialState?: boolean;
  onStateChange?: (state: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  children?: React.ReactNode;
}

const MicroInteractions: React.FC<MicroInteractionsProps> = ({
  type,
  initialState = false,
  onStateChange,
  size = 'md',
  color = '#3b82f6',
  children
}) => {
  const [isActive, setIsActive] = useState(initialState);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);
  const springScale = useSpring(scale, { stiffness: 300, damping: 20 });
  const springRotate = useSpring(rotate, { stiffness: 300, damping: 20 });

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const getIcon = () => {
    switch (type) {
      case 'like':
        return <Heart className={iconSizes[size]} fill={isActive ? color : 'none'} />;
      case 'star':
        return <Star className={iconSizes[size]} fill={isActive ? color : 'none'} />;
      case 'progress':
        return <Target className={iconSizes[size]} />;
      case 'toggle':
        return isActive ? <Pause className={iconSizes[size]} /> : <Play className={iconSizes[size]} />;
      case 'pulse':
        return <Zap className={iconSizes[size]} />;
      case 'ripple':
        return <Trophy className={iconSizes[size]} />;
      default:
        return <CheckCircle className={iconSizes[size]} />;
    }
  };

  const handleClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    onStateChange?.(newState);

    // Efectos específicos por tipo
    switch (type) {
      case 'like':
        // Efecto de corazón
        scale.set(1.3);
        setTimeout(() => scale.set(1), 200);
        createParticles();
        break;
      case 'star':
        // Efecto de estrella
        rotate.set(360);
        setTimeout(() => rotate.set(0), 500);
        createParticles();
        break;
      case 'progress':
        // Efecto de progreso
        scale.set(1.2);
        setTimeout(() => scale.set(1), 300);
        break;
      case 'toggle':
        // Efecto de toggle
        scale.set(0.8);
        setTimeout(() => scale.set(1), 150);
        break;
      case 'pulse':
        // Efecto de pulso
        scale.set(1.4);
        setTimeout(() => scale.set(1), 400);
        createParticles();
        break;
      case 'ripple':
        // Efecto de ripple
        createRippleEffect();
        break;
    }
  };

  const createParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const createRippleEffect = () => {
    // Efecto de ondas concéntricas
    const ripples = document.querySelectorAll('.ripple');
    ripples.forEach(ripple => ripple.remove());
    
    const button = document.querySelector('.ripple-button');
    if (button) {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('div');
      ripple.className = 'ripple absolute rounded-full bg-white/30 animate-ping';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.width = '0';
      ripple.style.height = '0';
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.opacity = '0';
      }, 10);
      
      setTimeout(() => ripple.remove(), 600);
    }
  };

  return (
    <div className="relative">
      <motion.button
        style={{
          scale: springScale,
          rotate: springRotate
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className={`${sizeClasses[size]} ripple-button relative flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden`}
      >
        <motion.div
          animate={{
            color: isActive ? color : '#6b7280'
          }}
          transition={{ duration: 0.2 }}
        >
          {getIcon()}
        </motion.div>

        {/* Partículas */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 1, 
                scale: 0 
              }}
              animate={{ 
                x: particle.x, 
                y: particle.y, 
                opacity: 0, 
                scale: 1 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </AnimatePresence>

        {/* Efecto de brillo */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isActive ? 1 : 0, 
            scale: isActive ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </motion.button>

      {/* Indicador de estado */}
      {type === 'progress' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isActive ? 1 : 0 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </div>
  );
};

// Componente de botón con efectos de hover avanzados
export const HoverButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, onClick, variant = 'primary', size = 'md' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    secondary: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
    ghost: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition-all duration-200 relative overflow-hidden`}
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '0%' : '-100%' }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Componente de carga con animación
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-full h-full border-2 border-gray-300 border-t-blue-500 rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
      />
    </div>
  );
};

// Componente de notificación con animación
export const AnimatedNotification: React.FC<{
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}> = ({ message, type = 'info', onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    warning: <Star className="w-5 h-5" />,
    info: <Zap className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      className={`${colors[type]} text-white p-4 rounded-lg shadow-lg flex items-center gap-3`}
    >
      {icons[type]}
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default MicroInteractions; 