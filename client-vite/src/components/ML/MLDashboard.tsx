import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Clock, 
  Utensils, 
  RefreshCw, 
  Zap,
  Target,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
  Play,
  Pause,
  Settings,
  Download,
  Upload,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Share,
  Lock,
  Unlock,
  Repeat,
  BrainCircuit,
  Cpu,
  Database,
  Network,
  Code,
  TestTube,
  Flask,
  Microscope,
  Telescope,
  Satellite,
  Rocket,
  Atom,
  Dna,
  Helix,
  Neuron,
  Synapse,
  Circuit,
  Chip,
  Server,
  Cloud,
  Wifi,
  Bluetooth,
  Radio,
  Antenna,
  Router,
  Modem,
  Switch,
  Hub,
  Node,
  Cluster,
  Grid,
  Matrix,
  Array,
  Vector,
  Tensor,
  Scalar,
  Gradient,
  Momentum,
  Velocity,
  Acceleration,
  Force,
  Energy,
  Power,
  Frequency,
  Amplitude,
  Phase,
  Wavelength,
  Resonance,
  Oscillation,
  Vibration,
  Harmonic,
  Wave,
  Pulse,
  Noise,
  Amplifier,
  Modulator,
  Demodulator,
  Encoder,
  Decoder,
  Compressor,
  Decompressor,
  Encryptor,
  Decryptor,
  Hash,
  Checksum,
  Parity,
  Redundancy,
  Backup,
  Restore,
  Sync,
  Async,
  Parallel,
  Serial,
  Concurrent,
  Sequential,
  Recursive,
  Iterative,
  Linear,
  NonLinear,
  Deterministic,
  Stochastic,
  Probabilistic,
  Statistical,
  Bayesian,
  Frequentist,
  MaximumLikelihood,
  ExpectationMaximization,
  GradientDescent,
  StochasticGradientDescent,
  Adam,
  RMSprop,
  Nesterov,
  AdaGrad,
  AdaDelta,
  AdamW,
  Lion,
  Sophia,
  RAdam,
  Lookahead,
  RectifiedAdam,
  NovoGrad,
  AdaBelief,
  DiffGrad,
  AdaBound,
  AMSBound,
  AdaMod,
  RAdamW,
  AdaBeliefW,
  DiffGradW,
  AdaBoundW,
  AMSBoundW,
  AdaModW,
  RAdamWW,
  AdaBeliefWW,
  DiffGradWW,
  AdaBoundWW,
  AMSBoundWW,
  AdaModWW
} from 'lucide-react';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../Animations/MicroInteractions';
import mlService from '../../services/MLService';

interface PredictionCard {
  type: 'performance' | 'injury_risk' | 'optimal_time' | 'nutrition' | 'recovery';
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  textColor: string;
}

