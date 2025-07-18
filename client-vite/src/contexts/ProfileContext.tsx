import React, { createContext, useContext, useState, useEffect } from 'react';

interface BodyType {
  id: 'endomorph' | 'ectomorph' | 'mesomorph';
  name: string;
  description: string;
  image: string;
}

interface Perimeter {
  id: string;
  name: string;
  value: number;
  date: Date;
  unit: 'mm' | 'cm';
}

interface WeightRecord {
  id: string;
  weight: number;
  date: Date;
  photo?: string;
  notes?: string;
}

interface BodyComposition {
  bodyFatPercentage?: number;
  musclePercentage?: number;
  skinfoldMeasurements?: {
    triceps?: number;
    biceps?: number;
    subscapular?: number;
    iliac?: number;
    abdominal?: number;
    thigh?: number;
    calf?: number;
  };
  date: Date;
}

interface ProfileData {
  experienceLevel: 'basic_1' | 'basic_2' | 'intermediate_1' | 'intermediate_2' | 'advanced_1' | 'advanced_2';
  bodyType?: BodyType;
  height: number;
  weight: number;
  age: number;
  perimeters: Perimeter[];
  weightHistory: WeightRecord[];
  bodyComposition: BodyComposition[];
}

interface ProfileContextType {
  profile: ProfileData;
  isLoading: boolean;
  updateExperienceLevel: (level: ProfileData['experienceLevel']) => void;
  updateBodyType: (bodyType: BodyType) => void;
  addPerimeter: (perimeter: Omit<Perimeter, 'id' | 'date'>) => void;
  addWeightRecord: (record: Omit<WeightRecord, 'id' | 'date'>) => void;
  updateBodyComposition: (composition: Omit<BodyComposition, 'date'>) => void;
  getExperienceLevelName: (level: ProfileData['experienceLevel']) => string;
  getBodyTypes: () => BodyType[];
  getPerimeterHistory: (perimeterId: string) => Perimeter[];
  getWeightHistory: (days?: number) => WeightRecord[];
  getTotalPerimeter: (date: Date) => number;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: React.ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>({
    experienceLevel: 'basic_1',
    height: 175,
    weight: 70,
    age: 25,
    perimeters: [],
    weightHistory: [],
    bodyComposition: []
  });

  const [isLoading, setIsLoading] = useState(false);

  const bodyTypes: BodyType[] = [
    {
      id: 'endomorph',
      name: 'Endomorfo',
      description: 'Tendencia a ganar grasa fácilmente, metabolismo más lento, estructura ósea más ancha.',
      image: '/body-types/endomorph.png'
    },
    {
      id: 'ectomorph',
      name: 'Ectomorfo',
      description: 'Dificultad para ganar peso, metabolismo rápido, estructura ósea delgada.',
      image: '/body-types/ectomorph.png'
    },
    {
      id: 'mesomorph',
      name: 'Mesomorfo',
      description: 'Gana músculo fácilmente, estructura atlética natural, metabolismo equilibrado.',
      image: '/body-types/mesomorph.png'
    }
  ];

  const experienceLevels = {
    basic_1: 'Básico I - Soy nuevo en el gym',
    basic_2: 'Básico II - Menos de 6 meses',
    intermediate_1: 'Intermedio I - De 6 meses a 1 año',
    intermediate_2: 'Intermedio II - De 1 a 3 años',
    advanced_1: 'Avanzado I - De 3 a 5 años',
    advanced_2: 'Avanzado II - Más de 5 años'
  };

  const updateExperienceLevel = (level: ProfileData['experienceLevel']) => {
    setProfile(prev => ({ ...prev, experienceLevel: level }));
  };

  const updateBodyType = (bodyType: BodyType) => {
    setProfile(prev => ({ ...prev, bodyType }));
  };

  const addPerimeter = (perimeter: Omit<Perimeter, 'id' | 'date'>) => {
    const newPerimeter: Perimeter = {
      ...perimeter,
      id: Date.now().toString(),
      date: new Date()
    };
    setProfile(prev => ({
      ...prev,
      perimeters: [...prev.perimeters, newPerimeter]
    }));
  };

  const addWeightRecord = (record: Omit<WeightRecord, 'id' | 'date'>) => {
    const newRecord: WeightRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date()
    };
    setProfile(prev => ({
      ...prev,
      weightHistory: [...prev.weightHistory, newRecord]
    }));
  };

  const updateBodyComposition = (composition: Omit<BodyComposition, 'date'>) => {
    const newComposition: BodyComposition = {
      ...composition,
      date: new Date()
    };
    setProfile(prev => ({
      ...prev,
      bodyComposition: [...prev.bodyComposition, newComposition]
    }));
  };

  const getExperienceLevelName = (level: ProfileData['experienceLevel']) => {
    return experienceLevels[level];
  };

  const getBodyTypes = () => bodyTypes;

  const getPerimeterHistory = (perimeterId: string) => {
    return profile.perimeters
      .filter(p => p.id === perimeterId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getWeightHistory = (days?: number) => {
    let filtered = profile.weightHistory.sort((a, b) => b.date.getTime() - a.date.getTime());
    if (days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(record => record.date >= cutoffDate);
    }
    return filtered;
  };

  const getTotalPerimeter = (date: Date) => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const dayPerimeters = profile.perimeters.filter(p => 
      p.date >= dayStart && p.date <= dayEnd
    );

    return dayPerimeters.reduce((total, p) => total + p.value, 0);
  };

  const value: ProfileContextType = {
    profile,
    isLoading,
    updateExperienceLevel,
    updateBodyType,
    addPerimeter,
    addWeightRecord,
    updateBodyComposition,
    getExperienceLevelName,
    getBodyTypes,
    getPerimeterHistory,
    getWeightHistory,
    getTotalPerimeter
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}; 