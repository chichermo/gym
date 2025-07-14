import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target, 
  Activity,
  Zap,
  Heart
} from 'lucide-react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

interface AnalyticsData {
  weeklyProgress: {
    labels: string[];
    workouts: number[];
    calories: number[];
    steps: number[];
  };
  monthlyStats: {
    totalWorkouts: number;
    totalCalories: number;
    totalSteps: number;
    averageHeartRate: number;
    longestStreak: number;
  };
  goals: {
    weeklyWorkouts: number;
    weeklyCalories: number;
    weeklySteps: number;
    progress: {
      workouts: number;
      calories: number;
      steps: number;
    };
  };
}

const AdvancedCharts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'goals'>('weekly');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    weeklyProgress: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      workouts: [3, 2, 4, 1, 3, 5, 2],
      calories: [450, 320, 580, 280, 420, 650, 380],
      steps: [8500, 7200, 10200, 6500, 8900, 12500, 7800]
    },
    monthlyStats: {
      totalWorkouts: 67,
      totalCalories: 2840,
      totalSteps: 125000,
      averageHeartRate: 142,
      longestStreak: 12
    },
    goals: {
      weeklyWorkouts: 5,
      weeklyCalories: 2500,
      weeklySteps: 50000,
      progress: {
        workouts: 3,
        calories: 1800,
        steps: 32000
      }
    }
  });

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'from-emerald-500 to-teal-600';
    if (percentage >= 60) return 'from-blue-500 to-indigo-600';
    if (percentage >= 40) return 'from-amber-500 to-orange-600';
    return 'from-rose-500 to-pink-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Analytics Avanzados
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Analiza tu progreso y rendimiento
            </p>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'weekly', label: 'Semanal', icon: Calendar },
            { id: 'monthly', label: 'Mensual', icon: TrendingUp },
            { id: 'goals', label: 'Metas', icon: Target }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Contenido de tabs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'weekly' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gráfico de entrenamientos semanales */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-700/50"
              >
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                  Entrenamientos Semanales
                </h3>
                <div className="space-y-4">
                  {analyticsData.weeklyProgress.labels.map((day, index) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300 w-12">
                        {day}
                      </span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(analyticsData.weeklyProgress.workouts[index] / 5) * 100}%` }}
                            transition={{ delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-white w-8 text-right">
                        {analyticsData.weeklyProgress.workouts[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Gráfico de calorías semanales */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-700/50"
              >
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                  Calorías Quemadas
                </h3>
                <div className="space-y-4">
                  {analyticsData.weeklyProgress.labels.map((day, index) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300 w-12">
                        {day}
                      </span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(analyticsData.weeklyProgress.calories[index] / 700) * 100}%` }}
                            transition={{ delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-white w-12 text-right">
                        {analyticsData.weeklyProgress.calories[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'monthly' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Total Entrenamientos',
                  value: analyticsData.monthlyStats.totalWorkouts,
                  icon: Activity,
                  color: 'from-blue-500 to-indigo-600'
                },
                {
                  title: 'Calorías Totales',
                  value: analyticsData.monthlyStats.totalCalories,
                  icon: Zap,
                  color: 'from-emerald-500 to-teal-600'
                },
                {
                  title: 'Pasos Totales',
                  value: analyticsData.monthlyStats.totalSteps.toLocaleString(),
                  icon: TrendingUp,
                  color: 'from-purple-500 to-pink-600'
                },
                {
                  title: 'Frecuencia Cardíaca Promedio',
                  value: `${analyticsData.monthlyStats.averageHeartRate} BPM`,
                  icon: Heart,
                  color: 'from-rose-500 to-pink-600'
                },
                {
                  title: 'Racha Más Larga',
                  value: `${analyticsData.monthlyStats.longestStreak} días`,
                  icon: Target,
                  color: 'from-amber-500 to-orange-600'
                }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-700/50"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      {stat.title}
                    </h3>
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-300">
                      {stat.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="space-y-6">
              {[
                {
                  title: 'Entrenamientos Semanales',
                  current: analyticsData.goals.progress.workouts,
                  target: analyticsData.goals.weeklyWorkouts,
                  icon: Activity,
                  color: 'from-blue-500 to-indigo-600'
                },
                {
                  title: 'Calorías Semanales',
                  current: analyticsData.goals.progress.calories,
                  target: analyticsData.goals.weeklyCalories,
                  icon: Zap,
                  color: 'from-emerald-500 to-teal-600'
                },
                {
                  title: 'Pasos Semanales',
                  current: analyticsData.goals.progress.steps,
                  target: analyticsData.goals.weeklySteps,
                  icon: TrendingUp,
                  color: 'from-purple-500 to-pink-600'
                }
              ].map((goal, index) => {
                const Icon = goal.icon;
                const percentage = getProgressPercentage(goal.current, goal.target);
                return (
                  <motion.div
                    key={goal.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-700/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${goal.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                            {goal.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800 dark:text-white">
                          {Math.round(percentage)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(percentage)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdvancedCharts; 