import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Heart, 
  Zap, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { AnimatedCard, AnimatedText } from '../Animations/AnimatedComponents';
import { PulseButton } from '../Animations/MicroInteractions';

interface AIInsight {
  id: string;
  type: 'positive' | 'warning' | 'info';
  title: string;
  description: string;
  action?: string;
  icon: React.ReactNode;
  color: string;
}

interface AISummaryProps {
  analysis: any;
  recommendations: any[];
  onViewDetails: () => void;
  onGeneratePlan: () => void;
}

const AISummary: React.FC<AISummaryProps> = ({ 
  analysis, 
  recommendations, 
  onViewDetails, 
  onGeneratePlan 
}) => {
  const insights: AIInsight[] = [
    {
      id: 'performance',
      type: 'positive',
      title: 'Rendimiento Excelente',
      description: 'Tu rendimiento general está mejorando consistentemente',
      action: 'Ver detalles',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-400'
    },
    {
      id: 'goals',
      type: 'info',
      title: 'Progreso hacia Objetivos',
      description: `Has completado ${analysis.predictions?.goalAchievement || 0}% de tus objetivos`,
      action: 'Ver progreso',
      icon: <Target className="w-5 h-5" />,
      color: 'text-blue-400'
    },
    {
      id: 'recovery',
      type: 'warning',
      title: 'Recuperación Importante',
      description: 'Considera un día de descanso para optimizar tu rendimiento',
      action: 'Ver recomendaciones',
      icon: <Heart className="w-5 h-5" />,
      color: 'text-yellow-400'
    }
  ];

  const topRecommendations = recommendations.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header Resumido */}
      <AnimatedText delay={0.1}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Resumen de IA</h2>
          <p className="text-gray-300">Tu asistente personal analiza tu progreso y te da recomendaciones</p>
        </div>
      </AnimatedText>

      {/* Insights Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <AnimatedCard key={insight.id} delay={0.2 + index * 0.1}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`${insight.color}`}>
                  {insight.icon}
                </div>
                <h3 className="font-semibold text-white text-sm">{insight.title}</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">{insight.description}</p>
              {insight.action && (
                <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  {insight.action} →
                </button>
              )}
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Recomendación Principal */}
      {topRecommendations.length > 0 && (
        <AnimatedCard delay={0.4}>
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-2xl border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">Recomendación Principal</h3>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-white mb-2">{topRecommendations[0].title}</h4>
              <p className="text-gray-300 text-sm">{topRecommendations[0].description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Confianza:</span>
                <div className="w-16 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                    style={{ width: `${topRecommendations[0].confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-300">{Math.round(topRecommendations[0].confidence * 100)}%</span>
              </div>
              
              <PulseButton
                onClick={onViewDetails}
                className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
              >
                Ver Todas
              </PulseButton>
            </div>
          </div>
        </AnimatedCard>
      )}

      {/* Acciones Rápidas */}
      <AnimatedCard delay={0.5}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PulseButton
              onClick={onGeneratePlan}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-xl hover:from-green-500/30 hover:to-teal-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Generar Plan IA</span>
              </div>
              <ArrowRight className="w-4 h-4 text-green-400" />
            </PulseButton>
            
            <PulseButton
              onClick={onViewDetails}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Ver Análisis Completo</span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </PulseButton>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AISummary;
