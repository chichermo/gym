import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Flame, 
  Heart, 
  Clock, 
  Trophy, 
  Zap,
  Play,
  Calendar,
  Users,
  BarChart3,
  Apple,
  Camera
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  // Datos mock para el dashboard
  const stats = [
    {
      title: "Entrenamientos",
      value: "24",
      change: "+12%",
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Calorías Quemadas",
      value: "2,847",
      change: "+8%",
      icon: Flame,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30"
    },
    {
      title: "Tiempo Activo",
      value: "18h",
      change: "+15%",
      icon: Clock,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30"
    },
    {
      title: "Logros",
      value: "12",
      change: "+3",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30"
    }
  ];

  const quickActions = [
    {
      title: "Iniciar Entrenamiento",
      description: "Comienza tu rutina diaria",
      icon: Play,
      link: "/entrenamiento-programa",
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      title: "Ver Progreso",
      description: "Revisa tus estadísticas",
      icon: TrendingUp,
      link: "/progress",
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Programar Entrenamiento",
      description: "Organiza tu semana",
      icon: Calendar,
      link: "/calendar",
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      title: "Comunidad",
      description: "Conecta con otros",
      icon: Users,
      link: "/community",
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    }
  ];

  const features = [
    {
      title: "Analíticas Avanzadas",
      description: "Estadísticas detalladas de tu rendimiento",
      icon: BarChart3,
      link: "/analytics",
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Plan Nutricional",
      description: "Dietas personalizadas y seguimiento",
      icon: Apple,
      link: "/nutrition",
      color: "from-green-500 to-green-700"
    },
    {
      title: "Entrenamiento AR",
      description: "Realidad aumentada para ejercicios",
      icon: Camera,
      link: "/ar",
      color: "from-cyan-500 to-cyan-700"
    }
  ];

  return (
    <div className="dashboard-section bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header del Dashboard */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              TU
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              DASHBOARD
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Bienvenido de vuelta. Aquí tienes todo lo que necesitas para continuar tu transformación.
          </p>
        </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-2xl lg:rounded-3xl p-4 lg:p-6 backdrop-blur-xl`}
            >
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${stat.color} rounded-xl lg:rounded-2xl flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <span className="text-xs lg:text-sm font-medium text-green-400">{stat.change}</span>
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Acciones Rápidas */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 px-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {quickActions.map((action, index) => (
              <Link 
                key={index}
                to={action.link}
                className={`${action.bgColor} ${action.borderColor} border rounded-2xl lg:rounded-3xl p-4 lg:p-6 backdrop-blur-xl hover:scale-105 transition-all duration-300 group`}
              >
                <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${action.color} rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h3 className="text-base lg:text-lg font-bold text-white mb-2">{action.title}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Características Destacadas */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 px-4">Características Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl lg:rounded-3xl p-4 lg:p-6 hover:scale-105 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${feature.color} rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Sección de Motivación */}
        <div className="bg-gradient-to-r from-gray-900/50 to-red-900/30 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/10 mx-4 lg:mx-0">
          <div className="text-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
              <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">¡NO PAIN, NO GAIN!</h2>
            <p className="text-gray-300 text-base lg:text-lg mb-4 lg:mb-6 max-w-2xl mx-auto px-4">
              Cada entrenamiento te acerca más a tu objetivo. Mantén la consistencia y verás resultados extraordinarios.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400 flex-wrap">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Fuerza</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Enfoque</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Éxito</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 