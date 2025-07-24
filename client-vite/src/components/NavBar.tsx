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
  Camera,
  Settings,
  Bell,
  List
} from 'lucide-react';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      color: 'from-blue-500 to-cyan-500',
      description: 'Vista general'
    },
    {
      name: 'Coach Cesar Lugo',
      href: '/coach-cesar-lugo',
      icon: User,
      color: 'from-fuchsia-500 to-pink-500',
      description: 'Videos y shorts'
    },
    {
      name: 'Entrenamiento y Programa',
      href: '/entrenamiento-programa',
      icon: Dumbbell,
      color: 'from-purple-500 to-pink-500',
      description: 'Programas y rutinas'
    },
    {
      name: 'Historial de Entrenamientos',
      href: '/entrenamiento-programa/historial',
      icon: List,
      color: 'from-yellow-500 to-orange-500',
      description: 'Sesiones pasadas'
    },
    {
      name: 'Progreso',
      href: '/progress',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      description: 'Estadísticas'
    },
    {
      name: 'Perfil',
      href: '/profile',
      icon: User,
      color: 'from-orange-500 to-red-500',
      description: 'Mi cuenta'
    },
    {
      name: 'Trofeos',
      href: '/trophies',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      description: 'Logros'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500',
      description: 'Análisis'
    },
    {
      name: 'Comunidad',
      href: '/community',
      icon: Users,
      color: 'from-pink-500 to-rose-500',
      description: 'Social'
    },
    {
      name: 'Calendario',
      href: '/calendar',
      icon: Calendar,
      color: 'from-teal-500 to-cyan-500',
      description: 'Agenda'
    },
    {
      name: 'Plan',
      href: '/plan',
      icon: Target,
      color: 'from-red-500 to-pink-500',
      description: 'Objetivos'
    },
    {
      name: 'Entrenamiento AR',
      href: '/ar',
      icon: Camera,
      color: 'from-cyan-500 to-blue-500',
      description: 'Realidad aumentada'
    },
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
          className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar moderno */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl transform transition-all duration-500 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header del sidebar */}
          <div className="flex items-center justify-center h-24 px-6 border-b border-white/20">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <span className="text-white font-bold text-2xl">F</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="hidden lg:block">
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  FitnessPro
                </h2>
                <p className="text-xs text-gray-400">Tu compañero fitness</p>
              </div>
            </div>
          </div>

          {/* Navegación principal */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActiveItem = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 overflow-hidden
                    ${isActiveItem
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                      : 'text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-md'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {/* Efecto de fondo animado */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                  {/* Icono */}
                  <div className={`relative z-10 p-2 rounded-xl ${isActiveItem ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Texto */}
                  <div className="relative z-10 flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>

                  {/* Indicador activo */}
                  {isActiveItem && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sección de usuario */}
          <div className="p-4 border-t border-white/20">
            {user ? (
              <div className="space-y-3">
                {/* Información del usuario */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {user.name || 'Usuario'}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {user.email}
                    </div>
                  </div>
                </div>

                {/* Acciones rápidas */}
                <div className="flex gap-2">
                  <button className="flex-1 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors duration-200">
                    <Bell className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="flex-1 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors duration-200">
                    <Settings className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center rounded-2xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="block w-full p-3 bg-white/10 text-white text-center rounded-2xl font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar; 