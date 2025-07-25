import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Star,
  Plus,
  Edit,
  Trash2,
  Award,
  Trophy,
  BarChart3,
  Activity
} from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';

// Definir tipos para metas
interface Goal {
  id: string;
  name: string;
  category: 'Peso' | 'Composición Corporal' | 'Ropa' | 'Nutrición' | 'Hidratación' | 'Alimentación';
  type: 'weight_loss' | 'weight_gain' | 'fat_loss' | 'muscle_gain' | 'clothing_size' | 'nutrition' | 'hydration' | 'food_consumption';
  target: number;
  unit: string;
  current: number;
  timeframe: 'short' | 'medium' | 'long';
  startDate: string;
  endDate: string;
  progress: number;
  completed: boolean;
  description: string;
  tips: string[];
}

// Metas predeterminadas
const predefinedGoals = [
  // PESO
  {
    id: 'weight_loss_1',
    name: 'Bajar peso',
    category: 'Peso',
    type: 'weight_loss',
    target: 5,
    unit: 'kg',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Reducir peso corporal de forma saludable',
    tips: ['Déficit calórico moderado', 'Ejercicio regular', 'Paciencia']
  },
  {
    id: 'weight_gain_1',
    name: 'Subir peso',
    category: 'Peso',
    type: 'weight_gain',
    target: 3,
    unit: 'kg',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Aumentar peso corporal de forma saludable',
    tips: ['Superávit calórico', 'Entrenamiento de fuerza', 'Descanso adecuado']
  },

  // COMPOSICIÓN CORPORAL
  {
    id: 'fat_loss_1',
    name: 'Bajar grasa corporal',
    category: 'Composición Corporal',
    type: 'fat_loss',
    target: 2,
    unit: 'kg',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Reducir porcentaje de grasa corporal',
    tips: ['Cardio regular', 'Dieta equilibrada', 'Entrenamiento de fuerza']
  },
  {
    id: 'muscle_gain_1',
    name: 'Subir masa muscular',
    category: 'Composición Corporal',
    type: 'muscle_gain',
    target: 2,
    unit: 'kg',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Aumentar masa muscular magra',
    tips: ['Proteína adecuada', 'Entrenamiento progresivo', 'Recuperación']
  },

  // ROPA
  {
    id: 'clothing_size_down',
    name: 'Bajar una talla de ropa',
    category: 'Ropa',
    type: 'clothing_size',
    target: 1,
    unit: 'talla',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Reducir talla de ropa',
    tips: ['Pérdida de peso gradual', 'Mediciones regulares', 'Paciencia']
  },
  {
    id: 'clothing_size_up',
    name: 'Aumentar una talla de ropa',
    category: 'Ropa',
    type: 'clothing_size',
    target: 1,
    unit: 'talla',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Aumentar talla de ropa',
    tips: ['Ganancia muscular', 'Mediciones regulares', 'Entrenamiento consistente']
  },

  // NUTRICIÓN
  {
    id: 'protein_sources',
    name: 'Consumir fuentes de proteína',
    category: 'Nutrición',
    type: 'nutrition',
    target: 3,
    unit: 'fuentes/día',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Incluir múltiples fuentes de proteína diariamente',
    tips: ['Pollo, pescado, huevos', 'Legumbres, lácteos', 'Variedad es clave']
  },
  {
    id: 'fat_sources',
    name: 'Consumir fuentes de grasas',
    category: 'Nutrición',
    type: 'nutrition',
    target: 2,
    unit: 'fuentes/día',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Incluir grasas saludables en la dieta',
    tips: ['Aguacate, nueces', 'Aceite de oliva', 'Pescado azul']
  },
  {
    id: 'carb_sources',
    name: 'Consumir fuentes de carbohidratos',
    category: 'Nutrición',
    type: 'nutrition',
    target: 4,
    unit: 'fuentes/día',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Incluir carbohidratos complejos',
    tips: ['Arroz integral, quinoa', 'Avena, pan integral', 'Frutas y verduras']
  },

  // HIDRATACIÓN
  {
    id: 'water_intake',
    name: 'Consumir agua diariamente',
    category: 'Hidratación',
    type: 'hydration',
    target: 2.5,
    unit: 'litros/día',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Mantener hidratación adecuada',
    tips: ['Botella siempre cerca', 'Recordatorios', 'Saborizar si es necesario']
  },

  // ALIMENTACIÓN
  {
    id: 'fruits_intake',
    name: 'Consumir frutas diariamente',
    category: 'Alimentación',
    type: 'food_consumption',
    target: 3,
    unit: 'porciones/día',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Incluir frutas variadas en la dieta',
    tips: ['Variedad de colores', 'Frutas de temporada', 'Como snack saludable']
  },
  {
    id: 'vegetables_intake',
    name: 'Consumir verduras diariamente',
    category: 'Alimentación',
    type: 'food_consumption',
    target: 4,
    unit: 'porciones/día',
    current: 0,
    timeframe: 'short',
    startDate: '',
    endDate: '',
    progress: 0,
    completed: false,
    description: 'Incluir verduras variadas en la dieta',
    tips: ['Verduras de hoja verde', 'Verduras coloridas', 'En cada comida']
  }
];

const ProgressPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'short' | 'medium' | 'long'>('short');
  const [activeTab, setActiveTab] = useState('overview');

  const timeframeLabels = {
    short: 'Corto Plazo (0-8 semanas)',
    medium: 'Mediano Plazo (9-24 semanas)',
    long: 'Largo Plazo (25-50 semanas)'
  };

  const timeframeColors = {
    short: 'from-green-500 to-emerald-500',
    medium: 'from-yellow-500 to-orange-500',
    long: 'from-purple-500 to-pink-500'
  };

  const getTimeframeWeeks = (timeframe: string) => {
    switch (timeframe) {
      case 'short': return '0-8 semanas';
      case 'medium': return '9-24 semanas';
      case 'long': return '25-50 semanas';
      default: return '';
    }
  };

  const handleAddGoal = (goal: Goal) => {
    const newGoal = {
      ...goal,
      id: `${goal.id}_${Date.now()}`,
      timeframe: selectedTimeframe,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + (selectedTimeframe === 'short' ? 8 * 7 * 24 * 60 * 60 * 1000 : 
                                    selectedTimeframe === 'medium' ? 24 * 7 * 24 * 60 * 60 * 1000 : 
                                    50 * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
    };
    setGoals([...goals, newGoal]);
    setShowAddGoal(false);
  };

  const handleUpdateProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: newProgress, progress: (newProgress / goal.target) * 100 }
        : goal
    ));
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const filteredGoals = goals.filter(goal => goal.timeframe === selectedTimeframe);
  const completedGoals = goals.filter(goal => goal.completed);
  const activeGoals = goals.filter(goal => !goal.completed);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Progreso</h1>
            <p className="text-gray-300">Rastrea tus metas y logros</p>
          </div>
          <ModernButton 
            icon={Plus} 
            variant="primary" 
            onClick={() => setShowAddGoal(true)}
          >
            Agregar Meta
          </ModernButton>
        </div>
      </div>

      {/* Tabs */}
      <div className="fitness-card">
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl mb-6">
          {[
            { id: 'overview', label: 'Resumen', icon: BarChart3 },
            { id: 'goals', label: 'Distribución de Metas', icon: Target },
            { id: 'achievements', label: 'Logros', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido de tabs */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Estadísticas generales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <ModernCard title="Metas Activas" icon={Target} gradient="from-blue-500 to-cyan-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{activeGoals.length}</div>
                  <p className="text-gray-300 text-sm">En Progreso</p>
                </div>
              </ModernCard>
              
              <ModernCard title="Metas Completadas" icon={CheckCircle} gradient="from-green-500 to-emerald-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{completedGoals.length}</div>
                  <p className="text-gray-300 text-sm">Logradas</p>
                </div>
              </ModernCard>
              
              <ModernCard title="Progreso Promedio" icon={TrendingUp} gradient="from-purple-500 to-pink-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {goals.length > 0 ? Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length) : 0}%
                  </div>
                  <p className="text-gray-300 text-sm">Promedio</p>
                </div>
              </ModernCard>
              
              <ModernCard title="Próxima Meta" icon={Star} gradient="from-yellow-500 to-orange-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {activeGoals.length > 0 ? activeGoals[0].name.slice(0, 10) + '...' : 'N/A'}
                  </div>
                  <p className="text-gray-300 text-sm">Prioritaria</p>
                </div>
              </ModernCard>
            </div>

            {/* Gráfico de progreso */}
            <div className="fitness-card">
              <h3 className="text-xl font-bold text-white mb-4">Progreso General</h3>
              <div className="space-y-4">
                {goals.slice(0, 5).map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{goal.name}</span>
                      <span className="text-gray-400">{Math.round(goal.progress)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            {/* Filtros de plazo */}
            <div className="flex flex-wrap gap-2">
              {(['short', 'medium', 'long'] as const).map(timeframe => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedTimeframe === timeframe
                      ? `bg-gradient-to-r ${timeframeColors[timeframe]} text-white`
                      : 'bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  {timeframeLabels[timeframe]}
                </button>
              ))}
            </div>

            {/* Lista de metas */}
            <div className="space-y-4">
              {filteredGoals.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No hay metas en este plazo</h3>
                  <p className="text-gray-300">Agrega una nueva meta para comenzar</p>
                </div>
              ) : (
                filteredGoals.map(goal => (
                  <div key={goal.id} className="fitness-card">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{goal.name}</h3>
                        <p className="text-gray-400 text-sm">{goal.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          goal.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {goal.completed ? 'Completada' : 'En Progreso'}
                        </span>
                        <button
                          onClick={() => handleDeleteGoal(goal.id)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progreso: {goal.current}/{goal.target} {goal.unit}</span>
                        <span className="text-white">{Math.round(goal.progress)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>Inicio: {new Date(goal.startDate).toLocaleDateString('es-ES')}</span>
                        <span>Fin: {new Date(goal.endDate).toLocaleDateString('es-ES')}</span>
                        <span>{getTimeframeWeeks(goal.timeframe)}</span>
                      </div>

                      {/* Tips */}
                      <div className="mt-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-400 mb-2">Tips:</p>
                        <ul className="text-xs text-gray-300 space-y-1">
                          {goal.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Logros</h3>
              <p className="text-gray-300">Aquí aparecerán tus logros y medallas</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal para agregar meta */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="modal-content max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Agregar Nueva Meta</h2>
              <button
                onClick={() => setShowAddGoal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Selección de plazo */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Plazo de la Meta:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(['short', 'medium', 'long'] as const).map(timeframe => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedTimeframe === timeframe
                          ? `border-blue-500 bg-blue-500/10`
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{timeframeLabels[timeframe]}</div>
                        <div className="text-sm text-gray-400">{getTimeframeWeeks(timeframe)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de metas predeterminadas */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Selecciona una Meta:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {predefinedGoals.map(goal => (
                    <button
                      key={goal.id}
                      onClick={() => handleAddGoal(goal)}
                      className="p-4 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 text-left"
                    >
                      <div className="font-medium text-white mb-1">{goal.name}</div>
                      <div className="text-sm text-gray-400">{goal.description}</div>
                      <div className="text-xs text-gray-500 mt-2">
                        {goal.target} {goal.unit} • {goal.category}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
