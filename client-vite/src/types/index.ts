// Tipos básicos
export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  alias?: string;
  gender: 'masculino' | 'femenino' | 'otro';
  dateOfBirth: string;
  height: number;
  weight: number;
  phone?: string;
  instagram?: string;
  facebook?: string;
  fitnessLevel: 'principiante' | 'intermedio' | 'avanzado';
  fitnessGoals: string[];
  activityLevel: 'sedentario' | 'ligeramente_activo' | 'moderadamente_activo' | 'muy_activo' | 'extremadamente_activo';
  medicalConditions?: string[];
  preferences: {
    workoutDuration: number;
    workoutDays: number;
    preferredExercises: string[];
    equipmentAvailable: string[];
  };
  profileImage?: string;
  avatar?: string;
  name?: string;
  level?: number;
  xp?: number;
  nextLevelXp?: number;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  
  // Nuevas propiedades del perfil
  experienceLevel: ExperienceLevel;
  bodyType: BodyType;
  physicalInfo: PhysicalInfo;
  measurements: Measurement[];
  bodyComposition?: BodyComposition;
  weightHistory: WeightRecord[];
}

// Nuevos tipos para el perfil
export type ExperienceLevel = 
  | 'Básico I'    // Soy nuevo en el gym
  | 'Básico II'   // Menos de 6 meses
  | 'Intermedio I' // De 6 meses a 1 año
  | 'Intermedio II' // De 1 a 3 años
  | 'Avanzado I'  // De 3 a 5 años
  | 'Avanzado II'; // Más de 5 años

export type BodyType = 'Endomorfo' | 'Ectomorfo' | 'Mesomorfo';

export interface PhysicalInfo {
  weight: number;
  height: number;
  age: number;
  bodyType: BodyType;
}

export interface Measurement {
  id: string;
  date: string;
  timestamp: string;
  cintura: number;
  gluteoMaximo: number;
  muslo: number;
  pantorrilla: number;
  brazoRelajado: number;
  brazoContraido: number;
  pectoral: number;
  total: number; // Suma de todos los perímetros
}

export interface BodyComposition {
  id: string;
  date: string;
  timestamp: string;
  grasaCorporal: number;
  musculatura: number;
  pliegues: {
    tricipital: number;
    subescapular: number;
    suprailiaco: number;
    abdominal: number;
    musloAnterior: number;
    pantorrilla: number;
  };
}

export interface WeightRecord {
  id: string;
  date: string;
  timestamp: string;
  weight: number;
  photo?: string; // URL de la foto opcional
  notes?: string;
}

// Tipos de ejercicio
export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string[];
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string;
  videoUrl?: string;
  imageUrl?: string;
}

// Tipos de entrenamiento
export interface Workout {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'hiit';
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: {
    exercise: Exercise;
    sets: number;
    reps: number;
    weight?: number;
    duration?: number;
    rest: number;
  }[];
  calories: number;
  description: string;
  tags: string[];
  isCompleted: boolean;
  completedAt?: string;
  rating?: number;
}

// Tipos de progreso
export interface Progress {
  id: string;
  type: 'weight' | 'measurements' | 'workout' | 'photo' | 'goal';
  date: string;
  weight?: number;
  measurements?: {
    chest: number;
    waist: number;
    hips: number;
    arms: number;
    thighs: number;
  };
  workout?: {
    workoutId: string;
    duration: number;
    calories: number;
    rating: number;
  };
  photos?: string[];
  goals?: {
    type: string;
    target: number;
    current: number;
    unit: string;
  };
  notes?: string;
}

// Tipos de logros
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'workout' | 'streak' | 'goal' | 'social' | 'special';
  points: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

// Tipos de notificaciones
export interface Notification {
  id: string;
  type: 'workout' | 'achievement' | 'reminder' | 'social' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Tipos de recomendaciones de IA
export interface AIRecommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'recovery' | 'goal';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  isApplied: boolean;
  createdAt: string;
}

// Tipos de nutrición
export interface Nutrition {
  id: string;
  date: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  notes?: string;
}

// Tipos de calendario
export interface CalendarEvent {
  id: string;
  title: string;
  type: 'workout' | 'nutrition' | 'goal' | 'reminder';
  date: string;
  time?: string;
  duration?: number;
  description?: string;
  isCompleted: boolean;
}

// Tipos de comunidad
export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  type: 'workout' | 'achievement' | 'question' | 'motivation';
  likes: number;
  comments: number;
  createdAt: string;
  media?: string[];
}

// Tipos de wearables
export interface WearableData {
  id: string;
  type: 'heart_rate' | 'steps' | 'sleep' | 'calories' | 'activity';
  value: number;
  unit: string;
  timestamp: string;
  source: string;
}

// Tipos de análisis
export interface Analytics {
  period: string;
  workouts: {
    total: number;
    duration: number;
    calories: number;
    avgRating: number;
  };
  progress: {
    weight: number[];
    measurements: number[];
    goals: number[];
  };
  trends: {
    weekly: any[];
    monthly: any[];
  };
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

export interface Ejercicio {
  id: string;
  nombre: string;
  grupoMuscular: string;
  accesorio: string;
  etiquetas: string[];
}

// Tipos para el sistema de trofeos
export interface Trophy {
  id: string;
  name: string;
  description: string;
  category: TrophyCategory;
  condition: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  target?: number;
  coinsReward: number;
  animation?: string;
}

export type TrophyCategory = 
  | 'Prueba tu constancia'
  | 'Composición corporal'
  | 'Técnicas de entrenamiento'
  | 'Levantamientos';

export interface TrophyInfo {
  id: string;
  name: string;
  description: string;
  condition: string;
  category: TrophyCategory;
  icon: string;
  coinsReward: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

// Ente informativo para trofeos
export interface InfoEntity {
  id: string;
  name: string;
  avatar: string;
  messages: {
    welcome: string;
    trophyUnlocked: string;
    conditionInfo: string;
    motivation: string;
  };
  animations: {
    idle: string;
    celebration: string;
    explanation: string;
  };
} 