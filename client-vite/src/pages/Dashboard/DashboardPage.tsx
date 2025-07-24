import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGamification } from '../../contexts/GamificationContext';
import { useExperience } from '../../contexts/ExperienceContext';
import { 
  TrendingUp, 
  Target, 
  Flame,
  Star,
  Trophy,
  Dumbbell,
  Users,
  BarChart3,
  Play,
  Clock,
  ArrowUp,
  Crown,
  Medal,
  Target as TargetIcon,
  Eye,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { totalXP, achievements } = useGamification();
  const { userLevel } = useExperience();
  const navigate = useNavigate();

  // Datos mock para las propiedades faltantes
  const recentActivity = [
    {
      title: 'Entrenamiento de Fuerza Completado',
      description: 'Rutina de piernas y glúteos',
      time: 'Hace 2 horas',
      xp: 150,
      type: 'workout',
      icon: Dumbbell
    },
    {
      title: 'Meta Semanal Alcanzada',
      description: '5 entrenamientos esta semana',
      time: 'Hace 1 día',
      xp: 200,
      type: 'achievement',
      icon: Trophy
    },
    {
      title: 'Nuevo Logro Desbloqueado',
      description: 'Maestro de la Fuerza',
      time: 'Hace 3 días',
      xp: 100,
      type: 'achievement',
      icon: Medal
    }
  ];

  const weeklyStats = {
    workouts: 5,
    totalTime: 8.5,
    calories: 4200,
    improvement: 15
  };

  // Usar el sistema de XP real
  const progressToNextLevel = userLevel.progress;

  return (
    <div className="space-y-8">
      {/* Header con saludo personalizado */}
      <div className="fitness-card">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              ¡Hola, {user?.name || 'Atleta'}! 🏋️‍♂️
            </h1>
            <p className="text-gray-300 text-lg">
              Prepárate para otro día increíble de entrenamiento
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300 font-medium">Online</span>
              </div>
              <div className="text-sm text-gray-400">
                Última actividad: Hace 2 horas
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats-card hover-lift">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-300">Nivel Actual</p>
              <p className="text-2xl font-bold text-white">{userLevel.level}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressToNextLevel}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">{progressToNextLevel}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card hover-lift">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-300">Entrenamientos</p>
              <p className="text-2xl font-bold text-white">{weeklyStats.workouts}</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUp className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400">+{weeklyStats.improvement}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card hover-lift">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-300">Tiempo Total</p>
              <p className="text-2xl font-bold text-white">{weeklyStats.totalTime}h</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-400">Esta semana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card hover-lift">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-300">Calorías</p>
              <p className="text-2xl font-bold text-white">{weeklyStats.calories}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-400">Quemadas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de logros y XP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 fitness-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Progreso y Logros</h2>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-300">Nivel {userLevel.level}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Experiencia Total</p>
                  <p className="text-sm text-gray-400">{totalXP} XP</p>
                </div>
              </div>
                             <div className="text-right">
                 <p className="text-lg font-bold text-white">{userLevel.totalXP || 0}</p>
                 <p className="text-xs text-gray-400">XP actual</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-white">{achievements?.length || 0}</p>
                <p className="text-xs text-gray-400">Logros</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TargetIcon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-white">12</p>
                <p className="text-xs text-gray-400">Metas</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Medal className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-white">8</p>
                <p className="text-xs text-gray-400">Insignias</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fitness-card">
          <h2 className="text-xl font-bold text-white mb-6">Actividad Reciente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-200">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === 'workout' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    activity.type === 'achievement' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-400">{activity.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <span className="text-xs text-green-400">+{activity.xp} XP</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recomendaciones de IA */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recomendaciones IA</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">En tiempo real</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-white">Entrenamiento Sugerido</span>
            </div>
            <p className="text-sm text-gray-300 mb-3">
              Basado en tu progreso, te recomendamos un entrenamiento de fuerza para piernas
            </p>
            <button className="btn-modern w-full">
              Ver Entrenamiento
            </button>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-white">Meta Personalizada</span>
            </div>
            <p className="text-sm text-gray-300 mb-3">
              Establece una nueva meta de 3 entrenamientos esta semana
            </p>
            <button className="btn-modern w-full">
              Establecer Meta
            </button>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-white">Análisis de Progreso</span>
            </div>
            <p className="text-sm text-gray-300 mb-3">
              Tu fuerza ha mejorado un 15% en el último mes
            </p>
            <button className="btn-modern w-full">
              Ver Análisis
            </button>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/entrenamiento-programa">
          <button className="action-btn group">
            <div className="flex items-center gap-3">
              <Play className="w-5 h-5" />
              <span>Iniciar Entrenamiento</span>
            </div>
          </button>
        </Link>
        
        <Link to="/calendar">
          <button className="action-btn group">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5" />
              <span>Ver Calendario</span>
            </div>
          </button>
        </Link>
        
        <Link to="/community">
          <button className="action-btn group">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              <span>Comunidad</span>
            </div>
          </button>
        </Link>
        
        <Link to="/progress">
          <button className="action-btn group">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5" />
              <span>Ver Progreso</span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage; 