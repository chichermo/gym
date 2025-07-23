import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Dumbbell, 
  TrendingUp, 
  User, 
  Trophy,
  BarChart3, 
  Users, 
  Calendar, 
  Target,
  LogOut,
  Menu,
  X,
  Zap,
  Heart,
  Activity,
  Camera
} from 'lucide-react';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, color: 'text-blue-600' },
    { name: 'Mi Programa', href: '/program', icon: Dumbbell, color: 'text-purple-600' },
    { name: 'Progreso', href: '/progress', icon: TrendingUp, color: 'text-green-600' },
    { name: 'Perfil', href: '/profile', icon: User, color: 'text-orange-600' },
    { name: 'Trofeos', href: '/trophies', icon: Trophy, color: 'text-yellow-600' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, color: 'text-indigo-600' },
    { name: 'Comunidad', href: '/community', icon: Users, color: 'text-pink-600' },
    { name: 'Calendario', href: '/calendar', icon: Calendar, color: 'text-teal-600' },
    { name: 'Plan', href: '/plan', icon: Target, color: 'text-red-600' },
    { name: 'Entrenamiento AR', href: '/ar', icon: Camera, color: 'text-cyan-600' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-white to-gray-50 shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 px-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl">FitnessPro</span>
                <div className="text-white text-opacity-80 text-xs">Tu compañero fitness</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                    ${isActive(item.href)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-md'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {/* Background gradient for active state */}
                  {isActive(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90"></div>
                  )}
                  
                  <div className={`relative z-10 flex items-center gap-3 w-full`}>
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                      ${isActive(item.href) 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : `${item.color} bg-gray-100 group-hover:bg-white group-hover:shadow-sm`
                      }
                    `}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200 bg-white">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.name || 'Usuario'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email || 'usuario@ejemplo.com'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gray-100 group-hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Zap className="w-4 h-4" />
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all duration-300"
                >
                  <Heart className="w-4 h-4" />
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-2">
                <Activity className="w-3 h-3" />
                <span>FitnessPro v2.0</span>
              </div>
              <div className="text-xs text-gray-400">
                Tu compañero fitness personal
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar; 