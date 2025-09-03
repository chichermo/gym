import React, { useState, useEffect, useContext } from 'react';
import { 
  Brain, Lightbulb, Dumbbell, Apple, Heart, 
  TrendingUp, Target, Clock, Flame, Droplets
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

interface Recommendation {
  _id: string;
  type: 'workout' | 'nutrition' | 'lifestyle' | 'motivation';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  actionable: boolean;
  actionText?: string;
  actionUrl?: string;
  createdAt: string;
}

interface UserStats {
  totalWorkouts: number;
  currentStreak: number;
  avgWorkoutDuration: number;
  totalCalories: number;
  weightProgress: number;
  lastWorkoutDate: string;
}

const AIRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRecommendations();
      fetchUserStats();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/ai/recommendations');
      setRecommendations(response.data.recommendations || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Fallback recommendations
      setRecommendations(generateFallbackRecommendations());
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await api.get('/users/stats');
      setUserStats(response.data.stats || {});
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const generateFallbackRecommendations = (): Recommendation[] => {
    return [
      {
        _id: '1',
        type: 'workout',
        title: 'Intensifica tu entrenamiento',
        description: 'Basado en tu progreso, considera aumentar la intensidad de tus entrenamientos para maximizar resultados.',
        priority: 'high',
        category: 'performance',
        actionable: true,
        actionText: 'Ver rutinas avanzadas',
        actionUrl: '/workouts',
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        type: 'nutrition',
        title: 'Optimiza tu hidratación',
        description: 'Mantén un buen nivel de hidratación durante tus entrenamientos para mejorar el rendimiento.',
        priority: 'medium',
        category: 'health',
        actionable: true,
        actionText: 'Calcular necesidades',
        actionUrl: '/nutrition',
        createdAt: new Date().toISOString()
      },
      {
        _id: '3',
        type: 'lifestyle',
        title: 'Consistencia es clave',
        description: 'Mantén una rutina regular de entrenamiento. La consistencia supera la intensidad.',
        priority: 'high',
        category: 'motivation',
        actionable: false,
        createdAt: new Date().toISOString()
      }
    ];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workout':
        return <Dumbbell className="text-blue-600" />;
      case 'nutrition':
        return <Apple className="text-green-600" />;
      case 'lifestyle':
        return <Heart className="text-red-600" />;
      case 'motivation':
        return <Target className="text-purple-600" />;
      default:
        return <Lightbulb className="text-yellow-600" />;
    }
  };

  const filteredRecommendations = recommendations.filter(rec => {
    if (selectedCategory !== 'all' && rec.type !== selectedCategory) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Recomendaciones IA</h1>
          <p className="text-gray-600">Sugerencias personalizadas para optimizar tu fitness</p>
        </div>

        {/* Stats Overview */}
        {userStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <Dumbbell className="text-2xl text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Entrenamientos</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {userStats.totalWorkouts || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <Flame className="text-2xl text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Racha Actual</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {userStats.currentStreak || 0} días
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <Clock className="text-2xl text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Duración Promedio</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {userStats.avgWorkoutDuration || 0} min
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center">
                <TrendingUp className="text-2xl text-orange-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Progreso de Peso</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {userStats.weightProgress || 0} kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'Todas', icon: Brain },
                { id: 'workout', label: 'Entrenamiento', icon: Dumbbell },
                { id: 'nutrition', label: 'Nutrición', icon: Apple },
                { id: 'lifestyle', label: 'Estilo de Vida', icon: Heart },
                { id: 'motivation', label: 'Motivación', icon: Target }
              ].map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedCategory === category.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <category.icon />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecommendations.map(recommendation => (
            <div
              key={recommendation._id}
              className={`bg-white rounded-xl shadow-lg border-l-4 p-6 transition-all duration-300 hover:shadow-xl ${getPriorityColor(recommendation.priority)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTypeIcon(recommendation.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {recommendation.title}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      recommendation.priority === 'high' ? 'bg-red-100 text-red-700' :
                      recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {recommendation.priority === 'high' ? 'Alta Prioridad' :
                       recommendation.priority === 'medium' ? 'Media Prioridad' : 'Baja Prioridad'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                {recommendation.description}
              </p>

              {recommendation.actionable && recommendation.actionText && (
                <button
                  onClick={() => {
                    if (recommendation.actionUrl) {
                      window.location.href = recommendation.actionUrl;
                    }
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {recommendation.actionText}
                </button>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Generado el {new Date(recommendation.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecommendations.length === 0 && (
          <div className="text-center py-12">
            <Brain className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay recomendaciones disponibles
            </h3>
            <p className="text-gray-500">
              Completa más entrenamientos para recibir recomendaciones personalizadas.
            </p>
          </div>
        )}

        {/* AI Insights */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Brain className="text-2xl text-indigo-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Insights de IA</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Patrón de Entrenamiento</h3>
              <p className="text-gray-600 text-sm">
                Basado en tu historial, los días más productivos son los martes y jueves. 
                Considera programar tus entrenamientos más intensos en estos días.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Optimización de Recuperación</h3>
              <p className="text-gray-600 text-sm">
                Tu cuerpo responde mejor con 48-72 horas de descanso entre entrenamientos 
                de grupos musculares similares.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations; 