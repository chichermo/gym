import React, { useState } from 'react';
import { trofeos, TipoTrofeo } from '../../data/trofeos';

const tipos: { key: TipoTrofeo; label: string }[] = [
  { key: 'levantamientos', label: 'Levantamientos' },
  { key: 'constancia', label: 'Constancia' },
  { key: 'peso corporal', label: 'Peso corporal' },
  { key: 'por definir', label: 'Por definir' },
];

const TrofeosPage: React.FC = () => {
  const [tipo, setTipo] = useState<TipoTrofeo>('levantamientos');
  const trofeosFiltrados = trofeos.filter(t => t.tipo === tipo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col items-center py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Trofeos</h1>
      <div className="flex gap-3 mb-8">
        {tipos.map(t => (
          <button
            key={t.key}
            className={`px-4 py-2 rounded-full font-medium border transition-colors ${tipo === t.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'}`}
            onClick={() => setTipo(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {trofeosFiltrados.map(t => (
          <div
            key={t.id}
            className={`rounded-xl shadow p-6 flex flex-col items-center border-2 ${t.unlocked ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-100 opacity-60'}`}
          >
            <span className="text-2xl font-bold mb-2">{t.nombre}</span>
            <span className="text-gray-600 mb-2 text-center">{t.descripcion}</span>
            {t.unlocked ? (
              <span className="text-green-600 font-semibold">¡Desbloqueado!</span>
            ) : (
              <span className="text-gray-400 font-semibold flex items-center gap-1"><span role="img" aria-label="candado">🔒</span> Pendiente</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrofeosPage; 