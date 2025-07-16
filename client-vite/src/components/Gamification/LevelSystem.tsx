import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Zap, Target, Award, Crown } from 'lucide-react';

interface Level {
  level: number;
  name: string;
  xpRequired: number;
  rewards: string[];
  icon: React.ReactNode;
  color: string;
}

interface LevelSystemProps {
  currentXP: number;
  onLevelUp?: (newLevel: number) => void;
}

const LevelSystem: React.FC<LevelSystemProps> = ({ currentXP, onLevelUp }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const levels: Level[] = [
    {
      level: 1,
      name: 'Principiante',
      xpRequired: 0,
      rewards: ['Acceso a rutinas básicas'],
      icon: <Star className="w-6 h-6" />,
      color: 'from-gray-400 to-gray-600'
    },
    {
      level: 2,
      name: 'Entusiasta',
      xpRequired: 100,
      rewards: ['Rutinas intermedias', 'Tracking de peso'],
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-400 to-green-600'
    },
    {
      level: 3,
      name: 'Dedicado',
      xpRequired: 300,
      rewards: ['Rutinas avanzadas', 'Analytics básicos'],
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-400 to-blue-600'
    },
    {
      level: 4,
      name: 'Atleta',
      xpRequired: 600,
      rewards: ['Rutinas personalizadas', 'Analytics completos'],
      icon: <Award className="w-6 h-6" />,
      color: 'from-purple-400 to-purple-600'
    },
    {
      level: 5,
      name: 'Elite',
      xpRequired: 1000,
      rewards: ['IA personalizada', 'Comunidad premium'],
      icon: <Crown className="w-6 h-6" />,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      level: 6,
      name: 'Leyenda',
      xpRequired: 1500,
      rewards: ['Todas las funciones', 'Mentor personal'],
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-red-400 to-red-600'
    }
  ];

  useEffect(() => {
    const newLevel = levels.find(level => currentXP >= level.xpRequired)?.level || 1;
    if (newLevel > currentLevel) {
      setCurrentLevel(newLevel);
      setShowLevelUp(true);
      onLevelUp?.(newLevel);
      
      // Auto-hide level up animation
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  }, [currentXP, currentLevel, onLevelUp]);

  const currentLevelData = levels.find(level => level.level === currentLevel);
  const nextLevelData = levels.find(level => level.level === currentLevel + 1);
  
  const xpProgress = nextLevelData 
    ? ((currentXP - currentLevelData!.xpRequired) / (nextLevelData.xpRequired - currentLevelData!.xpRequired)) * 100
    : 100;

  return (
    <div className="space-y-6">
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && currentLevelData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-3xl text-white text-center shadow-2xl"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">¡Nivel {currentLevel}!</h2>
              <p className="text-lg opacity-90">{currentLevelData.name}</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                {currentLevelData.icon}
                <span className="font-semibold">¡Nuevas recompensas desbloqueadas!</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Level Display */}
      <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 bg-gradient-to-br ${currentLevelData?.color} rounded-2xl shadow-lg`}>
            {currentLevelData?.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Nivel {currentLevel}</h3>
            <p className="text-gray-600">{currentLevelData?.name}</p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{currentXP} XP</span>
            <span>{nextLevelData?.xpRequired || 'Máximo'} XP</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center">
            {nextLevelData ? `${nextLevelData.xpRequired - currentXP} XP para el siguiente nivel` : '¡Nivel máximo alcanzado!'}
          </p>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Recompensas Desbloqueadas</h4>
        <div className="space-y-3">
          {currentLevelData?.rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 dark:text-green-200">{reward}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next Level Preview */}
      {nextLevelData && (
        <div className="bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Próximo Nivel</h4>
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-gradient-to-br ${nextLevelData.color} rounded-xl shadow-lg`}>
              {nextLevelData.icon}
            </div>
            <div>
              <h5 className="font-semibold text-gray-800">Nivel {nextLevelData.level} - {nextLevelData.name}</h5>
              <p className="text-sm text-gray-600">Recompensas próximas:</p>
              <ul className="text-sm text-gray-600 mt-1">
                {nextLevelData.rewards.map((reward, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    {reward}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelSystem; 