import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Dumbbell, BarChart, User, LogOut, Calendar, Activity, Info, Flame, Trophy } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-white flex flex-col">
      {/* Banner Demo */}
      <div className="w-full bg-gradient-to-r from-yellow-200 via-yellow-50 to-yellow-100 border-b border-yellow-300 py-2 px-4 flex items-center justify-center">
        <Info className="w-5 h-5 text-yellow-600 mr-2" />
        <span className="text-yellow-800 text-sm font-medium">Modo DEMO: Estás viendo datos simulados. ¡Explora libremente!</span>
      </div>
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        {/* Header usuario */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-400 flex items-center justify-center shadow-lg border-4 border-white">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-1">
                ¡Hola, {user?.firstName || user?.username}!
              </h1>
              <p className="text-gray-500 text-base">Bienvenido a tu panel de control fitness</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl shadow hover:bg-red-700 transition-colors font-semibold"
          >
            <LogOut className="w-5 h-5" /> Cerrar sesión
          </button>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <Dumbbell className="w-10 h-10 text-blue-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">12</div>
            <div className="text-gray-500 text-sm">Entrenamientos este mes</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <Flame className="w-10 h-10 text-orange-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">4,200</div>
            <div className="text-gray-500 text-sm">Calorías quemadas</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <Trophy className="w-10 h-10 text-yellow-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">5</div>
            <div className="text-gray-500 text-sm">Logros desbloqueados</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <BarChart className="w-10 h-10 text-indigo-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">+2.5 kg</div>
            <div className="text-gray-500 text-sm">Progreso de peso</div>
          </div>
        </div>

        {/* Accesos rápidos y perfil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <User className="w-8 h-8 text-blue-600 mb-2" />
            <div className="text-lg font-semibold">Perfil</div>
            <div className="text-gray-500 text-sm mb-2">{user?.email}</div>
            <Link to="/profile" className="w-full text-center mt-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium">Ver perfil</Link>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <Dumbbell className="w-8 h-8 text-blue-600 mb-2" />
            <div className="text-lg font-semibold">Entrenamientos</div>
            <div className="text-gray-500 text-sm mb-2">Gestiona tus rutinas</div>
            <Link to="/workouts" className="w-full text-center mt-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium">Ver entrenamientos</Link>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <BarChart className="w-8 h-8 text-blue-600 mb-2" />
            <div className="text-lg font-semibold">Progreso</div>
            <div className="text-gray-500 text-sm mb-2">Sigue tu avance</div>
            <Link to="/progress" className="w-full text-center mt-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium">Ver progreso</Link>
          </div>
        </div>

        {/* Info usuario y accesos rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Nivel de fitness:</span>
              <span className="capitalize">{user?.fitnessLevel}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Último acceso:</span>
              <span>{user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : '-'}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">Altura:</span>
              <span>{user?.height} cm</span>
              <span className="font-semibold ml-4">Peso:</span>
              <span>{user?.weight} kg</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">Objetivos:</span>
              <span>{user?.fitnessGoals?.map(g => g.replace('_', ' ')).join(', ') || '-'}</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="font-semibold mb-2">Accesos rápidos</div>
            <div className="flex flex-wrap gap-2">
              <Link to="/workouts" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow">+ Nuevo entrenamiento</Link>
              <Link to="/progress" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow">+ Registrar progreso</Link>
              <Link to="/plan" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow">Ver plan de IA</Link>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full py-4 bg-gradient-to-r from-blue-100 via-indigo-100 to-white text-center text-gray-500 text-sm border-t">
        &copy; {new Date().getFullYear()} Fitness App · Hecho con <span className="text-pink-500">♥</span> por tu equipo
      </footer>
    </div>
  );
};

export default DashboardPage; 