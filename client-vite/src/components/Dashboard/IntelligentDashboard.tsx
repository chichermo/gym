import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Target, Clock, 
  Flame, Heart, Zap, Trophy, AlertTriangle,
  CheckCircle, ArrowUp, ArrowDown, Star
} from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';
import { useNotifications } from '../../contexts/NotificationContext';

interface Insight {
  id: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  title: string;
  message: string;
  icon: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface Recommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'recovery' | 'goal';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
}

const IntelligentDashboard: React.FC = () => {
  const { userProgress, getProgressToNextLevel, getLevelInfo } = useGamification();
  const { addNotification } = useNotifications();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Generar insights basados en datos del usuario
  useEffect(() => {
    const newInsights: Insight[] = [];
    const newRecommendations: Recommendation[] = [];

    // Insight: Progreso de nivel
    const levelProgress = getProgressToNextLevel();
    if (levelProgress > 80) {
      newInsights.push({
        id: 'level_progress',
        type: 'positive',
        title: '¡Casi en el siguiente nivel!',
        message: `Estás al ${Math.round(levelProgress)}% del nivel ${userProgress.level + 1}`,
        icon: <TrendingUp className="w-5 h-5" />
      });
    }

    // Insight: Racha de entrenamientos
    if (userProgress.streaks.workout >= 7) {
      newInsights.push({
        id: 'streak_positive',
        type: 'positive',
        title: '¡Racha impresionante!',
        message: `${userProgress.streaks.workout} días consecutivos entrenando`,
        icon: <Flame className="w-5 h-5" />
      });
    } else if (userProgress.streaks.workout === 0) {
      newInsights.push({
        id: 'streak_negative',
        type: 'warning',
        title: '¿Listo para entrenar?',
        message: 'Ha pasado tiempo desde tu último entrenamiento',
        icon: <AlertTriangle className="w-5 h-5" />
      });
    }

    // Insight: Logros recientes
    const recentAchievements = userProgress.achievements.filter(a => 
      a.completed && a.unlockedAt && 
      new Date().getTime() - a.unlockedAt.getTime() < 7 * 24 * 60 * 60 * 1000
    );
    
    if (recentAchievements.length > 0) {
      newInsights.push({
        id: 'recent_achievements',
        type: 'positive',
        title: '¡Logros recientes!',
        message: `${recentAchievements.length} logro(s) desbloqueado(s) esta semana`,
        icon: <Trophy className="w-5 h-5" />
      });
    }

    // Recomendaciones basadas en datos
    if (userProgress.stats.totalWorkouts < 10) {
      newRecommendations.push({
        id: 'beginner_workouts',
        type: 'workout',
        title: 'Rutinas para Principiantes',
        description: 'Comienza con entrenamientos básicos para construir una base sólida',
        priority: 'high',
        icon: <Target className="w-5 h-5" />
      });
    }

    if (userProgress.streaks.workout > 0 && userProgress.streaks.workout < 3) {
      newRecommendations.push({
        id: 'consistency_tip',
        type: 'goal',
        title: 'Mantén la Consistencia',
        description: 'Estás construyendo un hábito. Continúa por al menos 21 días',
        priority: 'medium',
        icon: <CheckCircle className="w-5 h-5" />
      });
    }

    if (userProgress.stats.totalCalories < 1000) {
      newRecommendations.push({
        id: 'calorie_goal',
        type: 'nutrition',
        title: 'Establece Metas de Calorías',
        description: 'Define objetivos diarios de calorías para mejor seguimiento',
        priority: 'medium',
        icon: <Flame className="w-5 h-5" />
      });
    }

    setInsights(newInsights);
    setRecommendations(newRecommendations);
  }, [userProgress, getProgressToNextLevel, addNotification]);

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800';
      case 'negative':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800';
      default:
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Inteligente */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Dashboard Inteligente
            </h2>
            <p className="opacity-90">
              Nivel {userProgress.level} • {userProgress.totalXP} XP
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {getLevelInfo(userProgress.level).title}
            </div>
            <div className="text-sm opacity-90">
              {Math.round(getProgressToNextLevel())}% al siguiente nivel
            </div>
          </div>
        </div>
        
        {/* Barra de progreso */}
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-3">
            <motion.div 
              className="bg-white h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgressToNextLevel()}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Insights */}
      {insights.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Insights del Día
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <motion.div
                key={insight.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {insight.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {insight.message}
                    </p>
                    {insight.action && (
                      <button
                        onClick={insight.action.onClick}
                        className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {insight.action.label}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recomendaciones */}
      {recommendations.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Recomendaciones Personalizadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <motion.div
                key={rec.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {rec.title}
                      </h4>
                      {rec.priority === 'high' && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                          Alta
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Estadísticas Rápidas */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Calorías</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {userProgress.stats.totalCalories.toLocaleString()}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Entrenamientos</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {userProgress.stats.totalWorkouts}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Tiempo</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {Math.round(userProgress.stats.totalTime / 60)}h
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Logros</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {userProgress.achievements.filter(a => a.completed).length}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntelligentDashboard; 