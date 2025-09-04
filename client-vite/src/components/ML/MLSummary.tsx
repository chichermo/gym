import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  Clock, 
  Utensils, 
  ArrowRight,
  Activity,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Zap
} from 'lucide-react';

interface MLSummaryProps {
  predictions: any[];
  models: any[];
  analytics: any[];
  onViewDetails: () => void;
  onRunAnalysis: () => void;
  isLoading: boolean;
}

const MLSummary: React.FC<MLSummaryProps> = ({
  predictions,
  models,
  analytics,
  onViewDetails,
  onRunAnalysis,
  isLoading
}) => {
  const topPrediction = predictions[0];
  const activeModels = models.filter(model => model.isActive);
  const recentAnalytics = analytics.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-teal-500/20 rounded-xl">
              <Brain className="w-5 h-5 text-teal-400" />
            </div>
            <span className="text-gray-400 text-sm">Modelos Activos</span>
          </div>
          <div className="text-2xl font-bold text-white">{activeModels.length}</div>
          <div className="text-xs text-gray-400">de {models.length} total</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-gray-400 text-sm">Predicciones</span>
          </div>
          <div className="text-2xl font-bold text-white">{predictions.length}</div>
          <div className="text-xs text-gray-400">últimas 24h</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-gray-400 text-sm">Precisión</span>
          </div>
          <div className="text-2xl font-bold text-white">94.2%</div>
          <div className="text-xs text-gray-400">promedio</div>
        </motion.div>
      </div>

      {/* Top Prediction */}
      {topPrediction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 backdrop-blur-2xl border border-teal-500/20 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-500/20 rounded-xl">
                <Zap className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Predicción Principal</h3>
                <p className="text-gray-400 text-sm">Basada en tus datos recientes</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-400">{topPrediction.confidence}%</div>
              <div className="text-xs text-gray-400">confianza</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <span className="text-white font-medium">{topPrediction.title}</span>
              <span className="text-teal-400 font-semibold">{topPrediction.value}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {topPrediction.description}
            </p>
          </div>
        </motion.div>
      )}

      {/* Active Models */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Modelos Activos</h3>
          <span className="text-sm text-gray-400">{activeModels.length} ejecutándose</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeModels.slice(0, 4).map((model, index) => (
            <div
              key={model.id}
              className="p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  model.type === 'performance' ? 'bg-blue-500/20' :
                  model.type === 'injury' ? 'bg-red-500/20' :
                  model.type === 'nutrition' ? 'bg-green-500/20' :
                  'bg-purple-500/20'
                }`}>
                  {model.type === 'performance' ? <TrendingUp className="w-4 h-4 text-blue-400" /> :
                   model.type === 'injury' ? <Shield className="w-4 h-4 text-red-400" /> :
                   model.type === 'nutrition' ? <Utensils className="w-4 h-4 text-green-400" /> :
                   <Clock className="w-4 h-4 text-purple-400" />}
                </div>
                <span className="text-white font-medium text-sm">{model.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{model.status}</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Activo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Análisis Recientes</h3>
          <span className="text-sm text-gray-400">Últimas 24h</span>
        </div>
        
        <div className="space-y-3">
          {recentAnalytics.map((analytic, index) => (
            <div
              key={analytic.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <span className="text-white font-medium text-sm">{analytic.title}</span>
                  <p className="text-gray-400 text-xs">{analytic.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-white">{analytic.value}</div>
                <div className="text-xs text-gray-400">{analytic.time}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={onRunAnalysis}
          className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300"
        >
          <Activity className="w-5 h-5" />
          Ejecutar Análisis
        </button>
        
        <button
          onClick={onViewDetails}
          className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all duration-300"
        >
          Ver Detalles
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};

export default MLSummary;
