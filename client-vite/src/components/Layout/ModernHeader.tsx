import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';

const ModernHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-red-500/20 lg:pl-64 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo y Brand */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
                <span className="text-white font-bold text-2xl">F</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                FITNESS PRO
              </h1>
              <p className="text-xs text-gray-400">Transforma tu cuerpo, transforma tu vida</p>
            </div>
          </div>
          
          {/* Navegación Central */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-white hover:text-red-400 transition-colors duration-200 font-medium">
              INICIO
            </Link>
            <Link to="/entrenamiento-programa" className="text-white hover:text-red-400 transition-colors duration-200 font-medium">
              ENTRENAMIENTO
            </Link>
            <Link to="/progress" className="text-white hover:text-red-400 transition-colors duration-200 font-medium">
              PROGRESO
            </Link>
            <Link to="/analytics" className="text-white hover:text-red-400 transition-colors duration-200 font-medium">
              ANALÍTICAS
            </Link>
          </nav>
          
          {/* Acciones del Usuario */}
          <div className="flex items-center gap-4">
            {/* Indicador de estado */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-300 font-medium">ACTIVO</span>
            </div>
            
            {/* Búsqueda */}
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Notificaciones */}
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            {/* Perfil */}
            <Link to="/profile" className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModernHeader; 