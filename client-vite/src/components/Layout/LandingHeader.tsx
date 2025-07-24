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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo y Botón Home */}
          <div className="flex items-center gap-4">
            {/* Botón Volver al Home - Solo visible cuando no estás en home */}
            {!isHomePage && (
              <Link 
                to="/"
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Volver al Home</span>
              </Link>
            )}
            
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                FITNESS PRO
              </h1>
              <p className="text-xs text-gray-400">Transforma tu vida</p>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-red-400 border-b-2 border-red-400'
                    : 'text-gray-300 hover:text-white'
                } ${item.name === 'Coach Cesar' ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 px-4 py-2 rounded-xl border border-red-500/30' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Acciones del usuario */}
          <div className="flex items-center gap-4">
            {/* Búsqueda */}
            <button className="p-2 text-gray-300 hover:text-white transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>

            {/* Notificaciones */}
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Perfil */}
            <Link to="/profile" className="p-2 text-gray-300 hover:text-white transition-colors duration-200">
              <User className="w-5 h-5" />
            </Link>

            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-red-500/20">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-red-400'
                      : 'text-gray-300 hover:text-white'
                  } ${item.name === 'Coach Cesar' ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 px-4 py-2 rounded-xl border border-red-500/30' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader; 