import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  Dumbbell, BarChart, User, LogOut, Calendar, Activity, Info, 
  Flame, Trophy, Target, TrendingUp, Clock, Zap, Bell, Star,
  ArrowRight, Play, CheckCircle, Award, Target as TargetIcon
} from 'lucide-react';
import NavBar from '../../components/NavBar';
import { 
  currentUser, mockWorkouts, mockAchievements, mockNotifications, 
  mockRecommendations, workoutStats 
} from '../../data/mockData';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/profile', label: 'Perfil' },
  { to: '/workouts', label: 'Entrenamientos' },
  { to: '/progress', label: 'Progreso' },
];

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Datos del usuario (usando datos simulados)
  const userData = currentUser;
  const recentWorkouts = mockWorkouts.slice(0, 3);
  const recentAchievements = mockAchievements.filter(a => a.unlocked).slice(0, 3);
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;
  const highPriorityRecommendations = mockRecommendations.filter(r => r.priority === 'high');

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getLevelProgress = () => {
    const progress = (userData.xp / userData.nextLevelXp) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header del usuario */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">¡Hola, {userData.name.split(' ')[0]}!</h1>
                <p className="text-gray-600">Nivel {userData.level} • {userData.experience}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-orange-600">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-medium">{userData.streak} días</span>
                  </div>
                  <div className="flex items-center space-x-1 text-blue-600">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-medium">{userData.goal}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Barra de progreso de nivel */}
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Nivel {userData.level}</div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getLevelProgress()}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">{userData.xp} / {userData.nextLevelXp} XP</div>
            </div>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Entrenamientos</p>
                <p className="text-2xl font-bold text-gray-900">{userData.totalWorkouts}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Dumbbell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calorías</p>
                <p className="text-2xl font-bold text-gray-900">{userData.totalCalories.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Racha Actual</p>
                <p className="text-2xl font-bold text-gray-900">{userData.streak} días</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promedio Semanal</p>
                <p className="text-2xl font-bold text-gray-900">{workoutStats.weeklyAverage}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entrenamientos recientes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Entrenamientos Recientes</h2>
                <Link to="/workouts" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  Ver todos <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        workout.type === 'strength' ? 'bg-blue-100' :
                        workout.type === 'cardio' ? 'bg-green-100' :
                        workout.type === 'hiit' ? 'bg-orange-100' : 'bg-purple-100'
                      }`}>
                        <Dumbbell className={`w-5 h-5 ${
                          workout.type === 'strength' ? 'text-blue-600' :
                          workout.type === 'cardio' ? 'text-green-600' :
                          workout.type === 'hiit' ? 'text-orange-600' : 'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{workout.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDuration(workout.duration)}
                          </span>
                          <span className="flex items-center">
                            <Flame className="w-4 h-4 mr-1" />
                            {workout.calories} cal
                          </span>
                          {workout.rating && (
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-500" />
                              {workout.rating}/5
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {workout.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Play className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar con logros y notificaciones */}
          <div className="space-y-6">
            {/* Logros recientes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Logros Recientes</h2>
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              
              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{achievement.title}</h3>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                    <div className="text-xs text-yellow-600 font-medium">+{achievement.xpReward} XP</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notificaciones */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Notificaciones</h2>
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                {mockNotifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-1 rounded ${
                        notification.type === 'achievement' ? 'bg-yellow-100' :
                        notification.type === 'reminder' ? 'bg-blue-100' :
                        notification.type === 'progress' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        <Bell className={`w-4 h-4 ${
                          notification.type === 'achievement' ? 'text-yellow-600' :
                          notification.type === 'reminder' ? 'text-blue-600' :
                          notification.type === 'progress' ? 'text-green-600' : 'text-purple-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{notification.title}</h3>
                        <p className="text-xs text-gray-600">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recomendaciones de IA */}
        {highPriorityRecommendations.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recomendaciones de IA</h2>
              <div className="flex items-center space-x-2 text-blue-600">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Personalizadas</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highPriorityRecommendations.map((recommendation) => (
                <div key={recommendation.id} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TargetIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{recommendation.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          recommendation.priority === 'high' ? 'bg-red-100 text-red-700' :
                          recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {recommendation.priority === 'high' ? 'Alta prioridad' :
                           recommendation.priority === 'medium' ? 'Media prioridad' : 'Baja prioridad'}
                        </span>
                        <span className="text-xs text-gray-500">{recommendation.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 