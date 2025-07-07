import React from 'react';
import { useNavigate } from 'react-router-dom';

const EntrenamientoPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Entrenamiento</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <button
          className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:bg-blue-50 transition-colors border border-blue-100"
          onClick={() => navigate('/entrenamientos')}
        >
          <span className="text-2xl font-bold mb-2">Tus entrenamientos</span>
          <span className="text-gray-500">Histórico de rutinas realizadas</span>
        </button>
        <button
          className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:bg-blue-50 transition-colors border border-blue-100"
          onClick={() => navigate('/registros')}
        >
          <span className="text-2xl font-bold mb-2">Tus registros</span>
          <span className="text-gray-500">Histórico y gráficas por grupo muscular</span>
        </button>
        <button
          className="bg-blue-600 text-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:bg-blue-700 transition-colors border border-blue-100"
          onClick={() => navigate('/workouts')}
        >
          <span className="text-2xl font-bold mb-2">Crea tu workout</span>
          <span className="text-blue-100">Arma tu rutina personalizada</span>
        </button>
        <button
          className="bg-yellow-100 text-yellow-700 shadow-lg rounded-2xl p-8 flex flex-col items-center hover:bg-yellow-200 transition-colors border border-yellow-200"
          onClick={() => navigate('/trofeos')}
        >
          <span className="text-2xl font-bold mb-2">Trofeos</span>
          <span className="text-yellow-700">Logros y medallas</span>
        </button>
        <button
          className="bg-gray-100 text-gray-400 shadow-lg rounded-2xl p-8 flex flex-col items-center border border-gray-200 cursor-not-allowed"
          disabled
        >
          <span className="text-2xl font-bold mb-2">Por definir</span>
          <span className="text-gray-400">Próximamente...</span>
        </button>
      </div>
    </div>
  );
};

export default EntrenamientoPage; 