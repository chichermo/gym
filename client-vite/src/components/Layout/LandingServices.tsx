import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Camera, 
  Apple,
  Trophy,
  Calendar,
  Target,
  Heart,
  Zap,
  Play
} from 'lucide-react';

const LandingServices: React.FC = () => {
  const services = [
    {
      icon: Dumbbell,
      title: "Entrenamiento Personalizado",
      description: "Rutinas adaptadas a tus objetivos y nivel de fitness con seguimiento en tiempo real.",
      link: "/entrenamiento-programa",
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      icon: TrendingUp,
      title: "Seguimiento de Progreso",
      description: "Analiza tu evolución con gráficos detallados y métricas avanzadas de rendimiento.",
      link: "/progress",
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      icon: BarChart3,
      title: "Analíticas Avanzadas",
      description: "Estadísticas profundas sobre tu rendimiento, calorías y mejoras físicas.",
      link: "/analytics",
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      icon: Apple,
      title: "Plan Nutricional",
      description: "Dietas personalizadas y seguimiento de macronutrientes para optimizar resultados.",
      link: "/nutrition",
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      icon: Camera,
      title: "Entrenamiento AR",
      description: "Realidad aumentada para guiarte en cada ejercicio con precisión milimétrica.",
      link: "/ar",
      color: "from-cyan-500 to-cyan-700",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30"
    },
    {
      icon: Users,
      title: "Comunidad Activa",
      description: "Conecta con otros atletas, comparte logros y participa en desafíos grupales.",
      link: "/community",
      color: "from-pink-500 to-pink-700",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30"
    },
    {
      icon: Trophy,
      title: "Sistema de Logros",
      description: "Desbloquea trofeos y medallas por alcanzar metas y superar desafíos.",
      link: "/trophies",
      color: "from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: Calendar,
      title: "Programación Inteligente",
      description: "Organiza tu semana con entrenamientos programados y recordatorios automáticos.",
      link: "/calendar",
      color: "from-orange-500 to-orange-700",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              NUESTROS
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              SERVICIOS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre todas las herramientas que necesitas para transformar tu cuerpo y alcanzar tus objetivos fitness.
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className={`${service.bgColor} ${service.borderColor} border rounded-3xl p-6 backdrop-blur-xl hover:scale-105 transition-all duration-300 group`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
              <div className="flex items-center gap-2 text-red-400 group-hover:text-red-300 transition-colors duration-200">
                <span className="font-medium">Explorar</span>
                <Play className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Call-to-action adicional */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-3xl p-8 backdrop-blur-xl">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">¿Listo para comenzar?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Únete a miles de atletas que ya han transformado sus vidas con BRO FIT. 
              Tu viaje hacia el éxito comienza ahora.
            </p>
            <Link 
              to="/entrenamiento-programa"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              <Play className="w-5 h-5" />
              COMENZAR AHORA
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingServices; 