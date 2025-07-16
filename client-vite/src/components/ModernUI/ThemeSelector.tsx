import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Sun, Moon, Monitor, Sparkles, 
  Zap, Crown, Minus, Gamepad2, Settings
} from 'lucide-react';
import { useTheme, ThemeStyle } from '../../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { mode, style, setMode, setStyle, toggleMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { id: ThemeStyle; name: string; icon: React.ReactNode; description: string }[] = [
    {
      id: 'fitness',
      name: 'Fitness Pro',
      icon: <Zap className="w-5 h-5" />,
      description: 'Energético y motivador'
    },
    {
      id: 'gaming',
      name: 'Gaming Elite',
      icon: <Gamepad2 className="w-5 h-5" />,
      description: 'Futurista y dinámico'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      icon: <Minus className="w-5 h-5" />,
      description: 'Limpio y elegante'
    },
    {
      id: 'premium',
      name: 'Premium Gold',
      icon: <Crown className="w-5 h-5" />,
      description: 'Lujoso y exclusivo'
    },
    {
      id: 'neon',
      name: 'Neon Cyber',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Cyberpunk y vibrante'
    }
  ];

  const modeOptions = [
    { id: 'light', label: 'Claro', icon: Sun },
    { id: 'dark', label: 'Oscuro', icon: Moon },
    { id: 'auto', label: 'Auto', icon: Monitor }
  ];

  return (
    <div className="relative">
      {/* Botón principal */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Palette className="w-5 h-5" />
        <span className="hidden sm:inline">Tema</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Settings className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Panel de temas */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              <h3 className="font-semibold">Personalizar Tema</h3>
              <p className="text-sm opacity-90">Elige tu estilo preferido</p>
            </div>

            {/* Modo de tema */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Modo</h4>
              <div className="flex gap-2">
                {modeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setMode(option.id as any)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        mode === option.id
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Estilos de tema */}
            <div className="p-4">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Estilo</h4>
              <div className="space-y-2">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStyle(theme.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      style === theme.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      style === theme.id
                        ? 'bg-white/20'
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      {theme.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{theme.name}</div>
                      <div className={`text-xs ${
                        style === theme.id
                          ? 'text-white/80'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {theme.description}
                      </div>
                    </div>
                    {style === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Preview del tema */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Preview</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Color primario</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Color secundario</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Color de acento</span>
                </div>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <button
                  onClick={toggleMode}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Cambiar Modo
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para cerrar */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40"
        />
      )}
    </div>
  );
};

export default ThemeSelector; 