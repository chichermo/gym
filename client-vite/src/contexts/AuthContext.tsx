import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { User, AuthState, LoginData, RegisterData } from '../types/index';

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Usuario de prueba temporal
const mockUser: User = {
  _id: '1',
  username: 'usuario_demo',
  email: 'demo@fitness.com',
  firstName: 'Usuario',
  lastName: 'Demo',
  gender: 'masculino',
  dateOfBirth: '1990-01-01',
  height: 175,
  weight: 70,
  fitnessLevel: 'intermedio',
  fitnessGoals: ['perder_peso', 'ganar_musculo'],
  activityLevel: 'moderadamente_activo',
  medicalConditions: [],
  preferences: {
    workoutDuration: 45,
    workoutDays: 4,
    preferredExercises: ['sentadillas', 'flexiones', 'plancha'],
    equipmentAvailable: ['pesas', 'bandas', 'colchoneta']
  },
  profileImage: '',
  isActive: true,
  lastLogin: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const initialState: AuthState = {
  user: mockUser, // Usuario de prueba por defecto
  token: 'mock-token',
  isAuthenticated: true, // Autenticado por defecto
  loading: false,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (data: LoginData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      // Simular delay de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usar el usuario mock para cualquier login
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: mockUser, token: 'mock-token' },
      });
    } catch (error: any) {
      const message = 'Error en el inicio de sesión';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw new Error(message);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      // Simular delay de registro
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usar el usuario mock para cualquier registro
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: mockUser, token: 'mock-token' },
      });
    } catch (error: any) {
      const message = 'Error en el registro';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw new Error(message);
    }
  };

  const logout = () => {
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      // Simular actualización del perfil
      const updatedUser = { ...mockUser, ...data };
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error: any) {
      const message = 'Error actualizando perfil';
      throw new Error(message);
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}; 