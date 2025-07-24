import React, { useEffect, useState } from 'react';

const CoachCesarLugoPage: React.FC = () => {
  const [shorts, setShorts] = useState<any[]>([]);
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
      <div className="space-y-8">
        <div className="fitness-card mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Coach Cesar Lugo - Shorts</h1>
          <p className="text-gray-300 max-w-2xl">
            Cargando shorts del canal de Coach Cesar Lugo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="fitness-card mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Coach Cesar Lugo - Shorts</h1>
        <p className="text-gray-300 max-w-2xl text-sm">
          Aquí puedes ver todos los shorts del canal de Coach Cesar Lugo. Ejercicios rápidos y efectivos para tu rutina de entrenamiento.
        </p>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {shorts.length} shorts disponibles
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {shorts.map(short => (
          <div key={short.id} className="fitness-card p-4 rounded-xl">
            <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">{short.title}</h3>
            <div 
              className="aspect-video rounded-lg overflow-hidden mb-3 bg-gray-800 relative cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => window.open(`https://www.youtube.com/watch?v=${short.id}`, '_blank')}
            >
              <img
                src={`https://img.youtube.com/vi/${short.id}/maxresdefault.jpg`}
                alt={short.title}
                className="w-full h-32 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${short.id}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{short.duration}s</span>
              <span className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full text-xs">
                Short
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachCesarLugoPage; 