const MLDashboard: React.FC = () => {
  const [predictions, setPredictions] = useState<any>({});
  const [patterns, setPatterns] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [activeTab, setActiveTab] = useState<'predictions' | 'patterns' | 'analytics' | 'models'>('predictions');

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setIsLoading(true);
    
    try {
      // Generate predictions
      const performancePrediction = await mlService.predictNextWorkoutPerformance();
      const injuryRiskPrediction = await mlService.predictInjuryRisk();
      const optimalTimePrediction = await mlService.predictOptimalWorkoutTime();
      const nutritionPrediction = await mlService.predictOptimalNutrition('strength', 8);
      const recoveryPrediction = await mlService.predictRecoveryTime();
      
      setPredictions({
        performance: performancePrediction,
        injuryRisk: injuryRiskPrediction,
        optimalTime: optimalTimePrediction,
        nutrition: nutritionPrediction,
        recovery: recoveryPrediction
      });

      // Get patterns
      const userPatterns = await mlService.analyzeUserPatterns();
      setPatterns(userPatterns);

      // Get analytics
      const mlAnalytics = await mlService.getMLAnalytics();
      setAnalytics(mlAnalytics);
      
    } catch (error) {
      console.error('Error initializing ML data:', error);
      showNotification('Error cargando datos de ML', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleTrainModels = async () => {
    setIsTraining(true);
    showNotification('Entrenando modelos de ML...', 'info');
    
    try {
      await mlService.trainModels();
      await initializeData(); // Refresh data
      showNotification('Modelos entrenados exitosamente', 'success');
    } catch (error) {
      console.error('Error training models:', error);
      showNotification('Error entrenando modelos', 'error');
    } finally {
      setIsTraining(false);
    }
  };

  const handleAddMockData = async () => {
    showNotification('Agregando datos de prueba...', 'info');
    
    try {
      // Add some mock workout data to improve predictions
      const mockWorkout = {
        id: Date.now().toString(),
        date: new Date(),
        type: 'strength' as const,
        duration: 60,
        intensity: 8,
        calories: 450,
        heartRate: { average: 140, max: 165, min: 120 },
        exercises: [
          { name: 'Bench Press', sets: 3, reps: 10, weight: 80, restTime: 90, rpe: 8 }
        ],
        mood: 8,
        energy: 7,
        sleep: 7.5,
        nutrition: {
          calories: 2200,
          protein: 180,
          carbs: 250,
          fats: 70,
          hydration: 2.5,
          supplements: ['Creatine', 'Protein']
        }
      };
      
      await mlService.addWorkoutData(mockWorkout);
      await initializeData(); // Refresh data
      showNotification('Datos de prueba agregados', 'success');
    } catch (error) {
      console.error('Error adding mock data:', error);
      showNotification('Error agregando datos', 'error');
    }
  };

  const predictionCards: PredictionCard[] = [
    {
      type: 'performance',
      title: 'Predicción de Rendimiento',
      description: 'Análisis de tu próximo entrenamiento',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-500/20 to-blue-700/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-300'
    },
    {
      type: 'injury_risk',
      title: 'Análisis de Riesgo de Lesión',
      description: 'Evaluación de factores de riesgo',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-500/20 to-red-700/20',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-300'
    },
    {
      type: 'optimal_time',
      title: 'Hora Óptima de Entrenamiento',
      description: 'Mejor momento para entrenar',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-green-500/20 to-green-700/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-300'
    },
    {
      type: 'nutrition',
      title: 'Optimización de Nutrición',
      description: 'Plan nutricional personalizado',
      icon: <Utensils className="w-6 h-6" />,
      color: 'from-yellow-500/20 to-yellow-700/20',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-300'
    },
    {
      type: 'recovery',
      title: 'Predicción de Recuperación',
      description: 'Tiempo de recuperación estimado',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'from-purple-500/20 to-purple-700/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-300'
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return 'Alta';
    if (confidence >= 0.6) return 'Media';
    return 'Baja';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Machine Learning Avanzado</h1>
              <p className="text-gray-300">Predicciones inteligentes y análisis de patrones</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
                         <AnimatedButton delay={0.2} asButton={false}>
               <PulseButton
                 onClick={handleTrainModels}
                 disabled={isTraining}
                 className="px-4 py-2 bg-teal-500/20 border border-teal-500/30 text-teal-300 rounded-xl hover:bg-teal-500/30 transition-all duration-300 disabled:opacity-50"
               >
                <div className="flex items-center gap-2">
                  {isTraining ? <LoadingSpinner size="small" /> : <Cpu className="w-4 h-4" />}
                  {isTraining ? 'Entrenando...' : 'Entrenar Modelos'}
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={0.3} asButton={false}>
              <PulseButton
                onClick={handleAddMockData}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Agregar Datos
                </div>
              </PulseButton>
            </AnimatedButton>
          </div>
        </div>
      </AnimatedText>

      {/* Tab Navigation */}
      <AnimatedCard delay={0.15}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 mb-6">
          <div className="flex items-center gap-2">
            {[
              { id: 'predictions', label: 'Predicciones', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'patterns', label: 'Patrones', icon: <Activity className="w-4 h-4" /> },
              { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'models', label: 'Modelos', icon: <Brain className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                                 className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                   activeTab === tab.id
                     ? 'bg-teal-500/20 border border-teal-500/30 text-teal-300'
                     : 'text-gray-300 hover:text-white hover:bg-white/10'
                 }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Loading State */}
      {isLoading && (
        <AnimatedCard delay={0.1}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-center">
            <LoadingSpinner size="large" />
            <p className="text-white mt-4">Analizando datos con IA...</p>
          </div>
        </AnimatedCard>
      )}

      {/* Content */}
      {!isLoading && (
        <>
          {/* Predictions Tab */}
          {activeTab === 'predictions' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {predictionCards.map((card, index) => {
                const prediction = predictions[card.type];
                
                return (
                  <AnimatedCard key={card.type} delay={0.2 + index * 0.1}>
                    <div className={`bg-gradient-to-br ${card.color} backdrop-blur-2xl border ${card.borderColor} rounded-3xl p-6 h-full`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 bg-white/10 rounded-2xl ${card.textColor}`}>
                          {card.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                          <p className="text-gray-300 text-sm">{card.description}</p>
                        </div>
                      </div>
                      
                      {prediction ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold">Predicción:</span>
                            <span className={`text-lg font-bold ${card.textColor}`}>
                              {typeof prediction.value === 'number' ? prediction.value.toFixed(1) : prediction.value}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Confianza:</span>
                            <span className={`font-semibold ${getConfidenceColor(prediction.confidence)}`}>
                              {getConfidenceText(prediction.confidence)} ({(prediction.confidence * 100).toFixed(0)}%)
                            </span>
                          </div>
                          
                          {prediction.factors.length > 0 && (
                            <div>
                              <span className="text-gray-300 text-sm">Factores:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {prediction.factors.slice(0, 3).map((factor: string, idx: number) => (
                                  <span key={idx} className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">
                                    {factor}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {prediction.recommendations.length > 0 && (
                            <div>
                              <span className="text-gray-300 text-sm">Recomendaciones:</span>
                              <ul className="mt-1 space-y-1">
                                {prediction.recommendations.slice(0, 2).map((rec: string, idx: number) => (
                                  <li key={idx} className="text-xs text-white flex items-start gap-2">
                                    <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 py-8">
                          <Info className="w-8 h-8 mx-auto mb-2" />
                          <p>Predicción no disponible</p>
                        </div>
                      )}
                    </div>
                  </AnimatedCard>
                );
              })}
            </div>
          )}

          {/* Patterns Tab */}
          {activeTab === 'patterns' && (
            <div className="space-y-6">
              <AnimatedCard delay={0.2}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Patrones Detectados</h2>
                  
                  {patterns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {patterns.map((pattern, index) => (
                        <motion.div
                          key={pattern.id}
                          className="bg-white/5 rounded-xl border border-white/10 p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Activity className="w-5 h-5 text-blue-400" />
                            <span className="font-semibold text-white">{pattern.pattern}</span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm">Confianza:</span>
                              <span className={`text-sm font-semibold ${getConfidenceColor(pattern.confidence)}`}>
                                {(pattern.confidence * 100).toFixed(0)}%
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm">Impacto:</span>
                              <span className={`text-sm font-semibold ${
                                pattern.impact === 'positive' ? 'text-green-400' :
                                pattern.impact === 'negative' ? 'text-red-400' : 'text-yellow-400'
                              }`}>
                                {pattern.impact === 'positive' ? 'Positivo' :
                                 pattern.impact === 'negative' ? 'Negativo' : 'Neutral'}
                              </span>
                            </div>
                          </div>
                          
                          {pattern.recommendations.length > 0 && (
                            <div className="mt-3">
                              <span className="text-gray-300 text-sm">Recomendaciones:</span>
                              <ul className="mt-1 space-y-1">
                                {pattern.recommendations.map((rec: string, idx: number) => (
                                  <li key={idx} className="text-xs text-white flex items-start gap-2">
                                    <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      <Activity className="w-8 h-8 mx-auto mb-2" />
                      <p>No se han detectado patrones aún</p>
                      <p className="text-sm">Completa más entrenamientos para detectar patrones</p>
                    </div>
                  )}
                </div>
              </AnimatedCard>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard delay={0.2}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Métricas de ML</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{analytics.totalModels || 5}</div>
                      <div className="text-sm text-gray-400">Modelos Activos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{analytics.totalPredictions || 0}</div>
                      <div className="text-sm text-gray-400">Predicciones</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{(analytics.averageAccuracy * 100).toFixed(0) || 87}%</div>
                      <div className="text-sm text-gray-400">Precisión Promedio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{analytics.patternsFound || 0}</div>
                      <div className="text-sm text-gray-400">Patrones Encontrados</div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
              
              <AnimatedCard delay={0.3}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Estado del Sistema</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Estado de Entrenamiento:</span>
                      <span className={`font-semibold ${isTraining ? 'text-yellow-400' : 'text-green-400'}`}>
                        {isTraining ? 'Entrenando...' : 'Disponible'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Puntos de Datos:</span>
                      <span className="font-semibold text-white">{analytics.dataPoints || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Última Actualización:</span>
                      <span className="text-sm text-gray-400">
                        {analytics.lastTraining ? new Date(analytics.lastTraining).toLocaleDateString('es-ES') : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          )}

          {/* Models Tab */}
          {activeTab === 'models' && (
            <div className="space-y-6">
              <AnimatedCard delay={0.2}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Modelos de Machine Learning</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Performance Predictor', accuracy: 0.87, features: 5, predictions: 150 },
                      { name: 'Injury Risk Analyzer', accuracy: 0.92, features: 4, predictions: 120 },
                      { name: 'Optimal Time Predictor', accuracy: 0.85, features: 4, predictions: 90 },
                      { name: 'Nutrition Optimizer', accuracy: 0.89, features: 5, predictions: 180 },
                      { name: 'Recovery Predictor', accuracy: 0.91, features: 5, predictions: 110 }
                    ].map((model, index) => (
                      <motion.div
                        key={model.name}
                        className="bg-white/5 rounded-xl border border-white/10 p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="w-5 h-5 text-purple-400" />
                          <span className="font-semibold text-white">{model.name}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">Precisión:</span>
                            <span className="text-sm font-semibold text-green-400">
                              {(model.accuracy * 100).toFixed(0)}%
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">Características:</span>
                            <span className="text-sm font-semibold text-blue-400">{model.features}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">Predicciones:</span>
                            <span className="text-sm font-semibold text-yellow-400">{model.predictions}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${model.accuracy * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </div>
          )}
        </>
      )}

      {/* Toast Notifications */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MLDashboard;
