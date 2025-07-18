import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  date: Date;
  category: 'weight' | 'measurements' | 'strength' | 'cardio' | 'flexibility';
  notes?: string;
}

interface ProgressGoal {
  id: string;
  name: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  category: 'weight' | 'measurements' | 'strength' | 'cardio' | 'flexibility';
  isCompleted: boolean;
  progress: number; // 0-100
}

interface ProgressPhoto {
  id: string;
  url: string;
  date: Date;
  category: 'front' | 'back' | 'side' | 'progress';
  notes?: string;
}

interface ProgressContextType {
  metrics: ProgressMetric[];
  goals: ProgressGoal[];
  photos: ProgressPhoto[];
  isLoading: boolean;
  
  // Metrics Management
  addMetric: (metric: Omit<ProgressMetric, 'id' | 'date'>) => void;
  updateMetric: (id: string, metric: Partial<ProgressMetric>) => void;
  deleteMetric: (id: string) => void;
  
  // Goals Management
  addGoal: (goal: Omit<ProgressGoal, 'id' | 'progress' | 'isCompleted'>) => void;
  updateGoal: (id: string, goal: Partial<ProgressGoal>) => void;
  deleteGoal: (id: string) => void;
  updateGoalProgress: (id: string, currentValue: number) => void;
  
  // Photos Management
  addPhoto: (photo: Omit<ProgressPhoto, 'id' | 'date'>) => void;
  deletePhoto: (id: string) => void;
  
  // Analytics
  getProgressStats: () => {
    totalMetrics: number;
    completedGoals: number;
    totalGoals: number;
    averageProgress: number;
    recentProgress: ProgressMetric[];
    categoryProgress: { [key: string]: number };
  };
  
  getMetricsByCategory: (category: string) => ProgressMetric[];
  getGoalsByCategory: (category: string) => ProgressGoal[];
  getProgressHistory: (metricName: string, days?: number) => ProgressMetric[];
  getPhotoTimeline: () => ProgressPhoto[];
  
  // Charts Data
  getChartData: (metricName: string, days?: number) => { date: string; value: number }[];
  getGoalProgressData: () => { name: string; progress: number; target: number }[];
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: React.ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [metrics, setMetrics] = useState<ProgressMetric[]>([]);
  const [goals, setGoals] = useState<ProgressGoal[]>([]);
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMetric = (metricData: Omit<ProgressMetric, 'id' | 'date'>) => {
    const newMetric: ProgressMetric = {
      ...metricData,
      id: Date.now().toString(),
      date: new Date()
    };
    setMetrics(prev => [...prev, newMetric]);
  };

  const updateMetric = (id: string, metricData: Partial<ProgressMetric>) => {
    setMetrics(prev => prev.map(metric => 
      metric.id === id ? { ...metric, ...metricData } : metric
    ));
  };

  const deleteMetric = (id: string) => {
    setMetrics(prev => prev.filter(metric => metric.id !== id));
  };

  const addGoal = (goalData: Omit<ProgressGoal, 'id' | 'progress' | 'isCompleted'>) => {
    const progress = (goalData.currentValue / goalData.targetValue) * 100;
    const isCompleted = progress >= 100;
    
    const newGoal: ProgressGoal = {
      ...goalData,
      id: Date.now().toString(),
      progress: Math.min(progress, 100),
      isCompleted
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, goalData: Partial<ProgressGoal>) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const updatedGoal = { ...goal, ...goalData };
        if (goalData.currentValue !== undefined && goalData.targetValue !== undefined) {
          updatedGoal.progress = (goalData.currentValue / goalData.targetValue) * 100;
          updatedGoal.isCompleted = updatedGoal.progress >= 100;
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const updateGoalProgress = (id: string, currentValue: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const progress = (currentValue / goal.targetValue) * 100;
        return {
          ...goal,
          currentValue,
          progress: Math.min(progress, 100),
          isCompleted: progress >= 100
        };
      }
      return goal;
    }));
  };

  const addPhoto = (photoData: Omit<ProgressPhoto, 'id' | 'date'>) => {
    const newPhoto: ProgressPhoto = {
      ...photoData,
      id: Date.now().toString(),
      date: new Date()
    };
    setPhotos(prev => [...prev, newPhoto]);
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const getProgressStats = () => {
    const completedGoals = goals.filter(goal => goal.isCompleted).length;
    const averageProgress = goals.length > 0 
      ? goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length 
      : 0;
    
    const recentProgress = metrics
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);
    
    const categoryProgress = metrics.reduce((acc, metric) => {
      if (!acc[metric.category]) {
        acc[metric.category] = 0;
      }
      acc[metric.category]++;
      return acc;
    }, {} as { [key: string]: number });

    return {
      totalMetrics: metrics.length,
      completedGoals,
      totalGoals: goals.length,
      averageProgress,
      recentProgress,
      categoryProgress
    };
  };

  const getMetricsByCategory = (category: string) => {
    return metrics.filter(metric => metric.category === category);
  };

  const getGoalsByCategory = (category: string) => {
    return goals.filter(goal => goal.category === category);
  };

  const getProgressHistory = (metricName: string, days?: number) => {
    let filtered = metrics.filter(metric => metric.name === metricName);
    
    if (days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(metric => metric.date >= cutoffDate);
    }
    
    return filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getPhotoTimeline = () => {
    return photos.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getChartData = (metricName: string, days?: number) => {
    const history = getProgressHistory(metricName, days);
    return history.map(metric => ({
      date: metric.date.toLocaleDateString(),
      value: metric.value
    }));
  };

  const getGoalProgressData = () => {
    return goals.map(goal => ({
      name: goal.name,
      progress: goal.progress,
      target: goal.targetValue
    }));
  };

  const value: ProgressContextType = {
    metrics,
    goals,
    photos,
    isLoading,
    addMetric,
    updateMetric,
    deleteMetric,
    addGoal,
    updateGoal,
    deleteGoal,
    updateGoalProgress,
    addPhoto,
    deletePhoto,
    getProgressStats,
    getMetricsByCategory,
    getGoalsByCategory,
    getProgressHistory,
    getPhotoTimeline,
    getChartData,
    getGoalProgressData
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}; 