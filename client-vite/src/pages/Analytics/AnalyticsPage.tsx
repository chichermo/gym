import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Target, Calendar, Activity, Users } from 'lucide-react';
import AdvancedCharts from '../../components/Analytics/AdvancedCharts';
import ReportExporter from '../../components/Analytics/ReportExporter';
import PerformanceComparison from '../../components/Analytics/PerformanceComparison';

const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'charts' | 'comparison' | 'export'>('charts');

  // Datos de ejemplo para los gráficos
  const workoutData = [
    { name: 'Lun', value: 3, target: 4 },
    { name: 'Mar', value: 2, target: 4 },
    { name: 'Mié', value: 4, target: 4 },
    { name: 'Jue', value: 1, target: 4 },
    { name: 'Vie', value: 3, target: 4 },
    { name: 'Sáb', value: 5, target: 4 },
    { name: 'Dom', value: 2, target: 4 }
  ];

  const caloriesData = [
    { name: 'Lun', value: 450 },
    { name: 'Mar', value: 320 },
    { name: 'Mié', value: 580 },
    { name: 'Jue', value: 280 },
    { name: 'Vie', value: 420 },
    { name: 'Sáb', value: 650 },
    { name: 'Dom', value: 380 }
  ];

  const exerciseTypeData = [
    { name: 'Cardio', value: 35 },
    { name: 'Fuerza', value: 25 },
    { name: 'Flexibilidad', value: 20 },
    { name: 'HIIT', value: 15 },
    { name: 'Yoga', value: 5 }
  ];

  const performanceData = [
    { name: 'Resistencia', value: 85 },
    { name: 'Fuerza', value: 70 },
    { name: 'Flexibilidad', value: 60 },
    { name: 'Velocidad', value: 75 },
    { name: 'Equilibrio', value: 80 }
  ];

  const currentPerformance = {
    period: 'Semana Actual',
    workouts: 20,
    calories: 2800,
    steps: 85000,
    heartRate: 145,
    duration: 420
  };

  const previousPerformance = {
    period: 'Semana Anterior',
    workouts: 18,
    calories: 2600,
    steps: 82000,
    heartRate: 142,
    duration: 390
  };

  const availableReports = [
    {
      title: 'Reporte de Progreso',
      data: workoutData,
      type: 'progress' as const
    },
    {
      title: 'Análisis de Entrenamientos',
      data: caloriesData,
      type: 'workouts' as const
    },
    {
      title: 'Métricas de Rendimiento',
      data: performanceData,
      type: 'analytics' as const
    },
    {
      title: 'Actividad Social',
      data: exerciseTypeData,
      type: 'social' as const
    }
  ];

  const handleExport = (format: 'pdf' | 'excel', data: any) => {
    console.log(`Exporting ${data.title} in ${format} format`);
    // Aquí se implementaría la lógica real de exportación
  };

  const handlePeriodChange = (period: 'week' | 'month' | 'quarter') => {
    console.log(`Period changed to: ${period}`);
    // Aquí se actualizarían los datos según el período
  };

  const tabs = [
    { id: 'charts', label: 'Gráficos', icon: BarChart3 },
    { id: 'comparison', label: 'Comparación', icon: TrendingUp },
    { id: 'export', label: 'Exportar', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Analytics</h1>
          <p className="text-gray-600">Analiza tu progreso y rendimiento con datos detallados</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'charts' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AdvancedCharts
                data={workoutData}
                type="line"
                title="Entrenamientos Semanales"
                subtitle="Progreso vs meta semanal"
                height={300}
              />
              <AdvancedCharts
                data={caloriesData}
                type="area"
                title="Calorías Quemadas"
                subtitle="Consumo diario de calorías"
                height={300}
              />
              <AdvancedCharts
                data={exerciseTypeData}
                type="pie"
                title="Distribución de Ejercicios"
                subtitle="Tipos de entrenamiento"
                height={300}
              />
              <AdvancedCharts
                data={performanceData}
                type="radar"
                title="Rendimiento por Categoría"
                subtitle="Análisis multidimensional"
                height={300}
              />
            </div>
          )}

          {activeTab === 'comparison' && (
            <PerformanceComparison
              currentData={currentPerformance}
              previousData={previousPerformance}
              onPeriodChange={handlePeriodChange}
            />
          )}

          {activeTab === 'export' && (
            <ReportExporter
              onExport={handleExport}
              availableReports={availableReports}
            />
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: 'Entrenamientos', value: '20', icon: Activity, color: 'from-blue-500 to-indigo-600' },
            { label: 'Calorías Totales', value: '2,800', icon: Target, color: 'from-green-500 to-emerald-600' },
            { label: 'Días Activos', value: '5/7', icon: Calendar, color: 'from-purple-500 to-pink-600' },
            { label: 'Amigos Conectados', value: '12', icon: Users, color: 'from-orange-500 to-red-600' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 