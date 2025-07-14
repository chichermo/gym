import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center justify-center rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      <div className="relative flex h-8 w-18 items-center justify-between rounded-full bg-white dark:bg-slate-900 p-1 transition-all duration-300">
        <div
          className={`absolute h-6 w-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 ${
            theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
          }`}
        />
        <div className="relative z-10 flex items-center justify-center w-6 h-6">
          <Sun className={`w-4 h-4 transition-all duration-300 ${
            theme === 'light' ? 'text-amber-600' : 'text-slate-400'
          }`} />
        </div>
        <div className="relative z-10 flex items-center justify-center w-6 h-6">
          <Moon className={`w-4 h-4 transition-all duration-300 ${
            theme === 'dark' ? 'text-blue-400' : 'text-slate-400'
          }`} />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle; 