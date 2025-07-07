import React from 'react';

const EntrenamientosHistPage: React.FC = () => {
  const workouts = React.useMemo(() => {
    return JSON.parse(localStorage.getItem('workouts_hist') || '[]');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col items-center py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Tus entrenamientos</h1>
      {workouts.length === 0 ? (
        <div className="text-gray-500">No tienes rutinas guardadas aún.</div>
      ) : (
        <div className="w-full max-w-2xl space-y-6">
          {workouts.map((w: any) => (
            <div key={w.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg text-blue-700">{w.nombre}</span>
                <span className="text-xs text-gray-400">{new Date(w.fecha).toLocaleString()}</span>
              </div>
              <ul className="list-disc pl-6 text-gray-800">
                {w.ejercicios.map((e: any) => (
                  <li key={e.id}>
                    <span className="font-medium">{e.nombre}</span>
                    <span className="ml-2 text-xs text-gray-500">({e.grupoMuscular})</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntrenamientosHistPage; 