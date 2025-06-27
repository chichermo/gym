import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { 
  Home, 
  Dumbbell, 
  TrendingUp, 
  User, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  Calendar,
  Target,
  Settings,
  Apple,
  Trophy
} from 'lucide-react';
import NotificationSystem from './NotificationSystem';

const NavBar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Entrenamientos', href: '/workouts', icon: Dumbbell },
    { name: 'Calendario', href: '/calendar', icon: Calendar },
    { name: 'Nutrición', href: '/nutrition', icon: Apple },
    { name: 'Progreso', href: '/progress', icon: TrendingUp },
    { name: 'Plan IA', href: '/plan', icon: Target },
    { name: 'Gamificación', href: '/gamification', icon: Trophy },
    { name: 'Perfil', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* NavBar móvil */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">FitApp</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="bg-white border-t border-gray-200 px-4 py-2">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-3 py-2">
                <img
                  src={user?.avatar || 'https://via.placeholder.com/32'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Nivel {user?.level}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notificaciones móviles */}
        {showNotifications && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <NotificationSystem />
          </div>
        )}
      </div>

      {/* NavBar desktop */}
      <div className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
          <Dumbbell className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">FitApp</span>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Perfil del usuario */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={user?.avatar || 'https://via.placeholder.com/40'}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">Nivel {user?.level}</p>
            </div>
          </div>
          
          {/* Barra de progreso de XP */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>XP: {user?.xp}</span>
              <span>{user?.nextLevelXp}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((user?.xp || 0) / (user?.nextLevelXp || 1)) * 100}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Acciones del usuario */}
          <div className="space-y-2">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span>Notificaciones</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Notificaciones desktop */}
      {showNotifications && (
        <div className="hidden lg:block fixed top-20 left-64 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <NotificationSystem />
        </div>
      )}

      {/* Overlay para cerrar notificaciones */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}

      {/* Espacio para el contenido */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        {/* El contenido de la página se renderiza aquí */}
      </div>
    </>
  );
};

export default NavBar; 