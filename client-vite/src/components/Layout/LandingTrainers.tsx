import React from 'react';
import { Users, Instagram, Twitter, Linkedin, Star } from 'lucide-react';

const LandingTrainers: React.FC = () => {
  const trainers = [
    {
      name: "Coach Cesar Lugo",
      specialty: "Entrenamiento Funcional",
      image: "/cesar.png",
      description: "Especialista en transformación corporal con más de 10 años de experiencia. Creador de programas personalizados que han ayudado a miles de personas a alcanzar sus objetivos.",
      rating: 4.9,
      clients: 2500,
      social: {
        instagram: "@cesarlugo3614",
        twitter: "@cesarlugo",
        linkedin: "cesar-lugo"
      }
    },
    {
      name: "Ana Martínez",
      specialty: "Yoga y Pilates",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Instructora certificada en yoga y pilates. Especializada en rehabilitación y bienestar mental a través del movimiento consciente.",
      rating: 4.8,
      clients: 1800,
      social: {
        instagram: "@anamartinez",
        twitter: "@anamartinez",
        linkedin: "ana-martinez"
      }
    },
    {
      name: "Carlos Rodríguez",
      specialty: "Culturismo y Fuerza",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Entrenador de fuerza y culturismo con experiencia en competencias nacionales. Especializado en desarrollo muscular y nutrición deportiva.",
      rating: 4.9,
      clients: 3200,
      social: {
        instagram: "@carlosrodriguez",
        twitter: "@carlosrodriguez",
        linkedin: "carlos-rodriguez"
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              NUESTROS
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              ENTRENADORES
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conoce al equipo de profesionales que te guiará en tu transformación física y mental.
          </p>
        </div>

        {/* Grid de entrenadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-300 group">
              {/* Imagen del entrenador */}
              <div className="relative mb-6">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{trainer.rating}</span>
                </div>
              </div>

              {/* Información del entrenador */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{trainer.name}</h3>
                <p className="text-red-400 font-medium mb-4">{trainer.specialty}</p>
                <p className="text-gray-400 mb-6 leading-relaxed">{trainer.description}</p>

                {/* Estadísticas */}
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{trainer.clients}+</div>
                    <div className="text-sm text-gray-400">Clientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{trainer.rating}</div>
                    <div className="text-sm text-gray-400">Rating</div>
                  </div>
                </div>

                {/* Redes sociales */}
                <div className="flex items-center justify-center gap-4">
                  <a href="#" className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-colors duration-200">
                    <Instagram className="w-5 h-5 text-red-400" />
                  </a>
                  <a href="#" className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full transition-colors duration-200">
                    <Twitter className="w-5 h-5 text-blue-400" />
                  </a>
                  <a href="#" className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-full transition-colors duration-200">
                    <Linkedin className="w-5 h-5 text-blue-500" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-3xl p-8 backdrop-blur-xl">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">¿Quieres ser entrenador?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Únete a nuestro equipo de profesionales y ayuda a otros a alcanzar sus objetivos fitness.
            </p>
            <button className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
              <Users className="w-5 h-5" />
              APLICAR COMO ENTRENADOR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingTrainers; 