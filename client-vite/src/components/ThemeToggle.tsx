import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleMode}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: mode === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {mode === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-blue-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 