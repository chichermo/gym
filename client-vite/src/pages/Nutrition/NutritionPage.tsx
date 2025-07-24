import React, { useState } from 'react';
import { useNutrition } from '../../contexts/NutritionContext';
import { 
  Apple, 
  Drumstick, 
  Carrot, 
  Coffee, 
  Droplets,
  Fish,
  Leaf,
  Utensils,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Star,
  Award,
  Download,
  Upload,
  Heart,
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
import { ModernCard, ModernButton } from '../../components/ModernUI';

const NutritionPage: React.FC = () => {
  const { 
    nutrition, 
    addMeal,
    updateNutrition,
    getNutritionStats,
    getMealPlan,
    getCalorieHistory,
    getMacroDistribution,
    exportNutritionData
  } = useNutrition();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddMeal, setShowAddMeal] = useState(false);

  // Datos mock para nutrición
  const mockNutritionStats = {
    totalCalories: 1850,
    targetCalories: 2000,
    protein: 120,
    carbs: 180,
    fat: 65,
    fiber: 25,
    water: 2.5
  };

  const mockCalorieData = [
    { name: 'Lun', consumidas: 1850, objetivo: 2000, quemadas: 450 },
    { name: 'Mar', consumidas: 1920, objetivo: 2000, quemadas: 520 },
    { name: 'Mie', consumidas: 1780, objetivo: 2000, quemadas: 480 },
    { name: 'Jue', consumidas: 2050, objetivo: 2000, quemadas: 390 },
    { name: 'Vie', consumidas: 1890, objetivo: 2000, quemadas: 510 },
    { name: 'Sab', consumidas: 2100, objetivo: 2000, quemadas: 280 },
    { name: 'Dom', consumidas: 1750, objetivo: 2000, quemadas: 320 }
  ];

  const mockMacroData = [
    { name: 'Proteínas', value: 25, color: '#3b82f6', target: 30, icon: Drumstick },
    { name: 'Carbohidratos', value: 45, color: '#10b981', target: 40, icon: Carrot },
    { name: 'Grasas', value: 30, color: '#f59e0b', target: 30, icon: Fish }
  ];

  const mockMealPlan = [
    {
      id: '1',
      name: 'Desayuno',
      time: '08:00',
      calories: 450,
      protein: 25,
      carbs: 45,
      fat: 15,
      foods: [
        { name: 'Avena', calories: 150, protein: 6, carbs: 27, fat: 3 },
        { name: 'Plátano', calories: 105, protein: 1, carbs: 27, fat: 0 },
        { name: 'Leche', calories: 120, protein: 8, carbs: 12, fat: 5 },
        { name: 'Nueces', calories: 75, protein: 3, carbs: 2, fat: 7 }
      ]
    },
    {
      id: '2',
      name: 'Almuerzo',
      time: '13:00',
      calories: 650,
      protein: 35,
      carbs: 55,
      fat: 25,
      foods: [
        { name: 'Pollo', calories: 250, protein: 30, carbs: 0, fat: 12 },
        { name: 'Arroz', calories: 200, protein: 4, carbs: 44, fat: 0 },
        { name: 'Brócoli', calories: 55, protein: 4, carbs: 11, fat: 0 },
        { name: 'Aceite', calories: 145, protein: 0, carbs: 0, fat: 16 }
      ]
    },
    {
      id: '3',
      name: 'Cena',
      time: '20:00',
      calories: 550,
      protein: 30,
      carbs: 40,
      fat: 20,
      foods: [
        { name: 'Salmón', calories: 280, protein: 25, carbs: 0, fat: 18 },
        { name: 'Quinoa', calories: 120, protein: 4, carbs: 22, fat: 2 },
        { name: 'Espinacas', calories: 25, protein: 3, carbs: 4, fat: 0 },
        { name: 'Aguacate', calories: 125, protein: 2, carbs: 9, fat: 11 }
      ]
    }
  ];

  const getMacroColor = (macro: string) => {
    switch (macro) {
      case 'protein': return 'from-blue-500 to-cyan-500';
      case 'carbs': return 'from-green-500 to-emerald-500';
      case 'fat': return 'from-yellow-500 to-orange-500';
      case 'fiber': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getMacroIcon = (macro: string) => {
    switch (macro) {
      case 'protein': return Drumstick;
      case 'carbs': return Carrot;
      case 'fat': return Fish;
      case 'fiber': return Leaf;
      default: return Apple;
    }
  };

  const getMealIcon = (meal: string) => {
    switch (meal.toLowerCase()) {
      case 'desayuno': return Coffee;
      case 'almuerzo': return Utensils;
      case 'cena': return Apple;
      case 'snack': return Carrot;
      default: return Apple;
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90 && progress <= 110) return 'text-green-400';
    if (progress > 110) return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="space-y-8">
      {/* Header y controles */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Nutrición</h1>
            <p className="text-gray-300">Gestiona tu alimentación y alcanza tus objetivos</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Plus} onClick={() => setShowAddMeal(true)}>
              Agregar Comida
            </ModernButton>
            <ModernButton icon={Download} variant="secondary" onClick={() => exportNutritionData()}>
              Exportar
            </ModernButton>
            <ModernButton icon={Upload} variant="glass" onClick={() => console.log('Importar')}>
              Importar
            </ModernButton>
          </div>
        </div>
        {/* Selector de fecha */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-300">Fecha:</span>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Resumen nutricional */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernCard title="Calorías" icon={Target} gradient="from-red-500 to-pink-500" variant="stats">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">{mockNutritionStats.totalCalories}</p>
            <p className="text-sm text-gray-300">de {mockNutritionStats.targetCalories} objetivo</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className={`text-xs ${getProgressColor(calculateProgress(mockNutritionStats.totalCalories, mockNutritionStats.targetCalories))}`}>
                {calculateProgress(mockNutritionStats.totalCalories, mockNutritionStats.targetCalories).toFixed(0)}% del objetivo
              </span>
            </div>
          </div>
        </ModernCard>

        <ModernCard title="Proteínas" icon={Drumstick} gradient="from-blue-500 to-cyan-500" variant="stats">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">{mockNutritionStats.protein}g</p>
            <p className="text-sm text-gray-300">de 150g objetivo</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">80% del objetivo</span>
            </div>
          </div>
        </ModernCard>

        <ModernCard title="Carbohidratos" icon={Carrot} gradient="from-green-500 to-emerald-500" variant="stats">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">{mockNutritionStats.carbs}g</p>
            <p className="text-sm text-gray-300">de 200g objetivo</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">90% del objetivo</span>
            </div>
          </div>
        </ModernCard>

        <ModernCard title="Grasas" icon={Fish} gradient="from-yellow-500 to-orange-500" variant="stats">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">{mockNutritionStats.fat}g</p>
            <p className="text-sm text-gray-300">de 70g objetivo</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">93% del objetivo</span>
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Tabs de navegación */}
      <div className="fitness-card">
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
          {[
            { id: 'overview', label: 'Resumen', icon: BarChart3 },
            { id: 'meals', label: 'Comidas', icon: Utensils },
            { id: 'tracking', label: 'Seguimiento', icon: TrendingUp },
            { id: 'planning', label: 'Planificación', icon: Calendar },
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
          {/* Distribución de macronutrientes */}
          <ModernCard title="Distribución de Macronutrientes" icon={PieChart} gradient="from-purple-500 to-pink-500" variant="stats">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={mockMacroData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {mockMacroData.map((entry, index) => (
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

          {/* Calorías por día */}
          <ModernCard title="Calorías por Día" icon={TrendingUp} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockCalorieData}>
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
                  <Bar dataKey="consumidas" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="objetivo" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>

          {/* Progreso de agua */}
          <ModernCard title="Hidratación" icon={Droplets} gradient="from-blue-500 to-cyan-500" variant="stats">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-2">{mockNutritionStats.water}L</p>
              <p className="text-sm text-gray-300">de 3L objetivo</p>
              <div className="w-full bg-white/10 rounded-full h-3 mt-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(mockNutritionStats.water / 3) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400">83% del objetivo</span>
              </div>
            </div>
          </ModernCard>

          {/* Fibra */}
          <ModernCard title="Fibra" icon={Leaf} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-2">{mockNutritionStats.fiber}g</p>
              <p className="text-sm text-gray-300">de 30g objetivo</p>
              <div className="w-full bg-white/10 rounded-full h-3 mt-4">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(mockNutritionStats.fiber / 30) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400">83% del objetivo</span>
              </div>
            </div>
          </ModernCard>
        </div>
      )}

      {activeTab === 'meals' && (
        <div className="space-y-6">
          {mockMealPlan.map((meal, idx) => {
            const MealIcon = getMealIcon(meal.name);
            return (
              <ModernCard
                key={meal.id}
                title={meal.name}
                description={`${meal.time} - ${meal.calories} calorías`}
                icon={MealIcon}
                gradient="from-orange-500 to-red-500"
                variant="fitness"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Drumstick className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-300">Proteínas:</span>
                    <span className="text-white font-bold">{meal.protein}g</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Carrot className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Carbohidratos:</span>
                    <span className="text-white font-bold">{meal.carbs}g</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fish className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">Grasas:</span>
                    <span className="text-white font-bold">{meal.fat}g</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-300">Alimentos:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {meal.foods.map((food, foodIdx) => (
                      <div key={foodIdx} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <span className="text-sm text-white">{food.name}</span>
                        <span className="text-xs text-gray-400">{food.calories} cal</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ModernCard>
            );
          })}
        </div>
      )}

      {activeTab === 'tracking' && (
        <div className="space-y-6">
          {/* Gráfico de calorías vs objetivo */}
          <ModernCard title="Calorías vs Objetivo" icon={Target} gradient="from-blue-500 to-cyan-500" variant="stats">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockCalorieData}>
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
                  <Area type="monotone" dataKey="consumidas" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="objetivo" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>

          {/* Progreso semanal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ModernCard title="Promedio Semanal" icon={TrendingUp} gradient="from-green-500 to-emerald-500" variant="stats">
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-2">1,890</p>
                <p className="text-sm text-gray-300">calorías/día</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">94% del objetivo</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard title="Días Objetivo" icon={Award} gradient="from-purple-500 to-pink-500" variant="stats">
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-2">5/7</p>
                <p className="text-sm text-gray-300">días esta semana</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">71% de éxito</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard title="Consistencia" icon={Heart} gradient="from-red-500 to-pink-500" variant="stats">
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-2">87%</p>
                <p className="text-sm text-gray-300">este mes</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">+5% vs mes anterior</span>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>
      )}

      {activeTab === 'planning' && (
        <div className="space-y-6">
          {/* Plan de comidas */}
          <ModernCard title="Plan de Comidas" icon={Calendar} gradient="from-blue-500 to-cyan-500" variant="fitness">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Hoy - {selectedDate.toLocaleDateString()}</h3>
                <ModernButton icon={Plus} size="sm">
                  Agregar Comida
                </ModernButton>
              </div>
              
              <div className="space-y-3">
                {mockMealPlan.map((meal, idx) => (
                  <div key={meal.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        {React.createElement(getMealIcon(meal.name), { className: "w-5 h-5 text-white" })}
                      </div>
                      <div>
                        <p className="text-white font-medium">{meal.name}</p>
                        <p className="text-sm text-gray-400">{meal.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{meal.calories} cal</p>
                      <p className="text-xs text-gray-400">P: {meal.protein}g | C: {meal.carbs}g | G: {meal.fat}g</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ModernCard>

          {/* Recomendaciones */}
          <ModernCard title="Recomendaciones" icon={Star} gradient="from-purple-500 to-pink-500" variant="fitness">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Drumstick className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Aumenta la proteína</p>
                  <p className="text-sm text-gray-300">Estás 20g por debajo de tu objetivo diario</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Más fibra</p>
                  <p className="text-sm text-gray-300">Añade más verduras y frutas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Hidratación</p>
                  <p className="text-sm text-gray-300">Bebe 0.5L más de agua hoy</p>
                </div>
              </div>
            </div>
          </ModernCard>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Insights nutricionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModernCard title="Mejor Día" icon={Star} gradient="from-yellow-500 to-orange-500" variant="fitness">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">Martes</p>
                    <p className="text-sm text-gray-300">Tu día más balanceado</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Calorías</span>
                    <span className="text-white font-bold">1,920 / 2,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Proteínas</span>
                    <span className="text-white font-bold">140g / 150g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Balance</span>
                    <span className="text-white font-bold">96%</span>
                  </div>
                </div>
              </div>
            </ModernCard>

            <ModernCard title="Área de Mejora" icon={Target} gradient="from-red-500 to-pink-500" variant="fitness">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Drumstick className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">Proteínas</p>
                    <p className="text-sm text-gray-300">Necesita más atención</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Promedio actual</span>
                    <span className="text-white font-bold">120g</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-xs text-gray-400">Sugerencia: Añade más pescado, huevos y legumbres</p>
                </div>
              </div>
            </ModernCard>
          </div>

          {/* Tendencias */}
          <ModernCard title="Tendencias Nutricionales" icon={TrendingUp} gradient="from-purple-500 to-pink-500" variant="stats">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={mockCalorieData}>
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
                  <Line type="monotone" dataKey="consumidas" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="objetivo" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>
        </div>
      )}
    </div>
  );
};

export default NutritionPage; 