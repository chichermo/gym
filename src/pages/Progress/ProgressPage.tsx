import React, { useState } from 'react';
import { 
  TrendingUp, 
  Plus, 
  Calendar, 
  Target, 
  Activity, 
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Filter,
  Edit,
  Trash2
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  mockProgress, 
  weightProgressData, 
  workoutFrequencyData, 
  strengthProgressData,
  workoutStats 
} from '../../data/mockData';

const ProgressPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [showAddModal, setShowAddModal] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'weight', label: 'Peso', icon: TrendingUp },
    { id: 'measurements', label: 'Mediciones', icon: Target },
    { id: 'strength', label: 'Fuerza', icon: Activity }
  ];

  const periods = [
    { id: '7d', label: '7 días' },
    { id: '30d', label: '30 días' },
    { id: '90d', label: '90 días' },
    { id: '1y', label: '1 año' }
  ];

  const weightData = weightProgressData.slice(-10); // Últimos 10 registros
  const frequencyData = workoutFrequencyData.slice(-8); // Últimas 8 semanas

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Peso Actual</p>
              <p className="text-2xl font-bold text-gray-800">75 kg</p>
              <p className="text-sm text-green-600">-2.5 kg este mes</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Entrenamientos</p>
              <p className="text-2xl font-bold text-gray-800">{workoutStats.totalWorkouts}</p>
              <p className="text-sm text-blue-600">+12 este mes</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Calorías Quemadas</p>
              <p className="text-2xl font-bold text-gray-800">{workoutStats.totalCalories.toLocaleString()}</p>
              <p className="text-sm text-orange-600">+2,400 este mes</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Racha Actual</p>
              <p className="text-2xl font-bold text-gray-800">{workoutStats.currentStreak} días</p>
              <p className="text-sm text-purple-600">¡Mantén el ritmo!</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progreso de peso */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Progreso de Peso</h3>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              {periods.map(period => (
                <option key={period.id} value={period.id}>{period.label}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>

        {/* Frecuencia de entrenamientos */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Frecuencia de Entrenamientos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="workouts" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progreso de fuerza */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Progreso de Fuerza</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {strengthProgressData.map((exercise, index) => (
            <div key={exercise.exercise} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">{exercise.exercise}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Actual:</span>
                  <span className="font-medium">{exercise.current}{exercise.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Objetivo:</span>
                  <span className="font-medium">{exercise.goal}{exercise.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(exercise.current / exercise.goal) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {Math.round((exercise.current / exercise.goal) * 100)}% completado
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWeight = () => (
    <div className="space-y-6">
      {/* Gráfica de peso */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Historial de Peso</h3>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Agregar Peso
          </button>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <RechartsLineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de registros */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Registros de Peso</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Fecha</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Peso</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Cambio</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Notas</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockProgress.filter(p => p.type === 'weight').slice(0, 10).map((record, index) => {
                const prevWeight = index < mockProgress.length - 1 ? mockProgress[index + 1].value : record.value;
                const change = record.value - prevWeight;
                return (
                  <tr key={record.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-medium">{record.value} kg</td>
                    <td className="py-3 px-4">
                      {change !== 0 && (
                        <span className={`text-sm ${change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {change > 0 ? '+' : ''}{change.toFixed(1)} kg
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{record.notes}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMeasurements = () => (
    <div className="space-y-6">
      {/* Gráfica de mediciones */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Mediciones Corporales</h3>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Agregar Mediciones
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {mockProgress.filter(p => p.type === 'measurements').slice(0, 1).map(record => 
            record.measurements && Object.entries(record.measurements).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 capitalize mb-1">{key}</p>
                <p className="text-xl font-bold text-gray-800">{value} cm</p>
              </div>
            ))
          )}
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: 'Pecho', actual: 105, previous: 103 },
            { name: 'Cintura', actual: 82, previous: 83 },
            { name: 'Brazos', actual: 35, previous: 34 },
            { name: 'Piernas', actual: 58, previous: 57 },
            { name: 'Hombros', actual: 120, previous: 118 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="previous" fill="#9CA3AF" name="Anterior" />
            <Bar dataKey="actual" fill="#3B82F6" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Historial de mediciones */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Historial de Mediciones</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Fecha</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Pecho</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Cintura</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Brazos</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Piernas</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Hombros</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Notas</th>
              </tr>
            </thead>
            <tbody>
              {mockProgress.filter(p => p.type === 'measurements').map(record => 
                record.measurements && (
                  <tr key={record.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    {Object.values(record.measurements).map((value, index) => (
                      <td key={index} className="py-3 px-4 font-medium">{value} cm</td>
                    ))}
                    <td className="py-3 px-4 text-sm text-gray-600">{record.notes}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStrength = () => (
    <div className="space-y-6">
      {/* Progreso de fuerza */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Progreso de Fuerza</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengthProgressData.map((exercise, index) => (
            <div key={exercise.exercise} className="p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{exercise.exercise}</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progreso actual</span>
                  <span className="text-lg font-bold text-blue-600">{exercise.current}{exercise.unit}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((exercise.current / exercise.goal) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Objetivo: {exercise.goal}{exercise.unit}</span>
                  <span>{Math.round((exercise.current / exercise.goal) * 100)}%</span>
                </div>
                
                <div className="text-sm text-gray-500">
                  Faltan {exercise.goal - exercise.current}{exercise.unit} para alcanzar el objetivo
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfica de progreso */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolución de Fuerza</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RechartsLineChart data={[
            { month: 'Ene', bench: 80, squat: 100, deadlift: 120 },
            { month: 'Feb', bench: 85, squat: 105, deadlift: 125 },
            { month: 'Mar', bench: 90, squat: 110, deadlift: 130 },
            { month: 'Abr', bench: 95, squat: 115, deadlift: 135 },
            { month: 'May', bench: 100, squat: 120, deadlift: 140 },
            { month: 'Jun', bench: 100, squat: 120, deadlift: 140 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="bench" stroke="#3B82F6" strokeWidth={2} name="Press Banca" />
            <Line type="monotone" dataKey="squat" stroke="#10B981" strokeWidth={2} name="Sentadillas" />
            <Line type="monotone" dataKey="deadlift" stroke="#F59E0B" strokeWidth={2} name="Peso Muerto" />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mi Progreso</h1>
              <p className="text-gray-600 mt-2">Rastrea tu evolución y alcanza tus objetivos</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Download size={16} />
                Exportar
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Agregar Registro
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'weight' && renderWeight()}
            {activeTab === 'measurements' && renderMeasurements()}
            {activeTab === 'strength' && renderStrength()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage; 