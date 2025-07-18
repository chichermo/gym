import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Zap, Target, TrendingUp, Clock, 
  Star, ArrowRight, Sparkles, Lightbulb, Trophy
} from 'lucide-react';
import { useAI } from '../../contexts/AIContext';
import { useTheme } from '../../contexts/ThemeContext';

const AIRecommendations: React.FC = () => {
  const { recommendations, analysis, isLoading, getMotivationalMessage } = useAI();
  const { theme } = useTheme();
  const [selectedType, setSelectedType] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Zap className="w-5 h-5" />;
      case 'nutrition': return <Target className="w-5 h-5" />;
      case 'recovery': return <Clock className="w-5 h-5" />;
      case 'motivation': return <Sparkles className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workout': return 'from-blue-500 to-indigo-500';
      case 'nutrition': return 'from-green-500 to-emerald-500';
      case 'recovery': return 'from-purple-500 to-pink-500';
      case 'motivation': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredRecommendations = selectedType === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === selectedType);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 rounded-2xl"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" 
               style={{ borderColor: theme.colors.primary }} />
          <span className="ml-3" style={{ color: theme.colors.text }}>
            Analizando tus datos...
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con mensaje motivacional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl text-center"
        style={{
          background: theme.gradients.primary,
          color: 'white'
        }}
      >
        <Brain className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">IA Fitness Pro</h3>
        <p className="text-lg opacity-90">{getMotivationalMessage()}</p>
      </motion.div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {['all', 'workout', 'nutrition', 'recovery', 'motivation'].map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedType === type 
                ? 'text-white shadow-lg' 
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              background: selectedType === type 
                ? theme.gradients.primary 
                : theme.colors.background,
              color: selectedType === type 
                ? 'white' 
                : theme.colors.text,
              border: `1px solid ${selectedType === type 
                ? theme.colors.primary 
                : theme.colors.border}`
            }}
          >
            {type === 'all' ? 'Todas' : type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Análisis de progreso */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl border"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6" style={{ color: theme.colors.primary }} />
            <h4 className="text-xl font-semibold" style={{ color: theme.colors.text }}>
              Análisis de Progreso
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-70 mb-2">Nivel de Fitness</p>
              <p className="font-semibold capitalize">{analysis.fitnessLevel}</p>
            </div>
            <div>
              <p className="text-sm opacity-70 mb-2">Tendencia</p>
              <p className="font-semibold capitalize">{analysis.progressTrend}</p>
            </div>
            <div>
              <p className="text-sm opacity-70 mb-2">Próximo Hito</p>
              <p className="font-semibold">{analysis.nextMilestone}</p>
            </div>
            <div>
              <p className="text-sm opacity-70 mb-2">Tiempo Estimado</p>
              <p className="font-semibold">{analysis.estimatedTimeToGoal} días</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recomendaciones */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold" style={{ color: theme.colors.text }}>
          Recomendaciones Personalizadas ({filteredRecommendations.length})
        </h4>
        
        <AnimatePresence>
          {filteredRecommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border cursor-pointer hover:shadow-lg transition-all duration-200"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className={`p-3 rounded-xl bg-gradient-to-r ${getTypeColor(recommendation.type)}`}
                >
                  {getTypeIcon(recommendation.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold" style={{ color: theme.colors.text }}>
                      {recommendation.title}
                    </h5>
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${getPriorityColor(recommendation.priority)}`} />
                      <span className="text-sm opacity-70">
                        {Math.round(recommendation.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm opacity-80 mb-3" style={{ color: theme.colors.textSecondary }}>
                    {recommendation.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-60">
                      {recommendation.timestamp.toLocaleDateString()}
                    </span>
                    
                    {recommendation.actionUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: theme.colors.primary,
                          color: 'white'
                        }}
                      >
                        Ver más
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIRecommendations; 