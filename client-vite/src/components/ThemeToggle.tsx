import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colorScheme, setColorScheme } = useTheme();

  const colorSchemes = [
    { id: 'blue', name: 'Azul', color: '#3b82f6' },
    { id: 'green', name: 'Verde', color: '#10b981' },
    { id: 'purple', name: 'Púrpura', color: '#8b5cf6' },
    { id: 'orange', name: 'Naranja', color: '#f59e0b' },
    { id: 'pink', name: 'Rosa', color: '#ec4899' },
  ] as const;

  return (
    <div className="flex items-center space-x-2">
      {/* Toggle de tema */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="relative w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
      >
        <motion.div
          className="w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center"
          animate={{
            x: theme === 'dark' ? 24 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {theme === 'light' ? (
            <Sun className="w-3 h-3 text-yellow-500" />
          ) : (
            <Moon className="w-3 h-3 text-blue-500" />
          )}
        </motion.div>
      </motion.button>

      {/* Selector de color */}
      <div className="relative group">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center"
          style={{ backgroundColor: colorSchemes.find(cs => cs.id === colorScheme)?.color }}
        >
          <Palette className="w-4 h-4 text-white" />
        </motion.button>

        {/* Dropdown de colores */}
        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="grid grid-cols-5 gap-2">
            {colorSchemes.map((scheme) => (
              <motion.button
                key={scheme.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setColorScheme(scheme.id)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  colorScheme === scheme.id 
                    ? 'border-white dark:border-gray-800 shadow-lg' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                style={{ backgroundColor: scheme.color }}
                title={scheme.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle; 