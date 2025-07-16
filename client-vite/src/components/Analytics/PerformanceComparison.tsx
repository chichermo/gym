import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Target, Calendar, Activity } from 'lucide-react';

interface PerformanceData {
  period: string;
  workouts: number;
  calories: number;
  steps: number;
  heartRate: number;
  duration: number;
}

interface PerformanceComparisonProps {
  currentData: PerformanceData;
  previousData: PerformanceData;
  onPeriodChange: (period: 'week' | 'month' | 'quarter') => void;
}

const PerformanceComparison: React.FC<PerformanceComparisonProps> = ({
  currentData,
  previousData,
  onPeriodChange
}) => {
  const [activePeriod, setActivePeriod] = useState<'week' | 'month' | 'quarter'>('week');

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return { percentage: 0, isPositive: true };
    const change = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(change),
      isPositive: change >= 0
    };
  };

  const getChangeIcon = (isPositive: boolean) => {
    if (isPositive) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    }
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const getChangeColor = (isPositive: boolean) => {
    return isPositive ? 'text-green-600' : 'text-red-600';
  };

  const metrics = [
    {
      label: 'Entrenamientos',
      current: currentData.workouts,
      previous: previousData.workouts,
      icon: Activity,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      label: 'Calorías',
      current: currentData.calories,
      previous: previousData.calories,
      icon: Target,
      color: 'from-green-500 to-emerald-600'
    },
    {
      label: 'Pasos',
      current: currentData.steps,
      previous: previousData.steps,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600'
    },
    {
      label: 'Frecuencia Cardíaca',
      current: currentData.heartRate,
      previous: previousData.heartRate,
      icon: Activity,
      color: 'from-red-500 to-pink-600'
    },
    {
      label: 'Duración',
      current: currentData.duration,
      previous: previousData.duration,
      icon: Calendar,
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const handlePeriodChange = (period: 'week' | 'month' | 'quarter') => {
    setActivePeriod(period);
    onPeriodChange(period);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Comparación de Rendimiento</h3>
            <p className="text-gray-600">Analiza tu progreso vs períodos anteriores</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex space-x-2">
          {[
            { id: 'week', label: 'Semana' },
            { id: 'month', label: 'Mes' },
            { id: 'quarter', label: 'Trimestre' }
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => handlePeriodChange(period.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activePeriod === period.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const change = calculateChange(metric.current, metric.previous);
          const Icon = metric.icon;
          
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-gradient-to-br ${metric.color} rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  {getChangeIcon(change.isPositive)}
                  <span className={`text-sm font-medium ${getChangeColor(change.isPositive)}`}>
                    {change.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Metric Info */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{metric.label}</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.current.toLocaleString()}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Actual</span>
                    <span className="text-gray-600">Anterior</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${metric.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((metric.current / Math.max(metric.current, metric.previous)) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{metric.current}</span>
                    <span>{metric.previous}</span>
                  </div>
                </div>

                {/* Change Indicator */}
                <div className={`flex items-center gap-2 p-2 rounded-lg ${
                  change.isPositive ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {change.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${getChangeColor(change.isPositive)}`}>
                    {change.isPositive ? 'Mejoró' : 'Disminuyó'} {change.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Cambios</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">
              {metrics.filter(m => calculateChange(m.current, m.previous).isPositive).length}
            </div>
            <div className="text-sm text-gray-600">Métricas Mejoradas</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <div className="text-2xl font-bold text-red-600">
              {metrics.filter(m => !calculateChange(m.current, m.previous).isPositive).length}
            </div>
            <div className="text-sm text-gray-600">Métricas Disminuidas</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(metrics.reduce((sum, m) => {
                const change = calculateChange(m.current, m.previous);
                return sum + (change.isPositive ? change.percentage : -change.percentage);
              }, 0) / metrics.length)}
            </div>
            <div className="text-sm text-gray-600">Promedio de Cambio</div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Insights</h4>
        <div className="space-y-3">
          {metrics.map((metric) => {
            const change = calculateChange(metric.current, metric.previous);
            const insight = change.isPositive 
              ? `¡Excelente! Tu ${metric.label.toLowerCase()} mejoró un ${change.percentage.toFixed(1)}%`
              : `Tu ${metric.label.toLowerCase()} disminuyó un ${change.percentage.toFixed(1)}%. Considera ajustar tu rutina.`;
            
            return (
              <div key={metric.label} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                {getChangeIcon(change.isPositive)}
                <span className="text-sm text-gray-700">{insight}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparison; 