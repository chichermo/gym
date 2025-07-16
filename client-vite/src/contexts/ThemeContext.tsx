import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ThemeStyle = 'fitness' | 'gaming' | 'minimalist' | 'premium' | 'neon';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

interface Theme {
  name: string;
  colors: ThemeColors;
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface ThemeContextType {
  mode: ThemeMode;
  style: ThemeStyle;
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
  setStyle: (style: ThemeStyle) => void;
  toggleMode: () => void;
}

const themes: Record<ThemeStyle, Theme> = {
  fitness: {
    name: 'Fitness Pro',
    colors: {
      primary: '#3b82f6',
      secondary: '#10b981',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    }
  },
  gaming: {
    name: 'Gaming Elite',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      accent: '#06b6d4',
      background: '#0f0f23',
      surface: '#1a1a2e',
      text: '#ffffff',
      textSecondary: '#a1a1aa',
      border: '#27272a',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(139, 92, 246, 0.1)',
      md: '0 4px 6px -1px rgba(139, 92, 246, 0.2)',
      lg: '0 10px 15px -3px rgba(139, 92, 246, 0.3)',
      xl: '0 20px 25px -5px rgba(139, 92, 246, 0.4)'
    }
  },
  minimalist: {
    name: 'Minimalist',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#f5f5f5',
      background: '#ffffff',
      surface: '#fafafa',
      text: '#000000',
      textSecondary: '#666666',
      border: '#e5e5e5',
      success: '#000000',
      warning: '#666666',
      error: '#000000',
      info: '#000000'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
      secondary: 'linear-gradient(135deg, #666666 0%, #999999 100%)',
      accent: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)'
    },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
    }
  },
  premium: {
    name: 'Premium Gold',
    colors: {
      primary: '#d4af37',
      secondary: '#b8860b',
      accent: '#ffd700',
      background: '#1a1a1a',
      surface: '#2d2d2d',
      text: '#ffffff',
      textSecondary: '#cccccc',
      border: '#404040',
      success: '#d4af37',
      warning: '#ffd700',
      error: '#ff6b6b',
      info: '#4ecdc4'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
      secondary: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
      accent: 'linear-gradient(135deg, #b8860b 0%, #d4af37 100%)'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(212, 175, 55, 0.1)',
      md: '0 4px 6px -1px rgba(212, 175, 55, 0.2)',
      lg: '0 10px 15px -3px rgba(212, 175, 55, 0.3)',
      xl: '0 20px 25px -5px rgba(212, 175, 55, 0.4)'
    }
  },
  neon: {
    name: 'Neon Cyber',
    colors: {
      primary: '#00ff88',
      secondary: '#ff0080',
      accent: '#00ffff',
      background: '#000000',
      surface: '#0a0a0a',
      text: '#ffffff',
      textSecondary: '#888888',
      border: '#333333',
      success: '#00ff88',
      warning: '#ffff00',
      error: '#ff0080',
      info: '#00ffff'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
      secondary: 'linear-gradient(135deg, #ff0080 0%, #cc0066 100%)',
      accent: 'linear-gradient(135deg, #00ffff 0%, #00cccc 100%)'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 255, 136, 0.3)',
      md: '0 4px 6px -1px rgba(0, 255, 136, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 255, 136, 0.5)',
      xl: '0 20px 25px -5px rgba(0, 255, 136, 0.6)'
    }
  }
};

const darkThemes: Record<ThemeStyle, Theme> = {
  fitness: {
    ...themes.fitness,
    colors: {
      ...themes.fitness.colors,
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155'
    }
  },
  gaming: themes.gaming, // Ya es oscuro
  minimalist: {
    ...themes.minimalist,
    colors: {
      ...themes.minimalist.colors,
      background: '#000000',
      surface: '#111111',
      text: '#ffffff',
      textSecondary: '#888888',
      border: '#333333'
    }
  },
  premium: themes.premium, // Ya es oscuro
  neon: themes.neon // Ya es oscuro
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('auto');
  const [style, setStyle] = useState<ThemeStyle>('fitness');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode || 'auto';
    const savedStyle = localStorage.getItem('theme-style') as ThemeStyle || 'fitness';
    
    setMode(savedMode);
    setStyle(savedStyle);

    if (savedMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mediaQuery.matches);
      
      const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setIsDark(savedMode === 'dark');
    }
  }, [mode]);

  const theme = isDark ? darkThemes[style] : themes[style];

  const setModeHandler = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const setStyleHandler = (newStyle: ThemeStyle) => {
    setStyle(newStyle);
    localStorage.setItem('theme-style', newStyle);
  };

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light';
    setModeHandler(newMode);
  };

  // Aplicar CSS variables dinámicamente
  useEffect(() => {
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });

    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Aplicar tema al body
    document.body.className = `theme-${style} ${isDark ? 'dark' : 'light'}`;
  }, [theme, style, isDark]);

  return (
    <ThemeContext.Provider value={{
      mode,
      style,
      theme,
      setMode: setModeHandler,
      setStyle: setStyleHandler,
      toggleMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 