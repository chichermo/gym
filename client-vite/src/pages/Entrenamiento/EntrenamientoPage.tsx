import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  BarChart3, 
  Plus, 
  Trophy, 
  Clock, 
  Target,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

const EntrenamientoPage: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Tus entrenamientos',
      description: 'Histórico de rutinas realizadas',
      icon: Calendar,
      color: 'blue',
      href: '/entrenamientos',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Tus registros',
      description: 'Histórico y gráficas por grupo muscular',
      icon: BarChart3,
      color: 'green',
      href: '/registros',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Crea tu workout',
      description: 'Arma tu rutina personalizada',
      icon: Plus,
      color: 'purple',
      href: '/workouts',
      gradient: 'from-purple-500 to-purple-600',
      featured: true
    },
    {
      title: 'Trofeos',
      description: 'Logros y medallas',
      icon: Trophy,
      color: 'yellow',
      href: '/trofeos',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Progreso',
      description: 'Seguimiento de objetivos',
      icon: TrendingUp,
      color: 'indigo',
      href: '/progress',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Comunidad',
      description: 'Conecta con otros atletas',
      icon: Users,
      color: 'pink',
      href: '/community',
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              Entrenamiento
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Elige tu próxima aventura fitness y construye la mejor versión de ti mismo
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="stats-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Tiempo total</p>
                <p className="text-2xl font-bold text-gray-900">24h 30m</p>
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Objetivos</p>
                <p className="text-2xl font-bold text-gray-900">3/5</p>
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Trofeos</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`card card-hover cursor-pointer group ${
                  item.featured ? 'ring-2 ring-purple-200 shadow-purple-100' : ''
                }`}
                onClick={() => navigate(item.href)}
              >
                <div className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-3 ${
                    item.featured ? 'text-gradient' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <span>Explorar</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>→</span>
                  </div>
                </div>
                
                {item.featured && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      DESTACADO
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿No sabes por dónde empezar?
            </h3>
            <p className="text-gray-600 mb-6">
              Nuestro sistema te recomendará el entrenamiento perfecto basado en tu nivel y objetivos
            </p>
            <button className="btn-primary">
              Obtener Recomendación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrenamientoPage; 