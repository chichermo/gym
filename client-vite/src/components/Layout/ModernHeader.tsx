import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  User, 
  Bell, 
  Settings, 
  LogOut,
  Trophy,
  Target,
  Activity,
  Heart,
  Zap
} from 'lucide-react';

interface ModernHeaderProps {
  user?: {
    name: string;
    level: number;
    xp: number;
    avatar?: string;
  };
  onMenuToggle?: () => void;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({
  user,
  onMenuToggle,
  onProfileClick,
  onNotificationsClick,
  onSettingsClick,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle?.();
  };

  const calculateXPProgress = () => {
    if (!user) return 0;
    const levelXP = user.level * 1000;
    const currentLevelXP = (user.level - 1) * 1000;
    const progress = ((user.xp - currentLevelXP) / (levelXP - currentLevelXP)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <>
      {/* Header principal */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'nav-glass' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo y título */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleMenu}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-300 lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-white text-glow">
                    FitnessPro
                  </h1>
                  <p className="text-xs text-white text-opacity-80 hidden sm:block">
                    Tu compañero de entrenamiento
                  </p>
                </div>
              </div>
            </div>

            {/* Navegación central - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/dashboard" className="nav-item text-white font-medium hover:text-opacity-80 transition-all duration-300">
                Dashboard
              </a>
              <a href="/workouts" className="nav-item text-white font-medium hover:text-opacity-80 transition-all duration-300">
                Entrenamientos
              </a>
              <a href="/progress" className="nav-item text-white font-medium hover:text-opacity-80 transition-all duration-300">
                Progreso
              </a>
              <a href="/community" className="nav-item text-white font-medium hover:text-opacity-80 transition-all duration-300">
                Comunidad
              </a>
            </nav>

            {/* Acciones del usuario */}
            <div className="flex items-center space-x-4">
              {/* Notificaciones */}
              <button
                onClick={onNotificationsClick}
                className="relative p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-300"
              >
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>

              {/* Perfil del usuario */}
              {user && (
                <div className="flex items-center space-x-3">
                  {/* XP Progress */}
                  <div className="hidden sm:flex items-center space-x-2">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {user.level}
                      </div>
                    </div>
                    
                    <div className="hidden md:block">
                      <div className="w-24 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${calculateXPProgress()}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Avatar */}
                  <button
                    onClick={onProfileClick}
                    className="relative group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    
                    {/* Indicador de nivel */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{user.level}</span>
                    </div>
                  </button>
                </div>
              )}

              {/* Menú de configuración */}
              <button
                onClick={onSettingsClick}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-300"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú lateral móvil */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>

        {/* Menú */}
        <div className={`absolute top-0 left-0 h-full w-80 max-w-[80vw] glass-strong transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 h-full flex flex-col">
            {/* Header del menú */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">FitnessPro</h2>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Información del usuario */}
            {user && (
              <div className="mb-8 p-4 crystal rounded-2xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{user.level}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                    <p className="text-sm text-white text-opacity-80">Nivel {user.level}</p>
                  </div>
                </div>
                
                {/* XP Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white text-opacity-80">XP</span>
                    <span className="text-white font-semibold">{user.xp}</span>
                  </div>
                  <div className="w-full h-3 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${calculateXPProgress()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Navegación */}
            <nav className="flex-1 space-y-2">
              <a href="/dashboard" className="flex items-center space-x-4 p-4 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all duration-300">
                <Target className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </a>
              <a href="/workouts" className="flex items-center space-x-4 p-4 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all duration-300">
                <Activity className="w-5 h-5" />
                <span className="font-medium">Entrenamientos</span>
              </a>
              <a href="/progress" className="flex items-center space-x-4 p-4 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all duration-300">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Progreso</span>
              </a>
              <a href="/community" className="flex items-center space-x-4 p-4 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all duration-300">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">Comunidad</span>
              </a>
            </nav>

            {/* Acciones */}
            <div className="space-y-2 pt-4 border-t border-white border-opacity-20">
              <button
                onClick={onSettingsClick}
                className="w-full flex items-center space-x-4 p-4 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Configuración</span>
              </button>
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-4 p-4 text-red-400 hover:bg-red-500 hover:bg-opacity-10 rounded-xl transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Espaciador para el contenido */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default ModernHeader; 