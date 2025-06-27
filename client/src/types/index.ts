// Tipos de usuario
export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'masculino' | 'femenino' | 'otro';
  dateOfBirth: string;
  height: number;
  weight: number;
  fitnessLevel: 'principiante' | 'intermedio' | 'avanzado';
  fitnessGoals: string[];
  activityLevel: 'sedentario' | 'ligeramente_activo' | 'moderadamente_activo' | 'muy_activo' | 'extremadamente_activo';
  medicalConditions: string[];
  preferences: {
    workoutDuration: number;
    workoutDays: number;
    preferredExercises: string[];
    equipmentAvailable: string[];
  };
  profileImage?: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos de ejercicio
export interface Exercise {
  _id: string;
  name: string;
  description: string;
  instructions: string;
  category: 'fuerza' | 'cardio' | 'flexibilidad' | 'equilibrio' | 'funcional' | 'calistenia' | 'peso_libre' | 'máquina' | 'bandas' | 'yoga';
  primaryMuscles: string[];
  secondaryMuscles: string[];
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  equipment: string[];
  bodyPart: 'superior' | 'inferior' | 'core' | 'full_body' | 'cardio';
  movementType: 'empuje' | 'tirón' | 'sentadilla' | 'bisagra' | 'lunge' | 'rotación' | 'isométrico';
  forceType: 'push' | 'pull' | 'static' | 'dynamic';
  mechanics: 'compound' | 'isolation';
  targetReps: {
    min: number;
    max: number;
  };
  targetSets: {
    min: number;
    max: number;
  };
  restTime: number;
  duration?: number;
  caloriesPerMinute: number;
  videoUrl?: string;
  imageUrl?: string;
  tips: string[];
  variations: Array<{
    name: string;
    description: string;
    difficulty: 'principiante' | 'intermedio' | 'avanzado';
  }>;
  isPublic: boolean;
  createdBy?: string;
  tags: string[];
  rating: {
    average: number;
    count: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tipos de entrenamiento
export interface Workout {
  _id: string;
  name: string;
  description?: string;
  type: 'fuerza' | 'cardio' | 'flexibilidad' | 'equilibrio' | 'funcional' | 'hiit' | 'yoga' | 'pilates';
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  duration: number;
  exercises: Array<{
    exercise: Exercise | string;
    sets: number;
    reps: number;
    duration?: number;
    rest: number;
    weight?: number;
    notes?: string;
  }>;
  targetMuscles: string[];
  equipment: string[];
  calories?: number;
  isPublic: boolean;
  createdBy: string | User;
  tags: string[];
  rating: {
    average: number;
    count: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tipos de progreso
export interface Progress {
  _id: string;
  user: string | User;
  date: string;
  type: 'weight' | 'measurements' | 'workout' | 'photo' | 'goal';
  weight?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
    calves?: number;
    neck?: number;
    shoulders?: number;
  };
  workout?: {
    workoutId?: string | Workout;
    duration?: number;
    calories?: number;
    exercises?: Array<{
      exerciseId: string | Exercise;
      sets: Array<{
        reps: number;
        weight?: number;
        duration?: number;
        rest?: number;
        completed: boolean;
      }>;
      notes?: string;
    }>;
    rating?: number;
    difficulty?: 'fácil' | 'moderado' | 'difícil';
  };
  photos?: Array<{
    url: string;
    type: 'front' | 'back' | 'side' | 'other';
    description?: string;
  }>;
  goals?: Array<{
    type: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'endurance' | 'strength' | 'flexibility';
    target: number;
    current: number;
    unit: 'kg' | 'lbs' | 'cm' | 'inches' | 'minutes' | 'reps';
    deadline?: string;
    completed: boolean;
  }>;
  bodyFat?: number;
  muscleMass?: number;
  hydration?: number;
  sleep?: number;
  stress?: number;
  energy?: number;
  notes?: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tipos de plan de entrenamiento
export interface WorkoutPlan {
  user: string;
  duration: number;
  workoutsPerWeek: number;
  workoutDuration: number;
  focusAreas: string[];
  equipment: string[];
  weeks: Array<{
    weekNumber: number;
    workouts: Workout[];
  }>;
}

// Tipos de autenticación
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: 'masculino' | 'femenino' | 'otro';
  dateOfBirth: string;
  height: number;
  weight: number;
  fitnessLevel: 'principiante' | 'intermedio' | 'avanzado';
  fitnessGoals: string[];
  activityLevel: 'sedentario' | 'ligeramente_activo' | 'moderadamente_activo' | 'muy_activo' | 'extremadamente_activo';
  medicalConditions?: string[];
  preferences?: {
    workoutDuration?: number;
    workoutDays?: number;
    preferredExercises?: string[];
    equipmentAvailable?: string[];
  };
}

// Tipos de API
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  details?: any[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Tipos de formularios
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox' | 'radio';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

// Tipos de notificaciones
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
} 