import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Calendar, 
  Activity, 
  Flame, 
  Trophy,
  Download,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';
import NavBar from './NavBar';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [showDetails, setShowDetails] = useState(true);

  // Datos simulados de analytics
  const analyticsData = {
    workouts: {
      total: 45,
      thisMonth: 12,
      avgDuration: 65,
      totalCalories: 12500,
      avgRating: 4.2
    },
    progress: {
      weightChange: -2.5,
      muscleGain: 1.2,
      bodyFatChange: -1.8,
      strengthImprovement: 15
    },
    trends: {
      weekly: [
        { week: 'Sem 1', workouts: 4, calories: 2800, weight: 75.2 },
        { week: 'Sem 2', workouts: 3, calories: 2100, weight: 74.8 },
        { week: 'Sem 3', workouts: 5, calories: 3500, weight: 74.5 },
        { week: 'Sem 4', workouts: 4, calories: 2800, weight: 74.2 }
      ],
      monthly: [
        { month: 'Ene', workouts: 15, calories: 12000, weight: 76.0 },
        { month: 'Feb', workouts: 18, calories: 14500, weight: 75.2 },
        { month: 'Mar', workouts: 20, calories: 16000, weight: 74.5 },
        { month: 'Abr', workouts: 22, calories: 17500, weight: 73.8 }
      ]
    }
  };

  const getProgressColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getProgressIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (value < 0) return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col">
      <NavBar />
      
      {/* Banner Demo */}
      <div className="w-full bg-gradient-to-r from-yellow-200 via-yellow-50 to-yellow-100 border-b border-yellow-300 py-2 px-4 flex items-center justify-center">
        <span className="text-yellow-800 text-sm font-medium">Modo DEMO: Datos simulados de analytics</span>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
          </div>
          <p className="text-gray-600">Analiza tu progreso y rendimiento detalladamente</p>
        </div>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Últimos 7 días</option>
              <option value="30">Últimos 30 días</option>
              <option value="90">Últimos 3 meses</option>
              <option value="365">Último año</option>
            </select>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showDetails ? 'Ocultar detalles' : 'Mostrar detalles'}
            </button>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-sm text-gray-500">Entrenamientos</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{analyticsData.workouts.thisMonth}</div>
            <div className="text-sm text-gray-600">Este mes</div>
            <div className="mt-2 text-xs text-green-600">+{analyticsData.workouts.thisMonth - 10} vs mes anterior</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Flame className="w-8 h-8 text-orange-600" />
              <span className="text-sm text-gray-500">Calorías</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{analyticsData.workouts.totalCalories.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total quemadas</div>
            <div className="mt-2 text-xs text-green-600">+{analyticsData.workouts.totalCalories - 10000} vs mes anterior</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-600" />
              <span className="text-sm text-gray-500">Peso</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{analyticsData.progress.weightChange}kg</div>
            <div className="text-sm text-gray-600">Cambio total</div>
            <div className={`mt-2 text-xs ${getProgressColor(analyticsData.progress.weightChange)}`}>
              {analyticsData.progress.weightChange > 0 ? '+' : ''}{analyticsData.progress.weightChange}kg este mes
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
              <span className="text-sm text-gray-500">Rating</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{analyticsData.workouts.avgRating}</div>
            <div className="text-sm text-gray-600">Promedio</div>
            <div className="mt-2 text-xs text-green-600">+0.3 vs mes anterior</div>
          </div>
        </div>

        {/* Gráficos y detalles */}
        {showDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progreso de peso */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso de Peso</h3>
              <div className="space-y-4">
                {analyticsData.trends.weekly.map((week, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{week.week}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{week.workouts} entrenamientos</span>
                      <span className="font-semibold">{week.weight}kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Métricas de progreso */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Progreso</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>Ganancia muscular</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getProgressIcon(analyticsData.progress.muscleGain)}
                    <span className={`font-semibold ${getProgressColor(analyticsData.progress.muscleGain)}`}>
                      +{analyticsData.progress.muscleGain}kg
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-green-600" />
                    <span>Mejora de fuerza</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getProgressIcon(analyticsData.progress.strengthImprovement)}
                    <span className={`font-semibold ${getProgressColor(analyticsData.progress.strengthImprovement)}`}>
                      +{analyticsData.progress.strengthImprovement}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Flame className="w-4 h-4 text-orange-600" />
                    <span>Grasa corporal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getProgressIcon(analyticsData.progress.bodyFatChange)}
                    <span className={`font-semibold ${getProgressColor(analyticsData.progress.bodyFatChange)}`}>
                      {analyticsData.progress.bodyFatChange}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resumen de tendencias */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencias Mensuales</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {analyticsData.trends.monthly.map((month, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="text-lg font-bold text-gray-900">{month.month}</div>
                <div className="text-sm text-gray-600 mb-2">{month.workouts} entrenamientos</div>
                <div className="text-sm text-gray-600">{month.calories.toLocaleString()} calorías</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">{month.weight}kg</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics; 