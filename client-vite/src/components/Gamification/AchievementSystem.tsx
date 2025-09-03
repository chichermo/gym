import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Heart, 
  TrendingUp, 
  Calendar,
  Award,
  Crown,
  Flame
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'workout' | 'streak' | 'milestone' | 'social' | 'special';
  xpReward: number;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserStats {
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  totalMinutes: number;
}

const AchievementSystem: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-workout',
      title: 'Primer Entrenamiento',
      description: 'Completa tu primer entrenamiento',
      icon: Target,
      category: 'workout',
      xpReward: 50,
      isUnlocked: false,
      progress: 0,
      maxProgress: 1,
      rarity: 'common'
    },
    {
      id: 'week-streak',
      title: 'Semana de Fuego',
      description: 'Entrena 7 días consecutivos',
      icon: Flame,
      category: 'streak',
      xpReward: 200,
      isUnlocked: false,
      progress: 3,
      maxProgress: 7,
      rarity: 'rare'
    },
    {
      id: 'month-streak',
      title: 'Maestro de la Consistencia',
      description: 'Entrena 30 días consecutivos',
      icon: Crown,
      category: 'streak',
      xpReward: 500,
      isUnlocked: false,
      progress: 15,
      maxProgress: 30,
      rarity: 'epic'
    },
    {
      id: 'hundred-workouts',
      title: 'Centenario',
      description: 'Completa 100 entrenamientos',
      icon: Trophy,
      category: 'milestone',
      xpReward: 1000,
      isUnlocked: false,
      progress: 67,
      maxProgress: 100,
      rarity: 'legendary'
    },
    {
      id: 'social-butterfly',
      title: 'Mariposa Social',
      description: 'Conecta con 10 amigos',
      icon: Heart,
      category: 'social',
      xpReward: 150,
      isUnlocked: false,
      progress: 5,
      maxProgress: 10,
      rarity: 'rare'
    },
    {
      id: 'speed-demon',
      title: 'Demonio de la Velocidad',
      description: 'Completa un entrenamiento en menos de 20 minutos',
      icon: Zap,
      category: 'special',
      xpReward: 300,
      isUnlocked: false,
      progress: 0,
      maxProgress: 1,
      rarity: 'epic'
    }
  ]);

  const [userStats, setUserStats] = useState<UserStats>({
    totalXP: 1250,
    level: 8,
    currentStreak: 3,
    longestStreak: 12,
    totalWorkouts: 67,
    totalMinutes: 2840
  });

  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300';
      case 'legendary': return 'border-yellow-300';
      default: return 'border-gray-300';
    }
  };

  const unlockAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.isUnlocked) {
      const updatedAchievement = {
        ...achievement,
        isUnlocked: true,
        unlockedAt: new Date(),
        progress: achievement.maxProgress
      };
      
      setUnlockedAchievement(updatedAchievement);
      setShowUnlockAnimation(true);
      
      setAchievements(prev => 
        prev.map(a => a.id === achievementId ? updatedAchievement : a)
      );
      
      setUserStats(prev => ({
        ...prev,
        totalXP: prev.totalXP + achievement.xpReward
      }));
      
      setTimeout(() => setShowUnlockAnimation(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header con estadísticas del usuario */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Sistema de Logros
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Desbloquea logros y sube de nivel
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Nivel {userStats.level}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {userStats.totalXP} XP total
            </div>
          </div>
        </div>

        {/* Barra de progreso de nivel */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
            <span>Progreso al siguiente nivel</span>
            <span>{userStats.totalXP % 1000}/1000 XP</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(userStats.totalXP % 1000) / 10}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/60 dark:bg-slate-700/60 rounded-2xl">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {userStats.currentStreak}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Días seguidos
            </div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-slate-700/60 rounded-2xl">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {userStats.totalWorkouts}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Entrenamientos
            </div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-slate-700/60 rounded-2xl">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {userStats.longestStreak}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Racha más larga
            </div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-slate-700/60 rounded-2xl">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {Math.floor(userStats.totalMinutes / 60)}h
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Tiempo total
            </div>
          </div>
        </div>
      </motion.div>

      {/* Logros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`
                  relative p-6 rounded-3xl border-2 transition-all duration-300
                  ${achievement.isUnlocked 
                    ? 'bg-gradient-to-br from-white/90 to-green-50/90 dark:from-slate-800/90 dark:to-green-900/20 border-green-300 dark:border-green-600' 
                    : 'bg-gradient-to-br from-white/60 to-slate-50/60 dark:from-slate-800/60 dark:to-slate-700/60 border-slate-200 dark:border-slate-600'
                  }
                  ${getRarityBorder(achievement.rarity)}
                `}
              >
                {/* Badge de rareza */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} flex items-center justify-center`}>
                  <Star className="w-4 h-4 text-white" />
                </div>

                {/* Icono del logro */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Contenido */}
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {achievement.description}
                </p>

                {/* Progreso */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <span>Progreso</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className={`h-2 rounded-full ${
                        achievement.isUnlocked 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Recompensa XP */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {achievement.xpReward} XP
                    </span>
                  </div>
                  {achievement.isUnlocked && (
                    <div className="text-green-600 dark:text-green-400 text-sm font-semibold">
                      ¡Desbloqueado!
                    </div>
                  )}
                </div>

                {/* Botón de desbloqueo (solo para testing) */}
                {!achievement.isUnlocked && achievement.progress >= achievement.maxProgress && (
                  <button
                    onClick={() => unlockAchievement(achievement.id)}
                    className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Desbloquear
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Animación de desbloqueo */}
      <AnimatePresence>
        {showUnlockAnimation && unlockedAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                ¡Logro Desbloqueado!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {unlockedAchievement.title}
              </p>
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                +{unlockedAchievement.xpReward} XP
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementSystem; 