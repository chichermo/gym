import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Users, Star, Instagram, Youtube, Facebook } from 'lucide-react';

interface Short {
  id: string;
  title: string;
  duration: number;
}

const CoachCesarLugoPage: React.FC = () => {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/cesar_lugo_shorts.json')
      .then(res => res.json())
      .then(data => {
        setShorts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando shorts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-white mb-2">Cargando...</h1>
            <p className="text-gray-300">Cargando contenido del Coach Cesar Lugo</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botón Volver */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Home
        </Link>

        {/* Hero Section con Foto del Coach */}
        <div className="bg-gradient-to-r from-gray-900/50 to-red-900/30 rounded-3xl p-8 mb-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Foto del Coach */}
            <div className="relative">
              <div className="w-full h-80 lg:h-96 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Coach Cesar Lugo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Badge de verificación */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full p-2">
                <Star className="w-4 h-4 text-white fill-current" />
              </div>
            </div>

            {/* Información del Coach */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    COACH
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    CESAR LUGO
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  Entrenador personal certificado especializado en calistenia, fuerza funcional y transformación corporal. 
                  Más de 10 años de experiencia ayudando a personas a alcanzar sus objetivos fitness.
                </p>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-400">Videos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-sm text-gray-400">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.9</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="flex gap-4">
                <a href="#" className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Shorts */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Shorts de Entrenamiento</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Ejercicios rápidos y efectivos para tu rutina diaria. Aprende técnicas avanzadas de calistenia y fuerza funcional.
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{shorts.length} shorts disponibles</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>Actualizaciones diarias</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shorts.map(short => (
              <div key={short.id} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:scale-105 transition-all duration-300 group">
                <div 
                  className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-800 relative cursor-pointer"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${short.id}`, '_blank')}
                >
                  <img
                    src={`https://img.youtube.com/vi/${short.id}/maxresdefault.jpg`}
                    alt={short.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = `https://img.youtube.com/vi/${short.id}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/70 rounded-full p-3">
                      <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {short.duration}s
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors duration-200">
                  {short.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                    Short
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>4.9</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachCesarLugoPage; 