import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'pink';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('blue');

  useEffect(() => {
    // Cargar tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColorScheme = localStorage.getItem('colorScheme') as ColorScheme;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedColorScheme) setColorScheme(savedColorScheme);
  }, []);

  useEffect(() => {
    // Aplicar tema al documento
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('colorScheme', colorScheme);
  }, [theme, colorScheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setColorSchemeHandler = (scheme: ColorScheme) => {
    setColorScheme(scheme);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      colorScheme,
      toggleTheme,
      setColorScheme: setColorSchemeHandler,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}; 