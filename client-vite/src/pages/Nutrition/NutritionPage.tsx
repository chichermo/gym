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
import type { Nutrition } from '../../types/nutrition';
import { nutritionData } from '../../data/nutritionData';

const NutritionPage: React.FC = () => {
  const [entries, setEntries] = useState<Nutrition[]>(nutritionData);
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

        {/* Selector de fecha */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Entradas del Día</h3>
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Historial
              </button>
            </div>
          </div>

          {/* Lista de entradas */}
          <div className="space-y-4">
            {todayEntries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Apple className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No hay entradas para este día</p>
                <p className="text-sm">Agrega tu primera comida del día</p>
              </div>
            ) : (
              todayEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {entry.meal}
                      </span>
                      <h4 className="font-medium text-gray-900">{entry.name}</h4>
                    </div>
                    <div className="mt-2 grid grid-cols-5 gap-4 text-sm text-gray-600">
                      <span>{entry.calories} cal</span>
                      <span>{entry.protein}g proteína</span>
                      <span>{entry.carbs}g carbos</span>
                      <span>{entry.fat}g grasas</span>
                      <span>{entry.fiber}g fibra</span>
                    </div>
                    {entry.notes && (
                      <p className="mt-2 text-sm text-gray-500">{entry.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditEntry(entry)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Componente de seguimiento nutricional */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar Nueva Entrada</h3>
          <NutritionTracker onAddEntry={handleAddEntry} />
        </div>
      </div>
    </div>
  );
};

export default NutritionPage; 