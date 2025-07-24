import React, { useState } from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { 
  TrendingUp, 
  Target, 
  Camera, 
  Plus, 
  Edit,
  Trash2,
  Calendar,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Weight,
  Ruler,
  Dumbbell,
  Heart,
  Zap,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { ModernCard, ModernButton, ModernBadge } from '../../components/ModernUI';

const ProgressPage: React.FC = () => {
  const { 
    metrics, 
    goals, 
    photos, 
    addMetric, 
    addGoal, 
    updateGoalProgress,
    getProgressStats,
    getMetricsByCategory,
    getGoalsByCategory,
    getChartData,
    getGoalProgressData
  } = useProgress();

  const [activeTab, setActiveTab] = useState('overview');
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const stats = getProgressStats();
  const goalData = getGoalProgressData();

  const categories = [
    { id: 'all', name: 'Todos', icon: Activity },
    { id: 'weight', name: 'Peso', icon: Weight },
    { id: 'measurements', name: 'Medidas', icon: Ruler },
    { id: 'strength', name: 'Fuerza', icon: Dumbbell },
    { id: 'cardio', name: 'Cardio', icon: Heart },
    { id: 'flexibility', name: 'Flexibilidad', icon: Zap }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    if (categoryData) {
      const Icon = categoryData.icon;
      return <Icon className="w-5 h-5" />;
    }
    return null;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    if (progress >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Header y acciones */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Progreso</h1>
            <p className="text-gray-300">Rastrea tu evolución y alcanza tus metas</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Plus} onClick={() => setShowMetricModal(true)}>
              Nueva Métrica
            </ModernButton>
            <ModernButton icon={Target} variant="secondary" onClick={() => setShowGoalModal(true)}>
              Nueva Meta
            </ModernButton>
            <ModernButton icon={Camera} variant="glass" onClick={() => setShowPhotoModal(true)}>
              Nueva Foto
            </ModernButton>
          </div>
        </div>
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Métricas</p>
                <p className="text-2xl font-bold text-white">{stats.metrics}</p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Metas</p>
                <p className="text-2xl font-bold text-white">{stats.goals}</p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Progreso Global</p>
                <p className="text-2xl font-bold text-white">{stats.progress}%</p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Fotos</p>
                <p className="text-2xl font-bold text-white">{photos.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="fitness-card">
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
          {[
            { id: 'overview', label: 'Resumen', icon: BarChart3 },
            { id: 'metrics', label: 'Métricas', icon: LineChart },
            { id: 'goals', label: 'Metas', icon: Target },
            { id: 'photos', label: 'Fotos', icon: Camera }
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráficos principales */}
          <ModernCard title="Progreso General" icon={BarChart3} gradient="from-blue-500 to-cyan-500" variant="stats">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData('progress')}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Bar dataKey="progreso" fill="#48dbfb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>
          <ModernCard title="Distribución de Metas" icon={PieChart} gradient="from-purple-500 to-pink-500" variant="stats">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={goalData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {goalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>
          <ModernCard title="Tendencia de Métricas" icon={LineChart} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={getChartData('metrics')}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Line type="monotone" dataKey="valor" stroke="#56ab2f" strokeWidth={3} dot={{ r: 4 }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="fitness-card">
          <div className="flex items-center gap-2 mb-4">
            <ModernButton icon={Plus} onClick={() => setShowMetricModal(true)}>
              Nueva Métrica
            </ModernButton>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getMetricsByCategory(selectedCategory).map((metric, idx) => (
              <ModernCard
                key={metric.id}
                title={metric.name}
                description={metric.description}
                icon={getCategoryIcon(metric.category)}
                gradient="from-blue-500 to-cyan-500"
                variant="fitness"
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl font-bold text-white">{metric.value}</span>
                  <span className="text-sm text-gray-400">{metric.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ModernBadge variant="success" size="sm" icon={TrendingUp}>
                    {metric.trend > 0 ? `+${metric.trend}` : metric.trend}
                  </ModernBadge>
                  <span className="text-xs text-gray-400">Última actualización: {metric.lastUpdate}</span>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="fitness-card">
          <div className="flex items-center gap-2 mb-4">
            <ModernButton icon={Plus} onClick={() => setShowGoalModal(true)}>
              Nueva Meta
            </ModernButton>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getGoalsByCategory(selectedCategory).map((goal, idx) => (
              <ModernCard
                key={goal.id}
                title={goal.name}
                description={goal.description}
                icon={getCategoryIcon(goal.category)}
                gradient="from-green-500 to-emerald-500"
                variant="fitness"
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl font-bold text-white">{goal.progress}%</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-2 ${getProgressBarColor(goal.progress)}`} style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ModernBadge variant={goal.progress >= 100 ? 'success' : 'default'} size="sm" icon={goal.progress >= 100 ? CheckCircle : Target}>
                    {goal.progress >= 100 ? 'Completada' : 'En progreso'}
                  </ModernBadge>
                  <span className="text-xs text-gray-400">Fecha límite: {goal.deadline}</span>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'photos' && (
        <div className="fitness-card">
          <div className="flex items-center gap-2 mb-4">
            <ModernButton icon={Plus} onClick={() => setShowPhotoModal(true)}>
              Nueva Foto
            </ModernButton>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo, idx) => (
              <ModernCard
                key={photo.id}
                title={`Progreso ${photo.date}`}
                icon={Camera}
                gradient="from-yellow-500 to-orange-500"
                variant="fitness"
              >
                <img src={photo.url} alt={`Progreso ${photo.date}`} className="rounded-xl w-full h-40 object-cover mb-2" />
                <div className="flex items-center gap-2">
                  <ModernBadge variant="info" size="sm" icon={Calendar}>
                    {photo.date}
                  </ModernBadge>
                  <span className="text-xs text-gray-400">{photo.note}</span>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
