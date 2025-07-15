import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap } from 'lucide-react';

interface ConfettiCelebrationProps {
  isActive: boolean;
  onComplete?: () => void;
  achievement?: string;
  xpGained?: number;
}

const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({
  isActive,
  onComplete,
  achievement,
  xpGained
}) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={200}
            colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
            onConfettiComplete={onComplete}
          />
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.5
            }}
            className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50 max-w-md mx-4 text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              ¡Logro Desbloqueado!
            </h2>
            
            {achievement && (
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                {achievement}
              </p>
            )}
            
            {xpGained && (
              <div className="flex items-center justify-center gap-2 mb-6">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                  +{xpGained} XP
                </span>
              </div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              ¡Continuar!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiCelebration; 