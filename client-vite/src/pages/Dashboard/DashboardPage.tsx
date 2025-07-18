import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGamification } from '../../contexts/GamificationContext';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { useAI } from '../../contexts/AIContext';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Activity,
  Flame,
  Star,
  Trophy,
  Zap,
  Heart,
  Dumbbell,
  Calendar,
  Users,
  BarChart3,
  Play,
  Clock,
  CheckCircle,
  ArrowUp
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { level, totalXP, achievements } = useGamification();
  const { metrics } = useAnalytics();
  const { recommendations } = useAI();

  // Datos mock para las propiedades faltantes
  const recentActivity = [
    {
      title: 'Entrenamiento de Fuerza Completado',
      description: 'Rutina de piernas y glúteos',
      time: 'Hace 2 horas',
      xp: 150
    },
    {
      title: 'Meta Semanal Alcanzada',
      description: '5 entrenamientos esta semana',
      time: 'Hace 1 día',
      xp: 200
    },
    {
      title: 'Nuevo Logro Desbloqueado',
      description: 'Maestro de la Fuerza',
      time: 'Hace 3 días',
      xp: 100
    }
  ];

  const weeklyStats = {
    workouts: 5,
    totalTime: 8.5,
    calories: 4200,
    improvement: 15
  };

  const progressToNextLevel = ((totalXP % 1000) / 1000) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                ¡Hola, {user?.name || 'Atleta'}! 🏋️‍♂️
              </h1>
              <p className="text-xl opacity-90">
                Prepárate para otro día increíble de entrenamiento
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Dumbbell className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Nivel Actual</p>
              <p className="text-2xl font-bold text-gray-900">{level.level}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500">Progreso al siguiente nivel</span>
              <span className="font-medium text-blue-600">{Math.round(progressToNextLevel)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">XP Total</p>
              <p className="text-2xl font-bold text-gray-900">{totalXP.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600">¡Sigues mejorando!</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Logros</p>
              <p className="text-2xl font-bold text-gray-900">{achievements.length}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">Desbloqueados</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Esta Semana</p>
              <p className="text-2xl font-bold text-gray-900">{weeklyStats.workouts}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <ArrowUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">+{weeklyStats.improvement}% vs semana pasada</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-600" />
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                <Play className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Iniciar Entrenamiento</div>
                  <div className="text-sm opacity-90">Comienza tu rutina diaria</div>
                </div>
              </button>
              
              <button className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
                <Target className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Ver Progreso</div>
                  <div className="text-sm opacity-90">Revisa tus métricas</div>
                </div>
              </button>
              
              <button className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                <Trophy className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Ver Trofeos</div>
                  <div className="text-sm opacity-90">Desbloquea logros</div>
                </div>
              </button>
              
              <button className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105">
                <Users className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Comunidad</div>
                  <div className="text-sm opacity-90">Conecta con otros</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-600" />
              Actividad Reciente
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.title}</div>
                    <div className="text-sm text-gray-600">{activity.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{activity.time}</div>
                    <div className="text-xs text-blue-600">+{activity.xp} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Recommendations */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Recomendaciones IA
            </h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="font-medium text-gray-900 mb-2">{rec.title}</div>
                  <div className="text-sm text-gray-600">{rec.description}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-gray-500">Basado en tu progreso</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Stats */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Estadísticas Semanales
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Entrenamientos</span>
                <span className="font-semibold text-gray-900">{weeklyStats.workouts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tiempo Total</span>
                <span className="font-semibold text-gray-900">{weeklyStats.totalTime}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Calorías</span>
                <span className="font-semibold text-gray-900">{weeklyStats.calories}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Mejora</span>
                <span className="font-semibold text-green-600 flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" />
                  +{weeklyStats.improvement}%
                </span>
              </div>
            </div>
          </div>

          {/* Next Workout */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Próximo Entrenamiento
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Dumbbell className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Entrenamiento de Fuerza</div>
                  <div className="text-sm opacity-90">Piernas y Glúteos</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <div>
                  <div className="font-semibold">Duración</div>
                  <div className="text-sm opacity-90">45 minutos</div>
                </div>
              </div>
              <button className="w-full mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                Iniciar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 