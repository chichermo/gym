import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NeoStreamingLayoutProps {
  children: React.ReactNode;
}

const NeoStreamingLayout: React.FC<NeoStreamingLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Efectos de partículas dinámicas
  useEffect(() => {
    const particles = document.querySelectorAll('.neo-particle');
    particles.forEach((particle, index) => {
      const delay = index * 0.1;
      particle.animate([
        { transform: 'translateY(0px) scale(1)', opacity: 0 },
        { transform: 'translateY(-20px) scale(1.2)', opacity: 1 },
        { transform: 'translateY(-40px) scale(0.8)', opacity: 0 }
      ], {
        duration: 3000,
        delay: delay * 1000,
        iterations: Infinity
      });
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
                          <div className="text-white text-lg font-semibold mb-2">BRO FIT Neo</div>
          <div className="text-cyan-300 text-sm">Inicializando sistema...</div>
          
          {/* Loading bar */}
          <div className="mt-4 w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Fondo dinámico con partículas */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Partículas flotantes */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="neo-particle absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
          
          {/* Líneas de energía */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full opacity-10">
              <defs>
                <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path
                d="M0,50 Q25,25 50,50 T100,50"
                stroke="url(#energyGradient)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Contenido principal con animaciones */}
      <AnimatePresence mode="wait">
        <motion.div
          key="neo-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Efectos de borde energético */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse" />
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-pulse" />
      </div>

      {/* Indicadores de estado del sistema */}
      <div className="fixed top-4 left-4 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs font-mono">SISTEMA NEO ACTIVO</span>
        </div>
      </div>

      {/* Contador de rendimiento */}
      <div className="fixed top-4 right-4 z-20">
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-2 border border-white/10">
          <div className="text-white text-xs font-mono">
            FPS: {Math.floor(Math.random() * 10) + 55}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeoStreamingLayout; 