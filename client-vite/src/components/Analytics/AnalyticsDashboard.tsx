import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  Target, 
  Calendar,
  Clock,
  Heart,
  Zap,
  Trophy,
  Star,
  Award,
  PieChart,
  LineChart,
  BarChart,
  Scatter,
  Download,
  Filter,
  Search,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Minus,
  Sparkles,
  Info,
  AlertCircle,
  CheckCircle,
  X,
  ArrowRight,
  ArrowLeft,
  BarChart4,
  Users2
} from 'lucide-react';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../Animations/MicroInteractions';
import AnalyticsOnboarding from './AnalyticsOnboarding';
import AnalyticsSummary from './AnalyticsSummary';

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

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
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

const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'performance' | 'revenue' | 'engagement'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [userSegments, setUserSegments] = useState<UserSegment[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

  useEffect(() => {
    initializeData();
    // Mostrar onboarding si es la primera vez
    const hasSeenOnboarding = localStorage.getItem('analytics-onboarding-completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, [timeRange]);

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('analytics-onboarding-completed', 'true');
    showNotification('¡Analytics configurado exitosamente!', 'success');
  };

  const handleViewDetails = () => {
    setShowDetailedView(true);
  };

  const handleBackToSummary = () => {
    setShowDetailedView(false);
  };

  const initializeData = () => {
    setIsLoading(true);
    
    // Simular carga de datos
    setTimeout(() => {
      const mockMetrics: Metric[] = [
        {
          id: 'active-users',
          title: 'Usuarios Activos',
          value: 1247,
          change: 12.5,
          changeType: 'increase',
          icon: <Users className="w-6 h-6" />,
          color: 'text-blue-400',
          format: 'number'
        },
        {
          id: 'workout-sessions',
          title: 'Sesiones de Entrenamiento',
          value: 892,
          change: -3.2,
          changeType: 'decrease',
          icon: <Activity className="w-6 h-6" />,
          color: 'text-green-400',
          format: 'number'
        },
        {
          id: 'avg-session-duration',
          title: 'Duración Promedio',
          value: 45,
          change: 8.7,
          changeType: 'increase',
          icon: <Clock className="w-6 h-6" />,
          color: 'text-purple-400',
          format: 'time'
        },
        {
          id: 'completion-rate',
          title: 'Tasa de Finalización',
          value: 78.5,
          change: 2.1,
          changeType: 'increase',
          icon: <Target className="w-6 h-6" />,
          color: 'text-yellow-400',
          format: 'percentage'
        },
        {
          id: 'revenue',
          title: 'Ingresos Mensuales',
          value: 15420,
          change: 15.3,
          changeType: 'increase',
          icon: <Trophy className="w-6 h-6" />,
          color: 'text-green-400',
          format: 'currency'
        },
        {
          id: 'engagement-score',
          title: 'Puntuación de Engagement',
          value: 8.7,
          change: 0.5,
          changeType: 'increase',
          icon: <Star className="w-6 h-6" />,
          color: 'text-pink-400',
          format: 'number'
        }
      ];

      const mockUserSegments: UserSegment[] = [
        {
          id: 'power-users',
          name: 'Usuarios Activos',
          count: 456,
          percentage: 36.5,
          color: '#3B82F6',
          growth: 12.3
        },
        {
          id: 'regular-users',
          name: 'Usuarios Regulares',
          count: 623,
          percentage: 50.0,
          color: '#10B981',
          growth: 5.7
        },
        {
          id: 'casual-users',
          name: 'Usuarios Casuales',
          count: 168,
          percentage: 13.5,
          color: '#F59E0B',
          growth: -2.1
        }
      ];

      const mockPerformanceMetrics: PerformanceMetric[] = [
        {
          category: 'Retención de Usuarios',
          current: 78.5,
          previous: 72.3,
          target: 80.0,
          status: 'good'
        },
        {
          category: 'Tiempo de Sesión',
          current: 45,
          previous: 38,
          target: 50,
          status: 'excellent'
        },
        {
          category: 'Tasa de Conversión',
          current: 12.3,
          previous: 10.8,
          target: 15.0,
          status: 'good'
        },
        {
          category: 'Satisfacción del Usuario',
          current: 4.2,
          previous: 4.0,
          target: 4.5,
          status: 'average'
        }
      ];

      setMetrics(mockMetrics);
      setUserSegments(mockUserSegments);
      setPerformanceMetrics(mockPerformanceMetrics);
      setIsLoading(false);
    }, 1000);
  };

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

  const handleExportData = () => {
    showNotification('Datos exportados exitosamente', 'success');
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    initializeData();
    showNotification('Datos actualizados', 'success');
  };

  // Vista simplificada (por defecto)
  if (!showDetailedView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
        {/* Header */}
        <AnimatedText delay={0.1}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
                <BarChart3 className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Analytics</h1>
                <p className="text-gray-300">Análisis avanzado de datos y métricas</p>
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
                  onClick={handleRefreshData}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                    Actualizar
                  </div>
                </PulseButton>
              </AnimatedButton>
            </div>
          </div>
        </AnimatedText>

        {/* Vista Resumida */}
        <AnalyticsSummary
          metrics={metrics}
          userSegments={userSegments}
          performanceMetrics={performanceMetrics}
          onViewDetails={handleViewDetails}
          onExportData={handleExportData}
          isLoading={isLoading}
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
        <AnalyticsOnboarding
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={handleOnboardingComplete}
        />
      </div>
    );
  }

  // Vista detallada (cuando el usuario hace clic en "Ver Detalles")
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
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
              <BarChart3 className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics Completo</h1>
              <p className="text-gray-300">Todas las métricas y análisis detallados</p>
            </div>
          </div>
        </div>
      </AnimatedText>

      {/* Filtros y Controles */}
      <AnimatedCard delay={0.2}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
                <option value="1y">Último año</option>
              </select>
              
              <PulseButton
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
              </PulseButton>
            </div>
            
            <div className="flex items-center gap-3">
              <PulseButton
                onClick={handleExportData}
                className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
              </PulseButton>
              
              <PulseButton
                onClick={handleRefreshData}
                disabled={isLoading}
                className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-xl hover:bg-indigo-500/30 transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </PulseButton>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Tabs de Navegación */}
      <AnimatedCard delay={0.3}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 mb-6">
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Resumen', icon: BarChart4 },
              { id: 'users', label: 'Usuarios', icon: Users2 },
                             { id: 'performance', label: 'Rendimiento', icon: TrendingUp },
              { id: 'revenue', label: 'Ingresos', icon: Trophy },
              { id: 'engagement', label: 'Engagement', icon: Target }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Contenido según tab activo */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <AnimatedCard key={metric.id} delay={0.4 + index * 0.1}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${metric.color}`}>
                      {metric.icon}
                    </div>
                    <div className="flex items-center gap-1">
                      {getChangeIcon(metric.changeType)}
                      <span className={`text-sm ${
                        metric.changeType === 'increase' ? 'text-green-400' : 
                        metric.changeType === 'decrease' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {formatValue(metric.value, metric.format)}
                  </h3>
                  <p className="text-gray-300 text-sm">{metric.title}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <AnimatedCard delay={0.4}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Segmentación de Usuarios</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userSegments.map((segment, index) => (
                    <div key={segment.id} className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{segment.name}</h4>
                        <span className="text-sm text-gray-300">{segment.percentage}%</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">{segment.count}</div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${segment.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {segment.growth > 0 ? '+' : ''}{segment.growth}%
                        </span>
                        <span className="text-xs text-gray-400">vs mes anterior</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <AnimatedCard delay={0.4}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Métricas de Rendimiento</h3>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={metric.category} className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{metric.category}</h4>
                        <span className={`text-sm ${getStatusColor(metric.status)}`}>
                          {metric.status === 'excellent' ? 'Excelente' :
                           metric.status === 'good' ? 'Bueno' :
                           metric.status === 'average' ? 'Promedio' : 'Pobre'}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Actual:</span>
                          <p className="text-white font-semibold">{metric.current}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Anterior:</span>
                          <p className="text-white">{metric.previous}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Objetivo:</span>
                          <p className="text-white">{metric.target}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Análisis de Ingresos</h3>
            <p className="text-gray-300">Próximamente: Métricas detalladas de ingresos y monetización</p>
          </div>
        )}

        {activeTab === 'engagement' && (
          <div className="text-center py-12">
                         <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Métricas de Engagement</h3>
            <p className="text-gray-300">Próximamente: Análisis detallado de engagement y retención</p>
          </div>
        )}
      </div>

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
      <AnalyticsOnboarding
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default AnalyticsDashboard;
