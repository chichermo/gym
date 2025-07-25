import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  ArrowRight, 
  Home,
  User,
  Video,
  Dumbbell,
  List,
  TrendingUp,
  Award,
  BarChart3,
  Users,
  Calendar,
  Target,
  Camera,
  Star,
  History
} from 'lucide-react';

const LandingHero: React.FC = () => {
  // Accesos rápidos para el hero section
  const quickAccess = [
    {
      title: "Dashboard",
      subtitle: "Vista general",
      icon: Home,
      link: "/",
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Coach Cesar",
      subtitle: "Videos y shorts",
      icon: Video,
      link: "/coach-cesar-lugo",
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/50",
      featured: true
    },
    {
      title: "Entrenamiento",
      subtitle: "Programas y rutinas",
      icon: Dumbbell,
      link: "/entrenamiento-programa",
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      title: "Historial",
      subtitle: "Sesiones pasadas",
      icon: List,
      link: "/entrenamientos-hist",
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      title: "Rutinas",
      subtitle: "Mis entrenamientos",
      icon: History,
      link: "/rutinas",
      color: "from-teal-500 to-teal-700",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/30"
    },
    {
      title: "Progreso",
      subtitle: "Estadísticas",
      icon: TrendingUp,
      link: "/progress",
      color: "from-cyan-500 to-cyan-700",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30"
    },
    {
      title: "Perfil",
      subtitle: "Mi cuenta",
      icon: User,
      link: "/profile",
      color: "from-pink-500 to-pink-700",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30"
    },
    {
      title: "Trofeos",
      subtitle: "Logros",
      icon: Award,
      link: "/trophies",
      color: "from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      title: "Analytics",
      subtitle: "Análisis",
      icon: BarChart3,
      link: "/analytics",
      color: "from-indigo-500 to-indigo-700",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30"
    },
    {
      title: "Comunidad",
      subtitle: "Social",
      icon: Users,
      link: "/community",
      color: "from-emerald-500 to-emerald-700",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    },
    {
      title: "Calendario",
      subtitle: "Agenda",
      icon: Calendar,
      link: "/calendar",
      color: "from-orange-500 to-orange-700",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30"
    },
    {
      title: "Plan",
      subtitle: "Objetivos",
      icon: Target,
      link: "/plan",
      color: "from-rose-500 to-rose-700",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/30"
    },
    {
      title: "Entrenamiento AR",
      subtitle: "Realidad aumentada",
      icon: Camera,
      link: "/ar",
      color: "from-violet-500 to-violet-700",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/30"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-40"></div>
      </div>

      {/* Contenido del hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30 mb-8">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-300 font-medium">¡NUEVO! Entrenamiento Personalizado</span>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              TRANSFORMA
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              TU CUERPO
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Llega a tu máximo potencial con entrenamientos personalizados, seguimiento avanzado y una comunidad que te motiva a alcanzar tus objetivos.
          </p>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/entrenamiento-programa"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              <Play className="w-5 h-5" />
              COMENZAR ENTRENAMIENTO
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/progress"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300"
            >
              VER PROGRESO
            </Link>
          </div>

          {/* Accesos Rápidos Mejorados */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Acceso Rápido</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Navega rápidamente a todas las secciones importantes de tu aplicación fitness
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4 max-w-6xl mx-auto">
              {quickAccess.map((item, index) => (
                <Link 
                  key={index}
                  to={item.link}
                  className={`group ${item.bgColor} ${item.borderColor} border rounded-2xl p-3 lg:p-4 backdrop-blur-xl hover:scale-105 transition-all duration-300 text-center relative ${
                    item.featured ? 'ring-2 ring-red-500/50 shadow-lg shadow-red-500/25' : ''
                  }`}
                >
                  {/* Badge destacado para Coach Cesar */}
                  {item.featured && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-700 rounded-full p-1">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                  
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h3 className="text-xs lg:text-sm font-bold text-white mb-1 line-clamp-2 leading-tight">{item.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1 leading-tight">{item.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
    </section>
  );
};

export default LandingHero; 