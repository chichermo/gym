import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, Search, Home } from 'lucide-react';

const LandingHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Entrenamiento', path: '/entrenamiento-programa' },
    { name: 'Progreso', path: '/progress' },
    { name: 'Analíticas', path: '/analytics' },
    { name: 'Comunidad', path: '/community' },
    { name: 'Coach Cesar', path: '/coach-cesar-lugo' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo y Botón Home */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Botón Volver al Home - Solo visible cuando no estás en home */}
            {!isHomePage && (
              <Link 
                to="/"
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-red-500/20 to-red-700/20 hover:from-red-500/30 hover:to-red-700/30 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 backdrop-blur-xl border border-red-500/30 text-xs sm:text-sm"
              >
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Volver al Home</span>
              </Link>
            )}
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500/20 to-red-700/20 backdrop-blur-xl border border-red-500/30 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25 hover:scale-110 transition-all duration-300">
              <span className="text-white font-bold text-lg sm:text-2xl">B</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                BRO FIT
              </h1>
              <p className="text-xs text-gray-400">Transforma tu vida</p>
            </div>
            {/* Logo móvil */}
            <div className="sm:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                BRO FIT
              </h1>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-300 hover:scale-105 text-sm xl:text-base ${
                  isActive(item.path)
                    ? 'text-red-400 border-b-2 border-red-400 bg-red-500/10 backdrop-blur-xl px-3 xl:px-4 py-2 rounded-xl'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-xl px-3 xl:px-4 py-2 rounded-xl'
                } ${item.name === 'Coach Cesar' ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 px-3 xl:px-4 py-2 rounded-xl border border-red-500/30 backdrop-blur-xl' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Acciones del usuario */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Búsqueda - Solo visible en desktop */}
            <button className="hidden md:block p-2 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 backdrop-blur-xl rounded-xl">
              <Search className="w-5 h-5" />
            </button>

            {/* Notificaciones */}
            <button className="relative p-1.5 sm:p-2 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Perfil */}
            <Link to="/profile" className="p-1.5 sm:p-2 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl"
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil mejorado */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 sm:top-20 left-0 right-0 bg-white/10 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
            <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-2 sm:space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                    isActive(item.path)
                      ? 'text-red-400 bg-red-500/10 backdrop-blur-xl px-3 sm:px-4 py-2 rounded-xl'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-xl px-3 sm:px-4 py-2 rounded-xl'
                  } ${item.name === 'Coach Cesar' ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 px-3 sm:px-4 py-2 rounded-xl border border-red-500/30 backdrop-blur-xl' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Acciones adicionales en móvil */}
              <div className="pt-2 sm:pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 p-2 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 backdrop-blur-xl rounded-xl text-sm">
                    <Search className="w-4 h-4" />
                    <span>Buscar</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 p-2 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 backdrop-blur-xl rounded-xl text-sm">
                    <User className="w-4 h-4" />
                    <span>Perfil</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader; 