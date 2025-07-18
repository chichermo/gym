import React, { createContext, useContext, useState, useEffect } from 'react';

interface Metric {
  id: string;
  name: string;
  value: string;
  unit: string;
  category: string;
  change: number;
  target?: string;
  data?: Array<{ date: string; value: number }>;
}

interface Prediction {
  metric: string;
  currentValue: string;
  predictedValue: string;
  confidence: number;
  timeframe: string;
}

interface AnalyticsContextType {
  metrics: Metric[];
  predictions: Prediction[];
  trends: any[];
  isLoading: boolean;
  exportReport: (format: 'pdf' | 'csv' | 'json') => Promise<void>;
  generateInsights: () => Promise<string[]>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: 'workouts',
      name: 'Entrenamientos',
      value: '24',
      unit: 'sesiones',
      category: 'performance',
      change: 12,
      target: '30',
      data: [
        { date: 'Lun', value: 3 },
        { date: 'Mar', value: 2 },
        { date: 'Mié', value: 4 },
        { date: 'Jue', value: 1 },
        { date: 'Vie', value: 3 },
        { date: 'Sáb', value: 2 },
        { date: 'Dom', value: 0 },
      ]
    },
    {
      id: 'calories',
      name: 'Calorías',
      value: '8,400',
      unit: 'kcal',
      category: 'health',
      change: 8,
      target: '10,000',
      data: [
        { date: 'Lun', value: 1200 },
        { date: 'Mar', value: 1100 },
        { date: 'Mié', value: 1400 },
        { date: 'Jue', value: 900 },
        { date: 'Vie', value: 1300 },
        { date: 'Sáb', value: 1000 },
        { date: 'Dom', value: 800 },
      ]
    },
    {
      id: 'strength',
      name: 'Fuerza',
      value: '+15%',
      unit: 'progreso',
      category: 'progress',
      change: 15,
      target: '20%',
      data: [
        { date: 'Lun', value: 80 },
        { date: 'Mar', value: 82 },
        { date: 'Mié', value: 85 },
        { date: 'Jue', value: 87 },
        { date: 'Vie', value: 89 },
        { date: 'Sáb', value: 91 },
        { date: 'Dom', value: 92 },
      ]
    },
    {
      id: 'social',
      name: 'Actividad Social',
      value: '156',
      unit: 'interacciones',
      category: 'social',
      change: 23,
      target: '200',
      data: [
        { date: 'Lun', value: 20 },
        { date: 'Mar', value: 25 },
        { date: 'Mié', value: 30 },
        { date: 'Jue', value: 18 },
        { date: 'Vie', value: 35 },
        { date: 'Sáb', value: 28 },
        { date: 'Dom', value: 15 },
      ]
    }
  ]);

  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      metric: 'workouts',
      currentValue: '24',
      predictedValue: '28',
      confidence: 0.85,
      timeframe: 'próximo mes'
    },
    {
      metric: 'calories',
      currentValue: '8,400',
      predictedValue: '9,200',
      confidence: 0.78,
      timeframe: 'próximo mes'
    },
    {
      metric: 'strength',
      currentValue: '+15%',
      predictedValue: '+18%',
      confidence: 0.92,
      timeframe: 'próximo mes'
    }
  ]);

  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const exportReport = async (format: 'pdf' | 'csv' | 'json') => {
    setIsLoading(true);
    try {
      // Simulación de exportación
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Reporte exportado en formato ${format}`);
    } catch (error) {
      console.error('Error al exportar reporte:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateInsights = async (): Promise<string[]> => {
    setIsLoading(true);
    try {
      // Simulación de generación de insights
      await new Promise(resolve => setTimeout(resolve, 1500));
      return [
        "Tu rendimiento en entrenamientos de fuerza ha mejorado un 15% este mes",
        "Las sesiones de cardio están ayudando a quemar más calorías",
        "Considera aumentar la intensidad de tus entrenamientos para alcanzar tus metas",
        "Tu consistencia en los entrenamientos es excelente",
        "La actividad social está contribuyendo positivamente a tu motivación"
      ];
    } catch (error) {
      console.error('Error al generar insights:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const value: AnalyticsContextType = {
    metrics,
    predictions,
    trends,
    isLoading,
    exportReport,
    generateInsights
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}; 