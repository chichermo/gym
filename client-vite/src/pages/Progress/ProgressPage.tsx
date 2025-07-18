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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Progreso
              </h1>
              <p className="text-lg text-gray-600">
                Rastrea tu evolución y alcanza tus metas
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowMetricModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Agregar Métrica
              </button>
              <button
                onClick={() => setShowGoalModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <Target className="w-4 h-4" />
                Nueva Meta
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalMetrics}</div>
                <div className="text-sm text-gray-500">Métricas Registradas</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.completedGoals}</div>
                <div className="text-sm text-gray-500">Metas Completadas</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(stats.averageProgress)}%
                </div>
                <div className="text-sm text-gray-500">Progreso Promedio</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{photos.length}</div>
                <div className="text-sm text-gray-500">Fotos de Progreso</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {[
              { id: 'overview', label: 'Resumen', icon: BarChart3 },
              { id: 'metrics', label: 'Métricas', icon: TrendingUp },
              { id: 'goals', label: 'Metas', icon: Target },
              { id: 'photos', label: 'Fotos', icon: Camera }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Resumen del Progreso</h2>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso de Metas</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={goalData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="progress"
                      >
                        {goalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Progress */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso por Categoría</h3>
                <div className="space-y-4">
                  {Object.entries(stats.categoryProgress).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category)}
                        <span className="font-medium text-gray-900 capitalize">{category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(count / stats.totalMetrics) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                {stats.recentProgress.slice(0, 5).map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(metric.category)}
                      <div>
                        <div className="font-medium text-gray-900">{metric.name}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(metric.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{metric.value} {metric.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Métricas</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {metrics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics
                  .filter(metric => selectedCategory === 'all' || metric.category === selectedCategory)
                  .map((metric) => (
                    <div
                      key={metric.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(metric.category)}
                          <span className="text-sm font-medium text-gray-500 capitalize">
                            {metric.category}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{metric.name}</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {metric.value} {metric.unit}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(metric.date).toLocaleDateString()}
                      </div>
                      {metric.notes && (
                        <div className="mt-2 text-sm text-gray-600">{metric.notes}</div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay métricas registradas
                </h3>
                <p className="text-gray-500 mb-4">
                  Comienza a registrar tu progreso para ver tus métricas aquí
                </p>
                <button
                  onClick={() => setShowMetricModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Agregar Primera Métrica
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Metas</h2>
              <button
                onClick={() => setShowGoalModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Nueva Meta
              </button>
            </div>

            {goals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${
                      goal.isCompleted ? 'ring-2 ring-green-400' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(goal.category)}
                        <span className="text-sm font-medium text-gray-500 capitalize">
                          {goal.category}
                        </span>
                      </div>
                      {goal.isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{goal.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{goal.description}</p>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">Progreso</span>
                        <span className={`font-semibold ${getProgressColor(goal.progress)}`}>
                          {Math.round(goal.progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(goal.progress)}`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div>
                        <div>Actual: {goal.currentValue} {goal.unit}</div>
                        <div>Meta: {goal.targetValue} {goal.unit}</div>
                      </div>
                      <div className="text-right">
                        <div>Fecha límite:</div>
                        <div>{new Date(goal.deadline).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors duration-200">
                        Actualizar
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay metas establecidas
                </h3>
                <p className="text-gray-500 mb-4">
                  Establece metas para mantenerte motivado y enfocado
                </p>
                <button
                  onClick={() => setShowGoalModal(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  Crear Primera Meta
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Fotos de Progreso</h2>
              <button
                onClick={() => setShowPhotoModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
              >
                <Camera className="w-4 h-4" />
                Agregar Foto
              </button>
            </div>

            {photos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-200 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500 capitalize">
                          {photo.category}
                        </span>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(photo.date).toLocaleDateString()}
                      </div>
                      {photo.notes && (
                        <div className="mt-2 text-sm text-gray-600">{photo.notes}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay fotos de progreso
                </h3>
                <p className="text-gray-500 mb-4">
                  Las fotos te ayudarán a visualizar tu progreso físico
                </p>
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
                >
                  Agregar Primera Foto
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals would go here */}
    </div>
  );
};

export default ProgressPage;
