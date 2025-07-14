import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Zap, 
  Heart, 
  Clock, 
  Star,
  MessageCircle,
  Lightbulb,
  Activity,
  Dumbbell,
  Apple
} from 'lucide-react';

interface AIRecommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'motivation' | 'recovery' | 'goal';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  category: string;
  icon: React.ComponentType<any>;
  action?: string;
  data?: any;
}

interface UserProfile {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferences: string[];
  recentActivity: {
    workouts: number;
    calories: number;
    steps: number;
    sleepHours: number;
  };
  progress: {
    weight: number;
    strength: number;
    endurance: number;
  };
}

const AIRecommendations: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fitnessLevel: 'intermediate',
    goals: ['Perder peso', 'Ganar músculo', 'Mejorar resistencia'],
    preferences: ['Entrenamientos cortos', 'Ejercicios con peso corporal', 'Yoga'],
    recentActivity: {
      workouts: 4,
      calories: 2800,
      steps: 8500,
      sleepHours: 7.5
    },
    progress: {
      weight: 75,
      strength: 8,
      endurance: 7
    }
  });

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([
    {
      id: '1',
      type: 'workout',
      title: 'Entrenamiento de Fuerza Optimizado',
      description: 'Basado en tu progreso reciente, te recomiendo un entrenamiento de fuerza de 45 minutos enfocado en grupos musculares que necesitan más desarrollo.',
      confidence: 92,
      priority: 'high',
      category: 'Entrenamiento',
      icon: Dumbbell,
      action: 'Ver entrenamiento',
      data: {
        duration: 45,
        focus: ['Pecho', 'Espalda', 'Piernas'],
        intensity: 'Moderada'
      }
    },
    {
      id: '2',
      type: 'nutrition',
      title: 'Ajuste de Macronutrientes',
      description: 'Tu consumo de proteínas está por debajo del óptimo para tus objetivos de ganancia muscular. Te sugiero aumentar a 1.8g por kg de peso corporal.',
      confidence: 88,
      priority: 'high',
      category: 'Nutrición',
      icon: Apple,
      action: 'Ver plan nutricional',
      data: {
        currentProtein: 120,
        recommendedProtein: 135,
        sources: ['Pollo', 'Pescado', 'Huevos', 'Legumbres']
      }
    },
    {
      id: '3',
      type: 'recovery',
      title: 'Día de Recuperación Activa',
      description: 'Has entrenado 4 días consecutivos. Te recomiendo un día de recuperación activa con estiramientos y yoga suave.',
      confidence: 85,
      priority: 'medium',
      category: 'Recuperación',
      icon: Heart,
      action: 'Ver rutina de recuperación',
      data: {
        activities: ['Yoga suave', 'Estiramientos', 'Caminata ligera'],
        duration: 30
      }
    },
    {
      id: '4',
      type: 'motivation',
      title: 'Nuevo Desafío Personal',
      description: 'Estás cerca de alcanzar tu meta de 10,000 pasos diarios. Te propongo un desafío de 7 días para consolidar este hábito.',
      confidence: 78,
      priority: 'medium',
      category: 'Motivación',
      icon: Target,
      action: 'Aceptar desafío',
      data: {
        challenge: '7 días de 10,000 pasos',
        reward: '500 XP + Badge "Caminante Consistente"'
      }
    },
    {
      id: '5',
      type: 'goal',
      title: 'Ajuste de Objetivos',
      description: 'Tu progreso en resistencia es excelente. Considera agregar "Mejorar fuerza máxima" como nuevo objetivo.',
      confidence: 82,
      priority: 'low',
      category: 'Metas',
      icon: TrendingUp,
      action: 'Revisar objetivos',
      data: {
        currentGoals: ['Perder peso', 'Ganar músculo'],
        suggestedGoal: 'Mejorar fuerza máxima'
      }
    }
  ]);

  const [selectedRecommendation, setSelectedRecommendation] = useState<AIRecommendation | null>(null);
  const [aiInsights, setAiInsights] = useState({
    overallProgress: 78,
    nextMilestone: 'Alcanzar 80% de fuerza máxima',
    estimatedTimeToGoal: '3 semanas',
    riskFactors: ['Sueño insuficiente', 'Recuperación inadecuada'],
    opportunities: ['Aumentar intensidad', 'Optimizar nutrición']
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-600';
      case 'medium': return 'from-amber-500 to-orange-600';
      case 'low': return 'from-blue-500 to-indigo-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (confidence >= 80) return 'text-blue-600 dark:text-blue-400';
    if (confidence >= 70) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workout': return 'from-blue-500 to-indigo-600';
      case 'nutrition': return 'from-emerald-500 to-teal-600';
      case 'motivation': return 'from-purple-500 to-pink-600';
      case 'recovery': return 'from-rose-500 to-pink-600';
      case 'goal': return 'from-amber-500 to-orange-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header con IA Insights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                IA Fitness Coach
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Recomendaciones personalizadas basadas en tu progreso
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {aiInsights.overallProgress}%
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Progreso general
            </div>
          </div>
        </div>

        {/* Insights rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 dark:bg-slate-700/60 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-slate-800 dark:text-white">Próximo hito</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {aiInsights.nextMilestone}
            </p>
          </div>
          
          <div className="bg-white/60 dark:bg-slate-700/60 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold text-slate-800 dark:text-white">Tiempo estimado</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {aiInsights.estimatedTimeToGoal}
            </p>
          </div>
          
          <div className="bg-white/60 dark:bg-slate-700/60 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold text-slate-800 dark:text-white">Oportunidades</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {aiInsights.opportunities.length} mejoras identificadas
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recomendaciones principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {recommendations.slice(0, 4).map((recommendation, index) => {
            const Icon = recommendation.icon;
            return (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedRecommendation(recommendation)}
                className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-700/50 cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                {/* Header del recommendation */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${getTypeColor(recommendation.type)} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white">
                        {recommendation.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="capitalize">{recommendation.category}</span>
                        <span>•</span>
                        <span className={`font-semibold ${getConfidenceColor(recommendation.confidence)}`}>
                          {recommendation.confidence}% confianza
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getPriorityColor(recommendation.priority)} text-white text-xs font-semibold`}>
                    {recommendation.priority}
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {recommendation.description}
                </p>

                {/* Acción */}
                {recommendation.action && (
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold">
                    {recommendation.action}
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Análisis detallado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-700/50"
      >
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
          Análisis IA Detallado
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Factores de riesgo */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
              Factores de Riesgo
            </h4>
            <div className="space-y-2">
              {aiInsights.riskFactors.map((factor, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
                  <span className="text-rose-600 dark:text-rose-400">⚠️</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Oportunidades de mejora */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Oportunidades de Mejora
            </h4>
            <div className="space-y-2">
              {aiInsights.opportunities.map((opportunity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                  <span className="text-emerald-600 dark:text-emerald-400">💡</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{opportunity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal de recomendación detallada */}
      <AnimatePresence>
        {selectedRecommendation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedRecommendation(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getTypeColor(selectedRecommendation.type)} flex items-center justify-center`}>
                  <selectedRecommendation.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {selectedRecommendation.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedRecommendation.category} • {selectedRecommendation.confidence}% confianza
                  </p>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 mb-6">
                {selectedRecommendation.description}
              </p>

              {selectedRecommendation.data && (
                <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
                    Detalles de la Recomendación
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(selectedRecommendation.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-white">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold">
                  Aplicar Recomendación
                </button>
                <button 
                  onClick={() => setSelectedRecommendation(null)}
                  className="px-6 py-3 border-2 border-slate-300 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIRecommendations; 