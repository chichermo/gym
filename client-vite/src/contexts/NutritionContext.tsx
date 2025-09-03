import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface NutritionData {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  date: string;
  meal: string;
  notes?: string;
}

export interface MealPlan {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  foods: FoodItem[];
}

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionStats {
  totalCalories: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  water: number;
}

export interface NutritionContextType {
  nutrition: NutritionData[];
  addMeal: (meal: NutritionData) => void;
  updateNutrition: (id: string, data: Partial<NutritionData>) => void;
  getNutritionStats: () => NutritionStats;
  getMealPlan: () => MealPlan[];
  getCalorieHistory: () => any[];
  getMacroDistribution: () => any[];
  exportNutritionData: () => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const useNutrition = (): NutritionContextType => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};

interface NutritionProviderProps {
  children: ReactNode;
}

export const NutritionProvider: React.FC<NutritionProviderProps> = ({ children }) => {
  const [nutrition, setNutrition] = useState<NutritionData[]>([]);

  const addMeal = (meal: NutritionData) => {
    setNutrition(prev => [...prev, meal]);
  };

  const updateNutrition = (id: string, data: Partial<NutritionData>) => {
    setNutrition(prev => prev.map(item => 
      item.id === id ? { ...item, ...data } : item
    ));
  };

  const getNutritionStats = (): NutritionStats => {
    // Mock data for now
    return {
      totalCalories: 1850,
      targetCalories: 2000,
      protein: 120,
      carbs: 180,
      fat: 65,
      fiber: 25,
      water: 2.5
    };
  };

  const getMealPlan = (): MealPlan[] => {
    // Mock data for now
    return [
      {
        id: '1',
        name: 'Desayuno',
        time: '08:00',
        calories: 450,
        protein: 25,
        carbs: 45,
        fat: 15,
        foods: [
          { name: 'Avena', calories: 150, protein: 6, carbs: 27, fat: 3 },
          { name: 'Plátano', calories: 105, protein: 1, carbs: 27, fat: 0 },
          { name: 'Leche', calories: 120, protein: 8, carbs: 12, fat: 5 },
          { name: 'Nueces', calories: 75, protein: 3, carbs: 2, fat: 7 }
        ]
      },
      {
        id: '2',
        name: 'Almuerzo',
        time: '13:00',
        calories: 650,
        protein: 35,
        carbs: 55,
        fat: 25,
        foods: [
          { name: 'Pollo', calories: 250, protein: 30, carbs: 0, fat: 12 },
          { name: 'Arroz', calories: 200, protein: 4, carbs: 44, fat: 0 },
          { name: 'Brócoli', calories: 55, protein: 4, carbs: 11, fat: 0 },
          { name: 'Aceite', calories: 145, protein: 0, carbs: 0, fat: 16 }
        ]
      },
      {
        id: '3',
        name: 'Cena',
        time: '20:00',
        calories: 550,
        protein: 30,
        carbs: 40,
        fat: 20,
        foods: [
          { name: 'Salmón', calories: 280, protein: 25, carbs: 0, fat: 18 },
          { name: 'Quinoa', calories: 120, protein: 4, carbs: 22, fat: 2 },
          { name: 'Espinacas', calories: 25, protein: 3, carbs: 4, fat: 0 },
          { name: 'Aguacate', calories: 125, protein: 2, carbs: 9, fat: 11 }
        ]
      }
    ];
  };

  const getCalorieHistory = () => {
    // Mock data for now
    return [
      { name: 'Lun', consumidas: 1850, objetivo: 2000, quemadas: 450 },
      { name: 'Mar', consumidas: 1920, objetivo: 2000, quemadas: 520 },
      { name: 'Mie', consumidas: 1780, objetivo: 2000, quemadas: 480 },
      { name: 'Jue', consumidas: 2050, objetivo: 2000, quemadas: 390 },
      { name: 'Vie', consumidas: 1890, objetivo: 2000, quemadas: 510 },
      { name: 'Sab', consumidas: 2100, objetivo: 2000, quemadas: 280 },
      { name: 'Dom', consumidas: 1750, objetivo: 2000, quemadas: 320 }
    ];
  };

  const getMacroDistribution = () => {
    // Mock data for now
    return [
      { name: 'Proteínas', value: 25, color: '#3b82f6', target: 30 },
      { name: 'Carbohidratos', value: 45, color: '#10b981', target: 40 },
      { name: 'Grasas', value: 30, color: '#f59e0b', target: 30 }
    ];
  };

  const exportNutritionData = () => {
    console.log('Exporting nutrition data...');
    // Implementation for exporting nutrition data
  };

  const value: NutritionContextType = {
    nutrition,
    addMeal,
    updateNutrition,
    getNutritionStats,
    getMealPlan,
    getCalorieHistory,
    getMacroDistribution,
    exportNutritionData
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
}; 