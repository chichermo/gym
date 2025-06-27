import React, { useState, useEffect } from 'react';
import { Brain, Target, TrendingUp, Calendar, Clock, Zap, Lightbulb, BarChart3, Activity, Trophy, Flame, Heart } from 'lucide-react';
import NavBar from '../../components/NavBar';

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
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-white flex flex-col">
      <NavBar />
      
      {/* Banner Demo */}
      <div className="w-full bg-gradient-to-r from-purple-200 via-purple-50 to-purple-100 border-b border-purple-300 py-2 px-4 flex items-center justify-center">
        <Brain className="w-4 h-4 text-purple-600 mr-2" />
        <span className="text-purple-800 text-sm font-medium">Plan de IA: Recomendaciones personalizadas basadas en datos simulados</span>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
              Plan de IA
            </h1>
            <p className="text-gray-600 text-lg">Recomendaciones personalizadas para optimizar tu entrenamiento</p>
          </div>
          <div className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl">
            <Brain className="w-5 h-5" />
            <span className="font-semibold">IA Activa</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg mb-8">
          <button
            onClick={() => setSelectedTab('recommendations')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'recommendations'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            Recomendaciones
          </button>
          <button
            onClick={() => setSelectedTab('analytics')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'analytics'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Análisis
          </button>
          <button
            onClick={() => setSelectedTab('goals')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'goals'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Target className="w-4 h-4" />
            Objetivos
          </button>
        </div>

        {/* Contenido de las tabs */}
        {selectedTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendations.map((rec) => (
                <div key={rec._id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        {rec.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{rec.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority === 'high' ? 'Alta Prioridad' : rec.priority === 'medium' ? 'Media Prioridad' : 'Baja Prioridad'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{rec.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Acción Recomendada:</h4>
                    <p className="text-gray-700">{rec.action}</p>
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                    Aplicar Recomendación
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="space-y-8">
            {/* Estadísticas semanales */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Estadísticas de la Semana</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{analytics.weeklyStats.workouts}</div>
                  <div className="text-gray-600">Entrenamientos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{analytics.weeklyStats.totalTime}</div>
                  <div className="text-gray-600">Minutos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{analytics.weeklyStats.calories}</div>
                  <div className="text-gray-600">Calorías</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{analytics.weeklyStats.avgRating}</div>
                  <div className="text-gray-600">Rating Promedio</div>
                </div>
              </div>
            </div>

            {/* Progreso de fuerza */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Progreso de Fuerza</h2>
              <div className="space-y-4">
                {analytics.strengthProgress.map((exercise, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exercise.exercise}</h3>
                      <p className="text-sm text-gray-600">
                        {exercise.startWeight}kg → {exercise.currentWeight}kg
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getProgressColor(exercise.progress)}`}>
                        +{exercise.progress}%
                      </div>
                      <div className="text-sm text-gray-600">Progreso</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'goals' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Objetivo de peso */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Peso Objetivo</h3>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600">{analytics.goals.weight.current}</div>
                  <div className="text-gray-600">kg actuales</div>
                </div>
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(analytics.goals.weight.current / analytics.goals.weight.target) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  Objetivo: {analytics.goals.weight.target} kg
                </div>
              </div>

              {/* Objetivo de fuerza */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Fuerza Objetivo</h3>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600">{analytics.goals.strength.current}</div>
                  <div className="text-gray-600">kg (press banca)</div>
                </div>
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(analytics.goals.strength.current / analytics.goals.strength.target) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  Objetivo: {analytics.goals.strength.target} kg
                </div>
              </div>

              {/* Objetivo de resistencia */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Resistencia Objetivo</h3>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-orange-600">{analytics.goals.endurance.current}</div>
                  <div className="text-gray-600">min (plank)</div>
                </div>
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(analytics.goals.endurance.current / analytics.goals.endurance.target) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  Objetivo: {analytics.goals.endurance.target} min
                </div>
              </div>
            </div>

            {/* Próximos objetivos */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Próximos Objetivos Sugeridos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-2">Aumentar Frecuencia</h3>
                  <p className="text-purple-700 text-sm">La IA sugiere entrenar 5 días por semana para acelerar tu progreso</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Variar Ejercicios</h3>
                  <p className="text-blue-700 text-sm">Agregar ejercicios de estabilidad para mejorar el rendimiento</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">Optimizar Descanso</h3>
                  <p className="text-green-700 text-sm">Reducir el tiempo de descanso entre series para mayor intensidad</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-2">Progresión Gradual</h3>
                  <p className="text-orange-700 text-sm">Aumentar peso en sentadillas y peso muerto gradualmente</p>
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