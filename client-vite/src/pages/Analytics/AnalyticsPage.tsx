import React, { useState } from 'react';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { 
  BarChart3, TrendingUp, Target, Calendar, Download,
  Eye, Brain, Zap, Activity, PieChart as LucidePieChart, LineChart as LucideLineChart
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AnalyticsPage: React.FC = () => {
  const { metrics, predictions, trends, isLoading, exportReport, generateInsights } = useAnalytics();
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [insights, setInsights] = useState<string[]>([]);

  const handleExportReport = async (format: 'pdf' | 'csv' | 'json') => {
    await exportReport(format);
  };

  const handleGenerateInsights = async () => {
    const newInsights = await generateInsights();
    setInsights(newInsights);
  };

  const getMetricColor = (category: string) => {
    switch (category) {
      case 'performance': return '#3b82f6';
      case 'health': return '#10b981';
      case 'progress': return '#f59e0b';
      case 'social': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? '#10b981' : change < 0 ? '#ef4444' : '#6b7280';
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? '↗️' : change < 0 ? '↘️' : '→';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-gray-900">
                Analytics Avanzado
              </h1>
              <p className="text-lg text-gray-600">
                Análisis profundo de tu progreso y predicciones inteligentes
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleGenerateInsights}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
              >
                <Brain className="w-4 h-4" />
                {isLoading ? 'Generando...' : 'Generar Insights'}
              </button>
              
              <button
                onClick={() => handleExportReport('pdf')}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              className="p-6 rounded-xl border bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: getMetricColor(metric.category) }}
                  >
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {metric.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {metric.category}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </div>
                  <div className="text-sm" style={{ color: getMetricColor(metric.category) }}>
                    {metric.unit}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: getChangeColor(metric.change) }}>
                    {getChangeIcon(metric.change)} {Math.abs(metric.change)}%
                  </span>
                  <span className="text-xs text-gray-500">
                    vs mes anterior
                  </span>
                </div>
                
                {metric.target && (
                  <div className="text-xs text-gray-500">
                    Meta: {metric.target}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Gráficos y análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de tendencias */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Tendencias de Progreso
              </h3>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={selectedMetric ? metrics.find(m => m.id === selectedMetric)?.data : []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Predicciones */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Predicciones IA
              </h3>
            </div>
            
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div
                  key={prediction.metric}
                  className="p-4 rounded-xl border border-gray-200 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">
                      {metrics.find(m => m.id === prediction.metric)?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {prediction.confidence * 100}% confianza
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-500">
                        Actual
                      </div>
                      <div className="font-bold text-gray-900">
                        {prediction.currentValue}
                      </div>
                    </div>
                    
                    <div className="text-2xl">→</div>
                    
                    <div>
                      <div className="text-sm text-gray-500">
                        Predicción
                      </div>
                      <div className="font-bold text-green-600">
                        {prediction.predictedValue}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {prediction.timeframe}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights generados */}
        {insights.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Insights Generados</h3>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage; 