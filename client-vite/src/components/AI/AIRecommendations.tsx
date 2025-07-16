import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Lightbulb, Target, TrendingUp, Calendar, 
  Activity, Heart, Zap, Clock, Star, CheckCircle, ArrowRight, X
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'recovery' | 'goal' | 'social';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  category: string;
  estimatedTime?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface AIRecommendationsProps {
  userData: {
    level: string;
    goals: string[];
    preferences: string[];
    recentActivity: any[];
  };
  onApplyRecommendation: (recommendation: Recommendation) => void;
  onDismissRecommendation: (id: string) => void;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  userData,
  onApplyRecommendation,
  onDismissRecommendation
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'workout' | 'nutrition' | 'recovery' | 'goal' | 'social'>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    // Simular generación de recomendaciones basadas en datos del usuario
    setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          type: 'workout',
          title: 'Entrenamiento HIIT Personalizado',
          description: 'Basado en tu nivel intermedio y objetivo de pérdida de grasa, te recomiendo un circuito HIIT de 25 minutos con ejercicios de alta intensidad.',
          confidence: 92,
          priority: 'high',
          category: 'Cardio',
          estimatedTime: 25,
          difficulty: 'intermediate',
          tags: ['HIIT', 'Cardio', 'Pérdida de grasa'],
          action: {
            label: 'Aplicar Entrenamiento',
            onClick: () => console.log('Aplicar entrenamiento HIIT')
          }
        },
        {
          id: '2',
          type: 'nutrition',
          title: 'Plan de Hidratación Optimizado',
          description: 'Tu nivel de actividad sugiere aumentar la hidratación. Bebe 500ml de agua 30 minutos antes del entrenamiento.',
          confidence: 88,
          priority: 'medium',
          category: 'Hidratación',
          tags: ['Hidratación', 'Rendimiento', 'Salud'],
          action: {
            label: 'Configurar Recordatorio',
            onClick: () => console.log('Configurar recordatorio de hidratación')
          }
        },
        {
          id: '3',
          type: 'recovery',
          title: 'Rutina de Estiramiento Post-Entrenamiento',
          description: 'Para mejorar tu recuperación y flexibilidad, incluye 10 minutos de estiramientos dinámicos después de cada sesión.',
          confidence: 85,
          priority: 'medium',
          category: 'Recuperación',
          estimatedTime: 10,
          difficulty: 'beginner',
          tags: ['Estiramiento', 'Recuperación', 'Flexibilidad'],
          action: {
            label: 'Ver Rutina',
            onClick: () => console.log('Ver rutina de estiramiento')
          }
        },
        {
          id: '4',
          type: 'goal',
          title: 'Ajuste de Metas Semanales',
          description: 'Tu progreso sugiere aumentar tu meta de entrenamientos de 3 a 4 por semana para alcanzar mejor tus objetivos.',
          confidence: 78,
          priority: 'high',
          category: 'Metas',
          tags: ['Metas', 'Progreso', 'Motivación'],
          action: {
            label: 'Actualizar Metas',
            onClick: () => console.log('Actualizar metas')
          }
        },
        {
          id: '5',
          type: 'social',
          title: 'Conectar con Entrenadores',
          description: 'Encuentra entrenadores certificados en tu área que se especialicen en tus objetivos de fitness.',
          confidence: 82,
          priority: 'low',
          category: 'Comunidad',
          tags: ['Entrenadores', 'Comunidad', 'Mentoría'],
          action: {
            label: 'Explorar Entrenadores',
            onClick: () => console.log('Explorar entrenadores')
          }
        }
      ];
      
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 2000);
  }, [userData]);

  const getRecommendationIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'workout':
        return <Activity className="w-5 h-5" />;
      case 'nutrition':
        return <Heart className="w-5 h-5" />;
      case 'recovery':
        return <Clock className="w-5 h-5" />;
      case 'goal':
        return <Target className="w-5 h-5" />;
      case 'social':
        return <Star className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high':
        return 'from-red-500 to-pink-600';
      case 'medium':
        return 'from-yellow-500 to-orange-600';
      case 'low':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyColor = (difficulty?: Recommendation['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredRecommendations = recommendations.filter(rec => 
    filter === 'all' || rec.type === filter
  );

  const confidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Recomendaciones de IA</h3>
            <p className="text-gray-600">Personalizadas según tu perfil y progreso</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Todas', icon: Brain },
            { id: 'workout', label: 'Entrenamiento', icon: Activity },
            { id: 'nutrition', label: 'Nutrición', icon: Heart },
            { id: 'recovery', label: 'Recuperación', icon: Clock },
            { id: 'goal', label: 'Metas', icon: Target },
            { id: 'social', label: 'Social', icon: Star }
          ].map((filterOption) => {
            const Icon = filterOption.icon;
            return (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === filterOption.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {filterOption.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Analizando tus datos para generar recomendaciones personalizadas...</p>
        </div>
      )}

      {/* Recommendations Grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-gradient-to-br ${getPriorityColor(recommendation.priority)} rounded-lg`}>
                    {getRecommendationIcon(recommendation.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{recommendation.title}</h4>
                    <p className="text-sm text-gray-600">{recommendation.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`text-sm font-medium ${confidenceColor(recommendation.confidence)}`}>
                    {recommendation.confidence}%
                  </div>
                  <button
                    onClick={() => onDismissRecommendation(recommendation.id)}
                    className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-3">{recommendation.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {recommendation.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  {recommendation.estimatedTime && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {recommendation.estimatedTime} min
                    </div>
                  )}
                  {recommendation.difficulty && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recommendation.difficulty)}`}>
                      {recommendation.difficulty}
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => setShowDetails(showDetails === recommendation.id ? null : recommendation.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  {showDetails === recommendation.id ? 'Ocultar' : 'Ver más'}
                </button>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {showDetails === recommendation.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-200">
                      <h5 className="font-semibold text-gray-800 mb-2">Detalles Técnicos</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Basado en {recommendation.confidence}% de confianza</li>
                        <li>• Prioridad: {recommendation.priority}</li>
                        <li>• Categoría: {recommendation.category}</li>
                        {recommendation.estimatedTime && (
                          <li>• Tiempo estimado: {recommendation.estimatedTime} minutos</li>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button */}
              {recommendation.action && (
                <button
                  onClick={() => onApplyRecommendation(recommendation)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                >
                  <CheckCircle className="w-4 h-4" />
                  {recommendation.action.label}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredRecommendations.length === 0 && (
        <div className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 text-center">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-800 mb-2">No hay recomendaciones</h4>
          <p className="text-gray-600">Completa más actividades para recibir recomendaciones personalizadas</p>
        </div>
      )}

      {/* AI Insights */}
      {!loading && recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Insights de IA</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                {recommendations.filter(r => r.priority === 'high').length}
              </div>
              <div className="text-sm text-gray-600">Recomendaciones Prioritarias</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length)}%
              </div>
              <div className="text-sm text-gray-600">Confianza Promedio</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {recommendations.length}
              </div>
              <div className="text-sm text-gray-600">Total de Sugerencias</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations; 