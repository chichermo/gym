import React, { useState } from 'react';
import { Brain, Target, TrendingUp, Clock, Zap, Lightbulb, BarChart3, Activity, Flame, Heart } from 'lucide-react';

// Datos simulados de recomendaciones de IA
const mockAIRecommendations = [
  {
    _id: 'rec1',
    type: 'workout',
    title: 'Optimiza tu Entrenamiento de Pecho',
    description: 'Basado en tu progreso, te recomiendo aumentar el peso en press de banca en un 5%',
    priority: 'high',
    action: 'Ajustar peso en próximo entrenamiento',
    data: { exercise: 'Press de Banca', currentWeight: 80, suggestedWeight: 84 },
    icon: <Target className="w-5 h-5" />
  },
  {
    _id: 'rec2',
    type: 'nutrition',
    title: 'Aumenta tu Consumo de Proteínas',
    description: 'Para tu objetivo de ganar masa muscular, necesitas consumir más proteínas',
    priority: 'medium',
    action: 'Agregar 30g de proteína extra por día',
    data: { currentProtein: 120, targetProtein: 150 },
    icon: <Flame className="w-5 h-5" />
  },
  {
    _id: 'rec3',
    type: 'recovery',
    title: 'Mejora tu Recuperación',
    description: 'Tu frecuencia cardíaca en reposo ha aumentado. Considera más días de descanso',
    priority: 'high',
    action: 'Agregar un día de descanso activo',
    data: { currentRestDays: 1, suggestedRestDays: 2 },
    icon: <Heart className="w-5 h-5" />
  },
  {
    _id: 'rec4',
    type: 'progression',
    title: 'Progresión en Sentadillas',
    description: 'Estás listo para aumentar el peso en sentadillas. Tu técnica es excelente',
    priority: 'medium',
    action: 'Aumentar peso en 5kg',
    data: { exercise: 'Sentadillas', currentWeight: 100, suggestedWeight: 105 },
    icon: <TrendingUp className="w-5 h-5" />
  }
];

// Datos simulados de análisis
const mockAnalytics = {
  strengthProgress: [
    { exercise: 'Press de Banca', startWeight: 60, currentWeight: 80, progress: 33 },
    { exercise: 'Sentadillas', startWeight: 80, currentWeight: 100, progress: 25 },
    { exercise: 'Peso Muerto', startWeight: 90, currentWeight: 120, progress: 33 },
    { exercise: 'Dominadas', startWeight: 3, currentWeight: 8, progress: 167 }
  ],
  weeklyStats: {
    workouts: 4,
    totalTime: 280,
    calories: 2100,
    avgRating: 4.2
  },
  goals: {
    weight: { current: 75, target: 78, unit: 'kg' },
    strength: { current: 80, target: 90, unit: 'kg (press banca)' },
    endurance: { current: 7, target: 10, unit: 'min (plank)' }
  }
};

const PlanPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState(mockAIRecommendations);
  const [analytics, setAnalytics] = useState(mockAnalytics);
  const [selectedTab, setSelectedTab] = useState('recommendations');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-emerald-600';
    if (progress >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col lg:pl-64">
      {/* Banner Demo Mejorado */}
      <div className="w-full bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 border-b border-amber-300 py-3 px-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-amber-700" />
          <span className="text-amber-800 text-sm font-semibold">Plan de IA: Recomendaciones personalizadas basadas en datos simulados</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header Mejorado */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight mb-2">
              Plan de IA
            </h1>
            <p className="text-slate-600 text-lg">Recomendaciones personalizadas para optimizar tu entrenamiento</p>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg">
            <Brain className="w-5 h-5" />
            <span className="font-bold">IA Activa</span>
          </div>
        </div>

        {/* Tabs Mejorados */}
        <div className="flex space-x-2 bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-xl mb-8">
          <button
            onClick={() => setSelectedTab('recommendations')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
              selectedTab === 'recommendations'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <Lightbulb className="w-5 h-5" />
            Recomendaciones
          </button>
          <button
            onClick={() => setSelectedTab('analytics')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
              selectedTab === 'analytics'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Análisis
          </button>
          <button
            onClick={() => setSelectedTab('goals')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
              selectedTab === 'goals'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <Target className="w-5 h-5" />
            Objetivos
          </button>
        </div>

        {/* Contenido de las tabs */}
        {selectedTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendations.map((rec) => (
                <div key={rec._id} className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl text-white">
                        {rec.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{rec.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getPriorityColor(rec.priority)}`}>
                          {rec.priority === 'high' ? 'Alta Prioridad' : rec.priority === 'medium' ? 'Media Prioridad' : 'Baja Prioridad'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-6 text-lg leading-relaxed">{rec.description}</p>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/30">
                    <h4 className="font-bold text-slate-800 mb-3">Acción Recomendada:</h4>
                    <p className="text-slate-700 font-medium">{rec.action}</p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg transform hover:scale-105">
                    Aplicar Recomendación
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="space-y-8">
            {/* Estadísticas semanales mejoradas */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Estadísticas de la Semana</h2>
                  <p className="text-slate-600">Resumen de tu actividad</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{analytics.weeklyStats.workouts}</div>
                  <div className="text-slate-600 font-medium">Entrenamientos</div>
                </div>
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{analytics.weeklyStats.totalTime}</div>
                  <div className="text-slate-600 font-medium">Minutos</div>
                </div>
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{analytics.weeklyStats.calories}</div>
                  <div className="text-slate-600 font-medium">Calorías</div>
                </div>
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{analytics.weeklyStats.avgRating}</div>
                  <div className="text-slate-600 font-medium">Rating Promedio</div>
                </div>
              </div>
            </div>

            {/* Progreso de fuerza mejorado */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Progreso de Fuerza</h2>
                  <p className="text-slate-600">Evolución de tus ejercicios principales</p>
                </div>
              </div>
              <div className="space-y-4">
                {analytics.strengthProgress.map((exercise, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{exercise.exercise}</h3>
                      <p className="text-sm text-slate-600 font-medium">
                        {exercise.startWeight}kg → {exercise.currentWeight}kg
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getProgressColor(exercise.progress)}`}>
                        +{exercise.progress}%
                      </div>
                      <div className="text-sm text-slate-600 font-medium">Progreso</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'goals' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Objetivo de peso mejorado */}
              <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Peso Objetivo</h3>
                </div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{analytics.goals.weight.current}</div>
                  <div className="text-slate-600 font-medium">kg actuales</div>
                </div>
                <div className="bg-slate-200 rounded-full h-3 mb-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${(analytics.goals.weight.current / analytics.goals.weight.target) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-slate-600 font-medium">
                  Objetivo: {analytics.goals.weight.target} kg
                </div>
              </div>

              {/* Objetivo de fuerza mejorado */}
              <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Fuerza Objetivo</h3>
                </div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">{analytics.goals.strength.current}</div>
                  <div className="text-slate-600 font-medium">kg (press banca)</div>
                </div>
                <div className="bg-slate-200 rounded-full h-3 mb-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${(analytics.goals.strength.current / analytics.goals.strength.target) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-slate-600 font-medium">
                  Objetivo: {analytics.goals.strength.target} kg
                </div>
              </div>

              {/* Objetivo de resistencia mejorado */}
              <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Resistencia Objetivo</h3>
                </div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-amber-600 mb-2">{analytics.goals.endurance.current}</div>
                  <div className="text-slate-600 font-medium">min (plank)</div>
                </div>
                <div className="bg-slate-200 rounded-full h-3 mb-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${(analytics.goals.endurance.current / analytics.goals.endurance.target) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-slate-600 font-medium">
                  Objetivo: {analytics.goals.endurance.target} min
                </div>
              </div>
            </div>

            {/* Próximos objetivos mejorados */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Próximos Objetivos Sugeridos</h2>
                  <p className="text-slate-600">Recomendaciones de la IA</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <h3 className="font-bold text-purple-900 mb-3 text-lg">Aumentar Frecuencia</h3>
                  <p className="text-purple-700 text-sm leading-relaxed">La IA sugiere entrenar 5 días por semana para acelerar tu progreso</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <h3 className="font-bold text-blue-900 mb-3 text-lg">Variar Ejercicios</h3>
                  <p className="text-blue-700 text-sm leading-relaxed">Agregar ejercicios de estabilidad para mejorar el rendimiento</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <h3 className="font-bold text-emerald-900 mb-3 text-lg">Optimizar Descanso</h3>
                  <p className="text-emerald-700 text-sm leading-relaxed">Reducir el tiempo de descanso entre series para mayor intensidad</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border border-amber-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <h3 className="font-bold text-amber-900 mb-3 text-lg">Progresión Gradual</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">Aumentar peso en sentadillas y peso muerto gradualmente</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PlanPage; 