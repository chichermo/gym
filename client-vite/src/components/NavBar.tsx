import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Dumbbell,
  TrendingUp,
  Users,
  Calendar,
  Trophy,
  BarChart3,
  Apple,
  Camera,
  User,
  Settings,
  LogOut
} from 'lucide-react';

const NavBar: React.FC = () => {
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/',
      description: 'Vista general'
    },
    {
      name: 'Coach Cesar Lugo',
      icon: User,
      path: '/coach-cesar-lugo',
      description: 'Videos motivacionales'
    },
    {
      name: 'Entrenamiento',
      icon: Dumbbell,
      path: '/entrenamiento-programa',
      description: 'Rutinas y programas'
    },
    {
      name: 'Progreso',
      icon: TrendingUp,
      path: '/progress',
      description: 'Seguimiento personal'
    },
    {
      name: 'Analíticas',
      icon: BarChart3,
      path: '/analytics',
      description: 'Estadísticas detalladas'
    },
    {
      name: 'Nutrición',
      icon: Apple,
      path: '/nutrition',
      description: 'Plan alimenticio'
    },
    {
      name: 'Trofeos',
      icon: Trophy,
      path: '/trophies',
      description: 'Logros y premios'
    },
    {
      name: 'Comunidad',
      icon: Users,
      path: '/community',
      description: 'Conecta con otros'
    },
    {
      name: 'Calendario',
      icon: Calendar,
      path: '/calendar',
      description: 'Organiza tu semana'
    },
    {
      name: 'AR Entrenamiento',
      icon: Camera,
      path: '/ar',
      description: 'Realidad aumentada'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed left-0 top-20 h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 z-40 overflow-y-auto">
      <div className="p-6">
        {/* Logo y título */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div>
                              <h2 className="text-lg font-bold text-white">BRO FIT</h2>
              <p className="text-xs text-gray-400">Tu compañero de entrenamiento</p>
            </div>
          </div>
        </div>

        {/* Navegación principal */}
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-red-500 to-red-700'
                    : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                </div>
                {active && (
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Separador */}
        <div className="my-6 border-t border-white/10"></div>

        {/* Acciones del usuario */}
        <div className="space-y-2">
          <Link
            to="/profile"
            className="group flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <div className="w-8 h-8 bg-gray-700/50 group-hover:bg-gray-600/50 rounded-xl flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-medium">Perfil</div>
              <div className="text-xs text-gray-400">Configuración personal</div>
            </div>
          </Link>

          <button className="group w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300">
            <div className="w-8 h-8 bg-gray-700/50 group-hover:bg-gray-600/50 rounded-xl flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <div className="font-medium">Configuración</div>
              <div className="text-xs text-gray-400">Preferencias del sistema</div>
            </div>
          </button>

          <button className="group w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300">
            <div className="w-8 h-8 bg-red-500/20 group-hover:bg-red-500/30 rounded-xl flex items-center justify-center">
              <LogOut className="w-4 h-4" />
            </div>
            <div>
              <div className="font-medium">Cerrar Sesión</div>
              <div className="text-xs text-gray-400">Salir de la aplicación</div>
            </div>
          </button>
        </div>

        {/* Estado del usuario */}
        <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl border border-green-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-300">Activo</span>
          </div>
          <div className="text-xs text-gray-400">
            Última actividad: Hace 5 min
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 