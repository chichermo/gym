import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Heart, 
  Target, 
  Trophy, 
  TrendingUp, 
  Flame,
  Clock,
  Calendar,
  Zap,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Star,
  Award,
  Users,
  BarChart3
} from 'lucide-react';

interface FitnessStats {
  totalWorkouts: number;
  currentStreak: number;
  totalXP: number;
  level: number;
  caloriesBurned: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface RecentActivity {
  id: string;
  type: 'workout' | 'cardio' | 'achievement';
  title: string;
  description: string;
  time: string;
  xp: number;
  completed: boolean;
}

const FitnessDashboard: React.FC = () => {
  const [stats, setStats] = useState<FitnessStats>({
    totalWorkouts: 47,
    currentStreak: 12,
    totalXP: 8750,
    level: 8,
    caloriesBurned: 2840,
    weeklyGoal: 3000,
    weeklyProgress: 75
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'workout',
      title: 'Entrenamiento de Fuerza',
      description: 'Press de banco, sentadillas, peso muerto',
      time: 'Hace 2 horas',
      xp: 150,
      completed: true
    },
    {
      id: '2',
      type: 'cardio',
      title: 'Cardio HIIT',
      description: '30 minutos de entrenamiento intenso',
      time: 'Ayer',
      xp: 100,
      completed: true
    },
    {
      id: '3',
      type: 'achievement',
      title: '¡Nuevo Logro!',
      description: 'Completaste 10 entrenamientos esta semana',
      time: 'Hace 3 días',
      xp: 200,
      completed: true
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const calculateXPProgress = () => {
    const levelXP = stats.level * 1000;
    const currentLevelXP = (stats.level - 1) * 1000;
    const progress = ((stats.totalXP - currentLevelXP) / (levelXP - currentLevelXP)) * 100;
    return Math.min(progress, 100);
  };

  const calculateWeeklyProgress = () => {
    return (stats.weeklyProgress / 100) * 360;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Partículas animadas */}
      <div className="particles-bg"></div>
      
      {/* Partículas individuales */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        ></div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header del Dashboard */}
        <div className="mb-8 fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold text-white text-glow mb-4">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-xl text-white text-opacity-80">
            Prepárate para otro día increíble de entrenamiento
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Nivel y XP */}
          <div className="fitness-card slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stats.level}</div>
                <div className="text-sm text-white text-opacity-80">Nivel</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white text-opacity-80">XP</span>
                <span className="text-white font-semibold">{stats.totalXP}</span>
              </div>
              <div className="w-full h-3 bg-white bg-opacity-20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${calculateXPProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Entrenamientos */}
          <div className="fitness-card slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stats.totalWorkouts}</div>
                <div className="text-sm text-white text-opacity-80">Entrenamientos</div>
              </div>
            </div>
            <div className="text-sm text-white text-opacity-80">
              Racha actual: {stats.currentStreak} días
            </div>
          </div>

          {/* Calorías */}
          <div className="fitness-card slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stats.caloriesBurned}</div>
                <div className="text-sm text-white text-opacity-80">Calorías</div>
              </div>
            </div>
            <div className="text-sm text-white text-opacity-80">
              Esta semana
            </div>
          </div>

          {/* Progreso Semanal */}
          <div className="fitness-card slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stats.weeklyProgress}%</div>
                <div className="text-sm text-white text-opacity-80">Meta semanal</div>
              </div>
            </div>
            <div className="relative w-16 h-16 mx-auto">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray={`${calculateWeeklyProgress()}, 100`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="mb-8 slide-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-2xl font-bold text-white mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="action-btn group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">Vamos a Entrenar</div>
                    <div className="text-sm text-white text-opacity-80">Crea una rutina rápida</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>

            <button className="action-btn group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">Mi Programa</div>
                    <div className="text-sm text-white text-opacity-80">Gestiona tu plan</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>

            <button className="action-btn group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">Mi Progreso</div>
                    <div className="text-sm text-white text-opacity-80">Ver estadísticas</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl font-bold text-white mb-6">Actividad Reciente</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="fitness-card hover-lift"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    activity.type === 'workout' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                    activity.type === 'cardio' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                    'bg-gradient-to-r from-yellow-500 to-orange-500'
                  }`}>
                    {activity.type === 'workout' ? <Activity className="w-6 h-6 text-white" /> :
                     activity.type === 'cardio' ? <Heart className="w-6 h-6 text-white" /> :
                     <Star className="w-6 h-6 text-white" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{activity.title}</h3>
                        <p className="text-sm text-white text-opacity-80">{activity.description}</p>
                        <p className="text-xs text-white text-opacity-60">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-bold text-white">+{activity.xp}</span>
                        </div>
                        {activity.completed && (
                          <div className="text-xs text-green-400 mt-1">✓ Completado</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logros */}
        <div className="mt-8 slide-up" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-2xl font-bold text-white mb-6">Logros Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="fitness-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Racha de 12 días</h3>
              <p className="text-sm text-white text-opacity-80">¡Sigue así!</p>
            </div>

            <div className="fitness-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Meta semanal</h3>
              <p className="text-sm text-white text-opacity-80">75% completado</p>
            </div>

            <div className="fitness-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Comunidad</h3>
              <p className="text-sm text-white text-opacity-80">Conecta con otros</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessDashboard; 