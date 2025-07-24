import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';

const LandingGallery: React.FC = () => {
  const galleryItems = [
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Culturismo",
      category: "Musculación",
      link: "/entrenamiento-programa"
    },
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Cardio Intenso",
      category: "Cardio",
      link: "/entrenamiento-programa"
    },
    {
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Pilates",
      category: "Core",
      link: "/entrenamiento-programa"
    },
    {
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "CrossFit",
      category: "Funcional",
      link: "/entrenamiento-programa"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              GALERÍA DE
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              ENTRENAMIENTOS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora nuestros diferentes tipos de entrenamientos y encuentra el que mejor se adapte a tus objetivos.
          </p>
        </div>

        {/* Grid de galería */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 hover:scale-105 transition-all duration-300"
            >
              {/* Imagen */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Contenido del overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-red-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-2">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <div className="flex items-center gap-2 text-white">
                    <span className="font-medium">Ver entrenamiento</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Botón de play */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-6 h-6 text-white fill-current" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call-to-action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-4">¿Quieres ver más?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Explora nuestra completa biblioteca de entrenamientos y encuentra el programa perfecto para ti.
            </p>
            <Link 
              to="/entrenamiento-programa"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              <Play className="w-5 h-5" />
              EXPLORAR TODOS LOS ENTRENAMIENTOS
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingGallery; 