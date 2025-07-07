import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Dumbbell, BarChart, User, LogOut, Calendar, Activity, Info, Flame, Trophy, TrendingUp, Target, Users, Clock, Zap } from 'lucide-react';
import NavBar from '../../components/NavBar';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/profile', label: 'Perfil' },
  { to: '/workouts', label: 'Entrenamientos' },
  { to: '/progress', label: 'Progreso' },
];

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: 'Entrenamientos esta semana',
      value: '5',
      change: '+2',
      changeType: 'positive',
      icon: Calendar,
      color: 'blue'
    },
    {
      title: 'Calorías quemadas',
      value: '2,450',
      change: '+320',
      changeType: 'positive',
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Objetivos cumplidos',
      value: '3/5',
      change: '+1',
      changeType: 'positive',
      icon: Target,
      color: 'purple'
    },
    {
      title: 'Trofeos ganados',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: Trophy,
      color: 'yellow'
    }
  ];

  const recentWorkouts = [
    {
      name: 'Entrenamiento de Pecho y Tríceps',
      date: 'Hoy',
      duration: '75 min',
      calories: '450 cal',
      status: 'completed'
    },
    {
      name: 'Cardio HIIT',
      date: 'Ayer',
      duration: '45 min',
      calories: '320 cal',
      status: 'completed'
    },
    {
      name: 'Entrenamiento de Espalda',
      date: 'Hace 2 días',
      duration: '60 min',
      calories: '380 cal',
      status: 'completed'
    }
  ];

  const upcomingWorkouts = [
    {
      name: 'Entrenamiento de Piernas',
      time: '18:00',
      type: 'Fuerza'
    },
    {
      name: 'Yoga',
      time: '20:00',
      type: 'Flexibilidad'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg p-6">
      <div className="max-w-7xl mx-auto">
        <NavBar />
        {/* Banner Demo */}
        <div className="w-full bg-gradient-to-r from-yellow-200 via-yellow-50 to-yellow-100 border-b border-yellow-300 py-2 px-4 flex items-center justify-center">
          <Info className="w-5 h-5 text-yellow-600 mr-2" />
          <span className="text-yellow-800 text-sm font-medium">Modo DEMO: Estás viendo datos simulados. ¡Explora libremente!</span>
        </div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">¡Bienvenido de vuelta!</h1>
          <p className="text-gray-600 text-lg">Aquí tienes un resumen de tu progreso fitness</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stats-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs semana pasada</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${
                    stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    stat.color === 'green' ? 'from-green-500 to-green-600' :
                    stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-yellow-500 to-yellow-600'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Workouts */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Entrenamientos Recientes</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">Ver todos</button>
              </div>
              <div className="space-y-4">
                {recentWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                        <p className="text-sm text-gray-500">{workout.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{workout.duration}</p>
                      <p className="text-sm text-gray-500">{workout.calories}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Upcoming */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Iniciar Entrenamiento</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Ver Objetivos</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Mis Trofeos</span>
                </button>
              </div>
            </div>

            {/* Upcoming Workouts */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Próximos Entrenamientos</h2>
              <div className="space-y-3">
                {upcomingWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{workout.name}</h3>
                      <p className="text-sm text-gray-500">{workout.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">{workout.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak Card */}
            <div className="card p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">¡Racha de 7 días!</h3>
                  <p className="text-sm text-gray-600">Mantén la consistencia</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full py-4 bg-gradient-to-r from-blue-100 via-indigo-100 to-white text-center text-gray-500 text-sm border-t">
        &copy; {new Date().getFullYear()} Fitness App · Hecho con <span className="text-pink-500">♥</span> por tu equipo
      </footer>
    </div>
  );
};

export default DashboardPage; 