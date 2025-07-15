import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  const themes = [
    {
      id: 'light' as const,
      name: 'Claro',
      icon: SunIcon,
      description: 'Tema claro para uso diurno'
    },
    {
      id: 'dark' as const,
      name: 'Oscuro',
      icon: MoonIcon,
      description: 'Tema oscuro para uso nocturno'
    },
    {
      id: 'auto' as const,
      name: 'Automático',
      icon: ComputerDesktopIcon,
      description: 'Sigue la configuración del sistema'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Tema de la Aplicación
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.id;
          
          return (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`
                relative flex items-center p-4 rounded-lg border-2 transition-all duration-200
                ${isActive
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-600'
                }
              `}
            >
              {/* Checkmark para tema activo */}
              {isActive && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <div className={`
                  p-2 rounded-lg
                  ${isActive
                    ? 'bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="text-left">
                  <div className="font-medium">{themeOption.name}</div>
                  <div className="text-sm opacity-75">{themeOption.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Información adicional */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Tema actual:</strong> {actualTheme === 'light' ? 'Claro' : 'Oscuro'}
          {theme === 'auto' && (
            <span className="ml-2 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
              Automático
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector; 