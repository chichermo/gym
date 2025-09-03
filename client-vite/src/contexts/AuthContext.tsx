import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { User, AuthState, LoginData, RegisterData } from '../types/index';

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

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

// Estado inicial
const initialState = {
  user: {
    _id: '1',
    username: 'demo_user',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    alias: 'DemoFitness',
    gender: 'masculino' as const,
    dateOfBirth: '1990-01-01',
    height: 175,
    weight: 75,
    phone: '+34 612 345 678',
    instagram: 'demo_fitness',
    facebook: 'demo.fitness',
    fitnessLevel: 'intermedio' as const,
    fitnessGoals: ['ganar_musculo', 'mejorar_fuerza'],
    activityLevel: 'moderadamente_activo' as const,
    medicalConditions: [],
    preferences: {
      workoutDuration: 45,
      workoutDays: 4,
      preferredExercises: [],
      equipmentAvailable: ['pesas_libres', 'mancuernas']
    },
    profileImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjZTVlN2VmIi8+CjxwYXRoIGQ9Ik03NSA0NEM4Ni41NDUyIDQ0IDk2IDUzLjQ1NDggOTYgNjVDOTYgNzYuNTQ1MiA4Ni41NDUyIDg2IDc1IDg2QzYzLjQ1NDggODYgNTQgNzYuNTQ1MiA1NCA2NUM1NCA1My40NTQ4IDYzLjQ1NDggNDQgNzUgNDRaIiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0xMTIgMTEyQzExMiA5OC43NDUyIDEwMC4yNTUgODcgODYgODdDNzEuNzQ1MiA4NyA2MCA5OC43NDUyIDYwIDExMiIgZmlsbD0iIzljYTNhZiIvPgo8L3N2Zz4K',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  } as User,
  token: 'demo_token',
  isAuthenticated: true,
  loading: false
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
        payload: { user: state.user, token: state.token },
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
        payload: { user: state.user, token: state.token },
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
      const updatedUser = { ...state.user, ...data };
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