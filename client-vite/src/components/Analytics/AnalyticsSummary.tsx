import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Clock, 
  Target, 
  Trophy, 
  Star,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Minus,
  Download,
  BarChart4,
  Users2
} from 'lucide-react';
import { AnimatedCard, AnimatedText } from '../Animations/AnimatedComponents';
import { PulseButton } from '../Animations/MicroInteractions';

interface Metric {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: string;
  format: 'number' | 'percentage' | 'currency' | 'time';
}

interface UserSegment {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
  growth: number;
}

interface PerformanceMetric {
  category: string;
  current: number;
  previous: number;
  target: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

interface AnalyticsSummaryProps {
  metrics: Metric[];
  userSegments: UserSegment[];
  performanceMetrics: PerformanceMetric[];
  onViewDetails: () => void;
  onExportData: () => void;
  isLoading: boolean;
}

const AnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({
  metrics,
  userSegments,
  performanceMetrics,
  onViewDetails,
  onExportData,
  isLoading
}) => {
  const topMetrics = metrics.slice(0, 4);
  const topSegments = userSegments.slice(0, 3);
  const topPerformance = performanceMetrics.slice(0, 2);

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'time':
        return `${value} min`;
      default:
        return value.toLocaleString();
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'decrease':
        return <ArrowDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-400';
      case 'good':
        return 'text-blue-400';
      case 'average':
        return 'text-yellow-400';
      case 'poor':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <AnimatedCard delay={0.1}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto mb-4"></div>
            <p className="text-white">Cargando datos analíticos...</p>
          </div>
        </AnimatedCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Resumido */}
      <AnimatedText delay={0.1}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Resumen de Analytics</h2>
          <p className="text-gray-300">Métricas clave y análisis de rendimiento</p>
        </div>
      </AnimatedText>

      {/* Métricas Principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topMetrics.map((metric, index) => (
          <AnimatedCard key={metric.id} delay={0.2 + index * 0.1}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`${metric.color}`}>
                  {metric.icon}
                </div>
                <div className="flex items-center gap-1">
                  {getChangeIcon(metric.changeType)}
                  <span className={`text-xs ${
                    metric.changeType === 'increase' ? 'text-green-400' : 
                    metric.changeType === 'decrease' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>
              <div className="text-xl font-bold text-white mb-1">
                {formatValue(metric.value, metric.format)}
              </div>
              <div className="text-sm text-gray-300">{metric.title}</div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Segmentación de Usuarios */}
      <AnimatedCard delay={0.4}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users2 className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Segmentación de Usuarios</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topSegments.map((segment, index) => (
              <div key={segment.id} className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white text-sm">{segment.name}</h4>
                  <span className="text-xs text-gray-300">{segment.percentage}%</span>
                </div>
                <div className="text-lg font-bold text-white mb-2">{segment.count}</div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${segment.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {segment.growth > 0 ? '+' : ''}{segment.growth}%
                  </span>
                  <span className="text-xs text-gray-400">vs mes anterior</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <PulseButton
              onClick={onViewDetails}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
            >
              Ver Análisis Completo de Usuarios
            </PulseButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Métricas de Rendimiento */}
      <AnimatedCard delay={0.5}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                     <div className="flex items-center gap-3 mb-4">
             <TrendingUp className="w-6 h-6 text-green-400" />
             <h3 className="text-xl font-semibold text-white">Rendimiento Clave</h3>
           </div>
          
          <div className="space-y-3">
            {topPerformance.map((metric, index) => (
              <div key={metric.category} className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white text-sm">{metric.category}</h4>
                  <span className={`text-xs ${getStatusColor(metric.status)}`}>
                    {metric.status === 'excellent' ? 'Excelente' :
                     metric.status === 'good' ? 'Bueno' :
                     metric.status === 'average' ? 'Promedio' : 'Pobre'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400">Actual:</span>
                    <p className="text-white font-semibold">{metric.current}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Objetivo:</span>
                    <p className="text-white">{metric.target}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Progreso:</span>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-1">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(metric.current / metric.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <PulseButton
              onClick={onViewDetails}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
            >
              Ver Todas las Métricas de Rendimiento
            </PulseButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Acciones Rápidas */}
      <AnimatedCard delay={0.6}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PulseButton
              onClick={onViewDetails}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <BarChart4 className="w-5 h-5 text-indigo-400" />
                <span className="text-white font-medium">Ver Analytics Completo</span>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </PulseButton>
            
            <PulseButton
              onClick={onExportData}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Exportar Datos</span>
              </div>
              <ArrowRight className="w-4 h-4 text-green-400" />
            </PulseButton>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AnalyticsSummary;
