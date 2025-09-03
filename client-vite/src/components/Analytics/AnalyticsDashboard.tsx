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
  X
} from 'lucide-react';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../Animations/MicroInteractions';

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

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [userSegments, setUserSegments] = useState<UserSegment[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

  useEffect(() => {
    initializeData();
  }, [timeRange]);

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
          id: 'user-satisfaction',
          title: 'Satisfacción del Usuario',
          value: 4.8,
          change: 0.2,
          changeType: 'increase',
          icon: <Star className="w-6 h-6" />,
          color: 'text-yellow-400',
          format: 'number'
        }
      ];

      const mockUserSegments: UserSegment[] = [
        {
          id: 'power-users',
          name: 'Usuarios Power',
          count: 234,
          percentage: 18.7,
          color: 'text-purple-400',
          growth: 12.5
        },
        {
          id: 'regular-users',
          name: 'Usuarios Regulares',
          count: 567,
          percentage: 45.4,
          color: 'text-blue-400',
          growth: 8.2
        },
        {
          id: 'casual-users',
          name: 'Usuarios Casuales',
          count: 346,
          percentage: 27.7,
          color: 'text-green-400',
          growth: -2.1
        },
        {
          id: 'new-users',
          name: 'Usuarios Nuevos',
          count: 100,
          percentage: 8.2,
          color: 'text-yellow-400',
          growth: 25.3
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
          status: 'good'
        },
        {
          category: 'Tasa de Conversión',
          current: 12.3,
          previous: 10.8,
          target: 15.0,
          status: 'average'
        },
        {
          category: 'Satisfacción del Cliente',
          current: 4.8,
          previous: 4.6,
          target: 5.0,
          status: 'excellent'
        },
        {
          category: 'ROI de Marketing',
          current: 320,
          previous: 280,
          target: 350,
          status: 'good'
        }
      ];

      setMetrics(mockMetrics);
      setUserSegments(mockUserSegments);
      setPerformanceMetrics(mockPerformanceMetrics);
      setIsLoading(false);
    }, 1000);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'good':
        return <TrendingUp className="w-4 h-4 text-blue-400" />;
      case 'average':
        return <Minus className="w-4 h-4 text-yellow-400" />;
      case 'poor':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleExportData = () => {
    showNotification('Exportando datos...', 'info');
    // Simular exportación
    setTimeout(() => {
      showNotification('Datos exportados exitosamente', 'success');
    }, 2000);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    initializeData();
    showNotification('Datos actualizados', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics Avanzado</h1>
              <p className="text-gray-300">Business Intelligence y métricas de rendimiento</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <AnimatedButton delay={0.2} asButton={false}>
              <PulseButton
                onClick={handleRefreshData}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Actualizar
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={0.3} asButton={false}>
              <PulseButton
                onClick={handleExportData}
                className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-xl hover:bg-green-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </div>
              </PulseButton>
            </AnimatedButton>
          </div>
        </div>
      </AnimatedText>

      {/* Time Range Selector */}
      <AnimatedCard delay={0.15}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
                <option value="1y">Último año</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                Filtros
              </button>
            </div>
            
            <div className="text-sm text-gray-400">
              Última actualización: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Tabs */}
      <AnimatedCard delay={0.2}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 mb-6">
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Resumen', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'users', label: 'Usuarios', icon: <Users className="w-4 h-4" /> },
              { id: 'performance', label: 'Rendimiento', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'revenue', label: 'Ingresos', icon: <Trophy className="w-4 h-4" /> },
              { id: 'engagement', label: 'Engagement', icon: <Heart className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
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
            <p className="text-white mt-4">Cargando datos analíticos...</p>
          </div>
        </AnimatedCard>
      )}

      {/* Content based on active tab */}
      {!isLoading && activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <AnimatedCard delay={0.3}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Métricas Clave</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-xl bg-white/10 ${metric.color}`}>
                        {metric.icon}
                      </div>
                      <div className="flex items-center gap-1">
                        {getChangeIcon(metric.changeType)}
                        <span className={`text-sm font-semibold ${
                          metric.changeType === 'increase' ? 'text-green-400' : 
                          metric.changeType === 'decrease' ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {Math.abs(metric.change)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="text-2xl font-bold text-white">
                        {formatValue(metric.value, metric.format)}
                      </div>
                      <div className="text-sm text-gray-400">{metric.title}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* User Segments */}
          <AnimatedCard delay={0.4}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Segmentos de Usuarios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    {userSegments.map((segment, index) => (
                      <motion.div
                        key={segment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${segment.color.replace('text-', 'bg-')}`}></div>
                          <div>
                            <div className="text-white font-semibold">{segment.name}</div>
                            <div className="text-sm text-gray-400">{segment.count} usuarios</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{segment.percentage}%</div>
                          <div className={`text-sm ${segment.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {segment.growth > 0 ? '+' : ''}{segment.growth}%
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-700"
                      />
                      {userSegments.map((segment, index) => {
                        const percentage = segment.percentage;
                        const circumference = 2 * Math.PI * 80;
                        const strokeDasharray = (percentage / 100) * circumference;
                        const strokeDashoffset = circumference - strokeDasharray;
                        const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];
                        
                        return (
                          <circle
                            key={segment.id}
                            cx="96"
                            cy="96"
                            r="80"
                            stroke={colors[index]}
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000"
                            style={{
                              transformOrigin: 'center',
                              transform: `rotate(${index * 90}deg)`
                            }}
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">1,247</div>
                        <div className="text-sm text-gray-400">Total Usuarios</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Performance Metrics */}
          <AnimatedCard delay={0.5}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Métricas de Rendimiento</h2>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(metric.status)}
                      <div>
                        <div className="text-white font-semibold">{metric.category}</div>
                        <div className="text-sm text-gray-400">Meta: {metric.target}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-white font-semibold">{metric.current}</div>
                      <div className="text-sm text-gray-400">
                        {metric.current > metric.previous ? '+' : ''}
                        {((metric.current - metric.previous) / metric.previous * 100).toFixed(1)}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </div>
      )}

      {!isLoading && activeTab === 'users' && (
        <div className="space-y-6">
          <AnimatedCard delay={0.3}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Análisis de Usuarios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Crecimiento de Usuarios</h3>
                  <div className="space-y-3">
                    {[30, 45, 60, 75, 90].map((day, index) => (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-gray-400">Día {day}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-sm">{Math.floor(Math.random() * 1000) + 500}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Actividad por Hora</h3>
                  <div className="space-y-3">
                    {['00:00', '06:00', '12:00', '18:00', '24:00'].map((hour, index) => (
                      <div key={hour} className="flex items-center justify-between">
                        <span className="text-gray-400">{hour}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-sm">{Math.floor(Math.random() * 200) + 50}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      )}

      {!isLoading && activeTab === 'performance' && (
        <div className="space-y-6">
          <AnimatedCard delay={0.3}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Métricas de Rendimiento</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Tiempo de Respuesta</h3>
                  <div className="space-y-3">
                    {['API', 'Frontend', 'Database', 'Cache'].map((service, index) => (
                      <div key={service} className="flex items-center justify-between">
                        <span className="text-gray-400">{service}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-sm">{Math.floor(Math.random() * 500) + 50}ms</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Uso de Recursos</h3>
                  <div className="space-y-3">
                    {['CPU', 'RAM', 'Storage', 'Network'].map((resource, index) => (
                      <div key={resource} className="flex items-center justify-between">
                        <span className="text-gray-400">{resource}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-sm">{Math.floor(Math.random() * 100)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      )}

      {!isLoading && activeTab === 'revenue' && (
        <div className="space-y-6">
          <AnimatedCard delay={0.3}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Análisis de Ingresos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">$15,420</div>
                  <div className="text-sm text-gray-400">Ingresos Mensuales</div>
                  <div className="text-xs text-green-400 mt-1">+15.3% vs mes anterior</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">$2,340</div>
                  <div className="text-sm text-gray-400">Ingresos Semanales</div>
                  <div className="text-xs text-blue-400 mt-1">+8.7% vs semana anterior</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">$89.50</div>
                  <div className="text-sm text-gray-400">ARPU Promedio</div>
                  <div className="text-xs text-purple-400 mt-1">+12.1% vs mes anterior</div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      )}

      {!isLoading && activeTab === 'engagement' && (
        <div className="space-y-6">
          <AnimatedCard delay={0.3}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Métricas de Engagement</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Actividad Diaria</h3>
                  <div className="space-y-3">
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-gray-400">{day}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-sm">{Math.floor(Math.random() * 500) + 200}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Interacciones por Usuario</h3>
                  <div className="space-y-3">
                    {['Likes', 'Comentarios', 'Compartidos', 'Guardados'].map((action, index) => (
                      <div key={action} className="flex items-center justify-between">
                        <span className="text-gray-400">{action}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-sm">{Math.floor(Math.random() * 50) + 5}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
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

export default AnalyticsDashboard;
