import React, { useState } from 'react';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Activity,
  Target,
  Calendar,
  Clock,
  Star,
  Award,
  Zap,
  Heart,
  Dumbbell,
  Ruler,
  Weight,
  Download,
  Filter,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  BarChart,
  PieChart as RechartsPieChart,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { ModernCard, ModernButton, ModernBadge } from '../../components/ModernUI';

const AnalyticsPage: React.FC = () => {
  const { 
    analytics, 
    getWorkoutAnalytics,
    getProgressAnalytics,
    getPerformanceMetrics,
    getTrends,
    exportReport,
    generateInsights
  } = useAnalytics();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Datos mock para los gráficos
  const mockWorkoutData = [
    { name: 'Lun', entrenamientos: 3, duracion: 120, calorias: 450 },
    { name: 'Mar', entrenamientos: 2, duracion: 90, calorias: 320 },
    { name: 'Mie', entrenamientos: 4, duracion: 150, calorias: 580 },
    { name: 'Jue', entrenamientos: 1, duracion: 60, calorias: 220 },
    { name: 'Vie', entrenamientos: 3, duracion: 110, calorias: 410 },
    { name: 'Sab', entrenamientos: 2, duracion: 80, calorias: 290 },
    { name: 'Dom', entrenamientos: 1, duracion: 45, calorias: 160 }
  ];

  const mockProgressData = [
    { name: 'Sem 1', peso: 75, fuerza: 65, resistencia: 70 },
    { name: 'Sem 2', peso: 74.5, fuerza: 68, resistencia: 72 },
    { name: 'Sem 3', peso: 74, fuerza: 70, resistencia: 75 },
    { name: 'Sem 4', peso: 73.5, fuerza: 72, resistencia: 78 },
    { name: 'Sem 5', peso: 73, fuerza: 75, resistencia: 80 },
    { name: 'Sem 6', peso: 72.5, fuerza: 78, resistencia: 82 },
    { name: 'Sem 7', peso: 72, fuerza: 80, resistencia: 85 },
    { name: 'Sem 8', peso: 71.5, fuerza: 82, resistencia: 87 }
  ];

  const mockCategoryData = [
    { name: 'Fuerza', value: 35, color: '#3b82f6' },
    { name: 'Cardio', value: 25, color: '#ef4444' },
    { name: 'Flexibilidad', value: 20, color: '#10b981' },
    { name: 'Equilibrio', value: 15, color: '#f59e0b' },
    { name: 'Otros', value: 5, color: '#8b5cf6' }
  ];

  const mockPerformanceData = [
    { name: 'Ene', rendimiento: 75, consistencia: 80, progreso: 70 },
    { name: 'Feb', rendimiento: 78, consistencia: 82, progreso: 75 },
    { name: 'Mar', rendimiento: 82, consistencia: 85, progreso: 80 },
    { name: 'Abr', rendimiento: 85, consistencia: 88, progreso: 85 },
    { name: 'May', rendimiento: 88, consistencia: 90, progreso: 88 },
    { name: 'Jun', rendimiento: 90, consistencia: 92, progreso: 90 }
  ];

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  const periods = [
    { id: 'week', name: 'Semana', icon: Calendar },
    { id: 'month', name: 'Mes', icon: Calendar },
    { id: 'quarter', name: 'Trimestre', icon: Calendar },
    { id: 'year', name: 'Año', icon: Calendar }
  ];

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'workouts': return Activity;
      case 'duration': return Clock;
      case 'calories': return Zap;
      case 'strength': return Dumbbell;
      case 'weight': return Weight;
      case 'flexibility': return Ruler;
      default: return TrendingUp;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'workouts': return 'from-blue-500 to-cyan-500';
      case 'duration': return 'from-green-500 to-emerald-500';
      case 'calories': return 'from-red-500 to-pink-500';
      case 'strength': return 'from-purple-500 to-pink-500';
      case 'weight': return 'from-yellow-500 to-orange-500';
      case 'flexibility': return 'from-indigo-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header y controles */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
            <p className="text-gray-300">Analiza tu rendimiento y progreso detalladamente</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Download} variant="secondary" onClick={() => exportReport()}>
              Exportar
            </ModernButton>
            <ModernButton icon={RefreshCw} variant="glass" onClick={() => generateInsights()}>
              Actualizar
            </ModernButton>
            <ModernButton 
              icon={showAdvanced ? EyeOff : Eye} 
              variant="glass" 
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Ocultar' : 'Avanzado'}
            </ModernButton>
          </div>
        </div>
        {/* Filtros de período */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-300">Período:</span>
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
            {periods.map((period) => {
              const Icon = period.icon;
              return (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedPeriod === period.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{period.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernCard title="Entrenamientos" icon={Activity} gradient="from-blue-500 to-cyan-500" variant="stats">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">16</p>
            <p className="text-sm text-gray-300">Este mes</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">+12% vs mes anterior</span>
            </div>
          </div>
        </ModernCard>

        <ModernCard title="Horas Totales" icon={Clock} gradient="from-green-500 to-emerald-500" variant="stats">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">24.5</p>
            <p className="text-sm text-gray-300">Este mes</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">+8% vs mes anterior</span>
            </div>
          </div>
        </ModernCard>

        <ModernCard title="Calorías Quemadas" icon={Zap} gradient="from-red-500 to-pink-500" variant="stats">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">8,450</p>
            <p className="text-sm text-gray-300">Este mes</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">+15% vs mes anterior</span>
            </div>
          </div>
        </ModernCard>

        <ModernCard title="Rendimiento" icon={Award} gradient="from-purple-500 to-pink-500" variant="stats">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">87%</p>
            <p className="text-sm text-gray-300">Promedio</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">+5% vs mes anterior</span>
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Tabs de navegación */}
      <div className="fitness-card">
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
          {[
            { id: 'overview', label: 'Resumen', icon: BarChart3 },
            { id: 'workouts', label: 'Entrenamientos', icon: Activity },
            { id: 'progress', label: 'Progreso', icon: TrendingUp },
            { id: 'performance', label: 'Rendimiento', icon: Award },
            { id: 'insights', label: 'Insights', icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido de las tabs */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de entrenamientos semanales */}
          <ModernCard title="Entrenamientos Semanales" icon={Activity} gradient="from-blue-500 to-cyan-500" variant="stats">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWorkoutData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="entrenamientos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>

          {/* Distribución por categorías */}
          <ModernCard title="Distribución por Categorías" icon={PieChart} gradient="from-purple-500 to-pink-500" variant="stats">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={mockCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {mockCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>

          {/* Progreso de peso */}
          <ModernCard title="Progreso de Peso" icon={Weight} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={mockProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line type="monotone" dataKey="peso" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>

          {/* Rendimiento general */}
          <ModernCard title="Rendimiento General" icon={Award} gradient="from-yellow-500 to-orange-500" variant="stats">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area type="monotone" dataKey="rendimiento" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>
        </div>
      )}

      {activeTab === 'workouts' && (
        <div className="space-y-6">
          {/* Estadísticas detalladas de entrenamientos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ModernCard title="Frecuencia" icon={Calendar} gradient="from-blue-500 to-cyan-500" variant="stats">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">4.2</p>
                <p className="text-sm text-gray-300">Entrenamientos/semana</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">+0.3 vs mes anterior</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard title="Duración Promedio" icon={Clock} gradient="from-green-500 to-emerald-500" variant="stats">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">52</p>
                <p className="text-sm text-gray-300">Minutos/sesión</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">+5 min vs mes anterior</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard title="Intensidad" icon={Zap} gradient="from-red-500 to-pink-500" variant="stats">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">8.5</p>
                <p className="text-sm text-gray-300">Escala 1-10</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">+0.3 vs mes anterior</span>
                </div>
              </div>
            </ModernCard>
          </div>

          {/* Gráfico de calorías por día */}
          <ModernCard title="Calorías Quemadas por Día" icon={Zap} gradient="from-orange-500 to-red-500" variant="stats">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWorkoutData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="calorias" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="space-y-6">
          {/* Métricas de progreso */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ModernCard title="Peso" icon={Weight} gradient="from-green-500 to-emerald-500" variant="stats">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">-3.5 kg</p>
                <p className="text-sm text-gray-300">En 8 semanas</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">Meta: -5 kg</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard title="Fuerza" icon={Dumbbell} gradient="from-purple-500 to-pink-500" variant="stats">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">+23%</p>
                <p className="text-sm text-gray-300">En 8 semanas</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">Excelente progreso</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard title="Resistencia" icon={Heart} gradient="from-red-500 to-pink-500" variant="stats">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">+18%</p>
                <p className="text-sm text-gray-300">En 8 semanas</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">Buen progreso</span>
                </div>
              </div>
            </ModernCard>
          </div>

          {/* Gráfico de progreso detallado */}
          <ModernCard title="Progreso Detallado" icon={TrendingUp} gradient="from-blue-500 to-cyan-500" variant="stats">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={mockProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line type="monotone" dataKey="peso" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="fuerza" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="resistencia" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* KPIs de rendimiento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ModernCard title="Consistencia" icon={Calendar} gradient="from-green-500 to-emerald-500" variant="stats">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">92%</p>
                <p className="text-sm text-gray-300">Asistencia</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">+5% vs mes anterior</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard title="Eficiencia" icon={Award} gradient="from-purple-500 to-pink-500" variant="stats">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">87%</p>
                <p className="text-sm text-gray-300">Rendimiento</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">+3% vs mes anterior</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard title="Recuperación" icon={Heart} gradient="from-blue-500 to-cyan-500" variant="stats">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">85%</p>
                <p className="text-sm text-gray-300">Calidad</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">+2% vs mes anterior</span>
                </div>
              </div>
            </ModernCard>
          </div>

          {/* Gráfico de rendimiento */}
          <ModernCard title="Evolución del Rendimiento" icon={TrendingUp} gradient="from-yellow-500 to-orange-500" variant="stats">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area type="monotone" dataKey="rendimiento" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="consistencia" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="progreso" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Insights principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModernCard title="Mejor Día" icon={Star} gradient="from-yellow-500 to-orange-500" variant="fitness">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">Miércoles</p>
                    <p className="text-sm text-gray-300">Tu día más productivo</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Entrenamientos</span>
                    <span className="text-white font-bold">4 sesiones</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Duración promedio</span>
                    <span className="text-white font-bold">75 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Calorías quemadas</span>
                    <span className="text-white font-bold">580 cal</span>
                  </div>
                </div>
              </div>
            </ModernCard>

            <ModernCard title="Área de Mejora" icon={Target} gradient="from-red-500 to-pink-500" variant="fitness">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">Fuerza Superior</p>
                    <p className="text-sm text-gray-300">Necesita más atención</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Progreso actual</span>
                    <span className="text-white font-bold">65%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-gray-400">Sugerencia: Aumentar frecuencia de entrenamiento de pecho y brazos</p>
                </div>
              </div>
            </ModernCard>
          </div>

          {/* Recomendaciones */}
          <ModernCard title="Recomendaciones IA" icon={Star} gradient="from-purple-500 to-pink-500" variant="fitness">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Aumenta la intensidad en días de fuerza</p>
                  <p className="text-sm text-gray-300">Tu cuerpo está listo para más peso</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Incluye más cardio de baja intensidad</p>
                  <p className="text-sm text-gray-300">Mejorará tu recuperación</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Ruler className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Añade estiramientos post-entrenamiento</p>
                  <p className="text-sm text-gray-300">Reducirá el riesgo de lesiones</p>
                </div>
              </div>
            </div>
          </ModernCard>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage; 