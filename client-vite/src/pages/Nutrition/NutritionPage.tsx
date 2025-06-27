import React, { useState, useEffect } from 'react';
import NutritionTracker from '../../components/NutritionTracker';
import { 
  Apple, 
  TrendingUp, 
  Target, 
  Clock, 
  BarChart3,
  Calendar,
  Filter,
  Download,
  Share2
} from 'lucide-react';
import { mockNutrition, Nutrition } from '../../data/mockData';

const NutritionPage: React.FC = () => {
  const [entries, setEntries] = useState<Nutrition[]>(mockNutrition);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showHistory, setShowHistory] = useState(false);

  const todayEntries = entries.filter(entry => entry.date === selectedDate);

  const totals = todayEntries.reduce((acc, entry) => ({
    calories: acc.calories + entry.calories,
    protein: acc.protein + entry.protein,
    carbs: acc.carbs + entry.carbs,
    fat: acc.fat + entry.fat,
    fiber: acc.fiber + entry.fiber
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

  const goals = {
    calories: 2200,
    protein: 180,
    carbs: 250,
    fat: 70,
    fiber: 30
  };

  const handleAddEntry = (entry: Nutrition) => {
    setEntries(prev => [...prev, entry]);
  };

  const handleEditEntry = (updatedEntry: Nutrition) => {
    setEntries(prev => prev.map(e => e.id === updatedEntry.id ? updatedEntry : e));
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Apple className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Seguimiento Nutricional</h1>
          </div>
          <p className="text-gray-600">Registra y analiza tu consumo de nutrientes diario</p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6" />
              <span className="text-sm font-medium">Calorías</span>
            </div>
            <div className="text-3xl font-bold">{totals.calories}</div>
            <div className="text-sm opacity-90">Meta: {goals.calories}</div>
            <div className="mt-2 text-xs">
              {Math.round((totals.calories / goals.calories) * 100)}% del objetivo
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm font-medium">Proteína</span>
            </div>
            <div className="text-3xl font-bold">{totals.protein}g</div>
            <div className="text-sm opacity-90">Meta: {goals.protein}g</div>
            <div className="mt-2 text-xs">
              {Math.round((totals.protein / goals.protein) * 100)}% del objetivo
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm font-medium">Carbohidratos</span>
            </div>
            <div className="text-3xl font-bold">{totals.carbs}g</div>
            <div className="text-sm opacity-90">Meta: {goals.carbs}g</div>
            <div className="mt-2 text-xs">
              {Math.round((totals.carbs / goals.carbs) * 100)}% del objetivo
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6" />
              <span className="text-sm font-medium">Grasas</span>
            </div>
            <div className="text-3xl font-bold">{totals.fat}g</div>
            <div className="text-sm opacity-90">Meta: {goals.fat}g</div>
            <div className="mt-2 text-xs">
              {Math.round((totals.fat / goals.fat) * 100)}% del objetivo
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm font-medium">Fibra</span>
            </div>
            <div className="text-3xl font-bold">{totals.fiber}g</div>
            <div className="text-sm opacity-90">Meta: {goals.fiber}g</div>
            <div className="mt-2 text-xs">
              {Math.round((totals.fiber / goals.fiber) * 100)}% del objetivo
            </div>
          </div>
        </div>

        {/* Barras de progreso detalladas */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso Detallado</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Calorías</span>
                <span className={getProgressColor(totals.calories, goals.calories)}>
                  {totals.calories} / {goals.calories}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(totals.calories, goals.calories)}`}
                  style={{ width: `${Math.min((totals.calories / goals.calories) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Proteína</span>
                <span className={getProgressColor(totals.protein, goals.protein)}>
                  {totals.protein}g / {goals.protein}g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(totals.protein, goals.protein)}`}
                  style={{ width: `${Math.min((totals.protein / goals.protein) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Carbohidratos</span>
                <span className={getProgressColor(totals.carbs, goals.carbs)}>
                  {totals.carbs}g / {goals.carbs}g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(totals.carbs, goals.carbs)}`}
                  style={{ width: `${Math.min((totals.carbs / goals.carbs) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Grasas</span>
                <span className={getProgressColor(totals.fat, goals.fat)}>
                  {totals.fat}g / {goals.fat}g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(totals.fat, goals.fat)}`}
                  style={{ width: `${Math.min((totals.fat / goals.fat) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Fecha</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Historial
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
            </div>
          </div>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Tracker de nutrición */}
        <NutritionTracker
          entries={todayEntries}
          onAddEntry={handleAddEntry}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
        />

        {/* Consejos nutricionales */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">💡 Consejo del Día</h3>
            <p className="text-sm opacity-90">
              "Para maximizar la síntesis de proteínas, distribuye tu consumo de proteína 
              uniformemente a lo largo del día, con 20-30g por comida."
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">🎯 Objetivo Semanal</h3>
            <p className="text-sm opacity-90">
              "Mantén un déficit calórico de 500 calorías diarias para perder 0.5kg por semana 
              de manera saludable y sostenible."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage; 