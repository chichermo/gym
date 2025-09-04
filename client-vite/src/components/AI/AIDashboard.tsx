import React, { useState, useEffect } from 'react';
import { useAI } from '../../contexts/AIContext';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../Animations/MicroInteractions';
import AIOnboarding from './AIOnboarding';
import AISummary from './AISummary';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  Lightbulb, 
  Shield, 
  Activity, 
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings,
  BarChart3,
  Calendar,
  Dumbbell,
  Heart,
  ArrowRight,
  Plus,
  Info
} from 'lucide-react';

const AIDashboard: React.FC = () => {
  const { 
    recommendations, 
    isLoading, 
    analysis, 
    workoutPlans, 
    isAIActive,
    generateRecommendations, 
    acceptRecommendation, 
    dismissRecommendation,
    getMotivationalMessage,
    generateWorkoutPlan,
    analyzeProgress,
    toggleAI,
    getPersonalizedInsights,
    predictNextWorkout
  } = useAI();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('intermediate');

  // Mostrar onboarding si es la primera vez
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('ai-onboarding-completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('ai-onboarding-completed', 'true');
    showNotification('¡IA configurada exitosamente!', 'success');
  };

  const handleGenerateRecommendations = async () => {
    await generateRecommendations();
    showNotification('Nuevas recomendaciones generadas con IA', 'success');
  };

  const handleAcceptRecommendation = (id: string) => {
    acceptRecommendation(id);
    showNotification('Recomendación aplicada', 'success');
  };

  const handleDismissRecommendation = (id: string) => {
    dismissRecommendation(id);
    showNotification('Recomendación descartada', 'info');
  };

  const handleGenerateWorkoutPlan = async () => {
    if (selectedGoals.length === 0) {
      showNotification('Selecciona al menos un objetivo', 'warning');
      return;
    }
    
    try {
      const plan = await generateWorkoutPlan(selectedGoals, selectedLevel);
      showNotification(`Plan "${plan.name}" generado exitosamente`, 'success');
    } catch (error) {
      showNotification('Error al generar plan de entrenamiento', 'error');
    }
  };

  const handleViewDetails = () => {
    setShowDetailedView(true);
  };

  const handleBackToSummary = () => {
    setShowDetailedView(false);
  };

  const goals = [
    'Pérdida de peso',
    'Ganancia muscular',
    'Mejora cardiovascular',
    'Flexibilidad',
    'Fuerza',
    'Resistencia'
  ];

  const levels = [
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' }
  ];

  // Vista simplificada (por defecto)
  if (!showDetailedView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        {/* Header */}
        <AnimatedText delay={0.1}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Inteligencia Artificial</h1>
                <p className="text-gray-300">Tu asistente personal de entrenamiento</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <AnimatedButton delay={0.2} asButton={false}>
                <PulseButton
                  onClick={() => setShowOnboarding(true)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <Info className="w-4 h-4 text-white" />
                </PulseButton>
              </AnimatedButton>
              
              <AnimatedButton delay={0.3} asButton={false}>
                <PulseButton
                  onClick={toggleAI}
                  className={`px-6 py-3 rounded-2xl backdrop-blur-2xl border transition-all duration-300 ${
                    isAIActive 
                      ? 'bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30' 
                      : 'bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    {isAIActive ? 'IA Activa' : 'IA Inactiva'}
                  </div>
                </PulseButton>
              </AnimatedButton>
            </div>
          </div>
        </AnimatedText>

        {/* Vista Resumida */}
        <AISummary
          analysis={analysis}
          recommendations={recommendations}
          onViewDetails={handleViewDetails}
          onGeneratePlan={handleGenerateWorkoutPlan}
        />

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

        {/* Onboarding */}
        <AIOnboarding
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={handleOnboardingComplete}
        />
      </div>
    );
  }

  // Vista detallada (cuando el usuario hace clic en "Ver Análisis Completo")
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header con botón de regreso */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <PulseButton
              onClick={handleBackToSummary}
              className="p-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5 text-white rotate-180" />
            </PulseButton>
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Análisis Completo de IA</h1>
              <p className="text-gray-300">Detalles avanzados y configuración</p>
            </div>
          </div>
        </div>
      </AnimatedText>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel Izquierdo */}
        <div className="space-y-6">
          {/* Estado de Rendimiento */}
          <AnimatedCard delay={0.3}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Estado de Rendimiento</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Rendimiento General:</span>
                  <span className={`font-semibold ${
                    analysis.performance === 'excellent' ? 'text-green-400' :
                    analysis.performance === 'good' ? 'text-blue-400' :
                    analysis.performance === 'improving' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {analysis.performance === 'excellent' && 'Excelente'}
                    {analysis.performance === 'good' && 'Bueno'}
                    {analysis.performance === 'improving' && 'Mejorando'}
                    {analysis.performance === 'needs_attention' && 'Necesita Atención'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-gray-300 text-sm">Tendencias:</span>
                  <div className="flex flex-wrap gap-2">
                    {analysis.trends.map((trend, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm">
                        {trend.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-gray-300 text-sm">Logro de Metas:</span>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${analysis.predictions.goalAchievement}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-300">{analysis.predictions.goalAchievement}%</span>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Mensaje Motivacional */}
          <AnimatedCard delay={0.4}>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-2xl border border-purple-500/30 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-pink-400" />
                <h2 className="text-xl font-semibold text-white">Mensaje del Día</h2>
              </div>
              <p className="text-lg text-white/90 leading-relaxed">
                {getMotivationalMessage()}
              </p>
            </div>
          </AnimatedCard>

          {/* Generador de Planes */}
          <AnimatedCard delay={0.5}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Dumbbell className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-white">Generar Plan de Entrenamiento</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Objetivos:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {goals.map((goal) => (
                      <label key={goal} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedGoals.includes(goal)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedGoals([...selectedGoals, goal]);
                            } else {
                              setSelectedGoals(selectedGoals.filter(g => g !== goal));
                            }
                          }}
                          className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-300">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Nivel:</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500"
                  >
                    {levels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <AnimatedButton delay={0.6} asButton={false}>
                  <PulseButton
                    onClick={handleGenerateWorkoutPlan}
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <LoadingSpinner size="sm" />
                        Generando Plan...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Generar Plan con IA
                      </div>
                    )}
                  </PulseButton>
                </AnimatedButton>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Panel Derecho */}
        <div className="space-y-6">
          {/* Recomendaciones de IA */}
          <AnimatedCard delay={0.3}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-semibold text-white">Recomendaciones de IA</h2>
                </div>
                <AnimatedButton delay={0.4} asButton={false}>
                  <PulseButton
                    onClick={handleGenerateRecommendations}
                    disabled={isLoading}
                    className="p-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    <RefreshCw className={`w-5 h-5 text-white ${isLoading ? 'animate-spin' : ''}`} />
                  </PulseButton>
                </AnimatedButton>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recommendations.map((rec, index) => (
                  <AnimatedCard key={rec.id} delay={0.5 + index * 0.1}>
                    <div className={`p-4 rounded-2xl border backdrop-blur-2xl ${
                      rec.priority === 'high' ? 'bg-red-500/20 border-red-500/30 text-red-300' :
                      rec.priority === 'medium' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' :
                      'bg-green-500/20 border-green-500/30 text-green-300'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-white/20 rounded-full">
                            {rec.type.toUpperCase()}
                          </span>
                          <span className="text-xs px-2 py-1 bg-white/20 rounded-full">
                            {rec.impact}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptRecommendation(rec.id)}
                            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDismissRecommendation(rec.id)}
                            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold mb-2">{rec.title}</h3>
                      <p className="text-sm mb-3 opacity-90">{rec.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">
                            {rec.timestamp?.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">Confianza:</span>
                          <div className="w-16 bg-white/20 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                              style={{ width: `${rec.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs">{Math.round(rec.confidence * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Insights Personalizados */}
          <AnimatedCard delay={0.6}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-orange-400" />
                <h2 className="text-xl font-semibold text-white">Insights Personalizados</h2>
              </div>
              
              <div className="space-y-3">
                {getPersonalizedInsights().map((insight, index) => (
                  <AnimatedCard key={index} delay={0.7 + index * 0.1}>
                    <div className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl">
                      <p className="text-sm text-white/90">{insight}</p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Próximo Entrenamiento */}
          <AnimatedCard delay={0.7}>
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-2xl border border-blue-500/30 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white">Próximo Entrenamiento Sugerido</h2>
              </div>
              
              <div className="p-4 bg-white/10 rounded-2xl">
                <p className="text-lg text-white/90 font-medium">
                  {predictNextWorkout()}
                </p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Planes Generados */}
      {workoutPlans.length > 0 && (
        <AnimatedCard delay={0.8}>
          <div className="mt-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Dumbbell className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Planes de Entrenamiento Generados</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workoutPlans.map((plan, index) => (
                <AnimatedCard key={plan.id} delay={0.9 + index * 0.1}>
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{plan.name}</h3>
                      <span className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                        {plan.difficulty}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{plan.duration} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{plan.focus.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {plan.exercises.slice(0, 3).map((exercise, idx) => (
                        <div key={idx} className="text-xs text-gray-400">
                          • {exercise.name} - {exercise.sets}x{exercise.reps}
                        </div>
                      ))}
                      {plan.exercises.length > 3 && (
                        <div className="text-xs text-gray-400">
                          +{plan.exercises.length - 3} ejercicios más
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Confianza IA:</span>
                        <span className="text-xs text-green-400">{Math.round(plan.confidence * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedCard>
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

      {/* Onboarding */}
      <AIOnboarding
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default AIDashboard;
