import React, { useState } from 'react';
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
  Share2,
  Zap,
  Heart,
  Activity,
  Plus
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
    if (percentage >= 100) return 'text-emerald-600';
    if (percentage >= 80) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getProgressBarColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'bg-emerald-500';
    if (percentage >= 80) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Header Mejorado */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Apple className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Seguimiento Nutricional
              </h1>
              <p className="text-slate-600 mt-1">Registra y analiza tu consumo de nutrientes diario</p>
            </div>
          </div>
        </div>

        {/* Estadísticas principales mejoradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Calorías</span>
            </div>
            <div className="text-3xl font-bold mb-1">{totals.calories}</div>
            <div className="text-sm opacity-90 mb-2">Meta: {goals.calories}</div>
            <div className="text-xs bg-white/20 rounded-full px-2 py-1 inline-block">
              {Math.round((totals.calories / goals.calories) * 100)}% del objetivo
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Proteína</span>
            </div>
            <div className="text-3xl font-bold mb-1">{totals.protein}g</div>
            <div className="text-sm opacity-90 mb-2">Meta: {goals.protein}g</div>
            <div className="text-xs bg-white/20 rounded-full px-2 py-1 inline-block">
              {Math.round((totals.protein / goals.protein) * 100)}% del objetivo
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Carbohidratos</span>
            </div>
            <div className="text-3xl font-bold mb-1">{totals.carbs}g</div>
            <div className="text-sm opacity-90 mb-2">Meta: {goals.carbs}g</div>
            <div className="text-xs bg-white/20 rounded-full px-2 py-1 inline-block">
              {Math.round((totals.carbs / goals.carbs) * 100)}% del objetivo
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Grasas</span>
            </div>
            <div className="text-3xl font-bold mb-1">{totals.fat}g</div>
            <div className="text-sm opacity-90 mb-2">Meta: {goals.fat}g</div>
            <div className="text-xs bg-white/20 rounded-full px-2 py-1 inline-block">
              {Math.round((totals.fat / goals.fat) * 100)}% del objetivo
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Fibra</span>
            </div>
            <div className="text-3xl font-bold mb-1">{totals.fiber}g</div>
            <div className="text-sm opacity-90 mb-2">Meta: {goals.fiber}g</div>
            <div className="text-xs bg-white/20 rounded-full px-2 py-1 inline-block">
              {Math.round((totals.fiber / goals.fiber) * 100)}% del objetivo
            </div>
          </div>
        </div>

        {/* Barras de progreso detalladas mejoradas */}
        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Progreso Detallado</h3>
              <p className="text-slate-600">Visualiza tu progreso nutricional</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-semibold text-slate-700">Calorías</span>
                <span className={`font-bold ${getProgressColor(totals.calories, goals.calories)}`}>
                  {totals.calories} / {goals.calories}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${getProgressBarColor(totals.calories, goals.calories)} shadow-sm`}
                  style={{ width: `${Math.min((totals.calories / goals.calories) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-semibold text-slate-700">Proteína</span>
                <span className={`font-bold ${getProgressColor(totals.protein, goals.protein)}`}>
                  {totals.protein}g / {goals.protein}g
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${getProgressBarColor(totals.protein, goals.protein)} shadow-sm`}
                  style={{ width: `${Math.min((totals.protein / goals.protein) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-semibold text-slate-700">Carbohidratos</span>
                <span className={`font-bold ${getProgressColor(totals.carbs, goals.carbs)}`}>
                  {totals.carbs}g / {goals.carbs}g
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${getProgressBarColor(totals.carbs, goals.carbs)} shadow-sm`}
                  style={{ width: `${Math.min((totals.carbs / goals.carbs) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-semibold text-slate-700">Grasas</span>
                <span className={`font-bold ${getProgressColor(totals.fat, goals.fat)}`}>
                  {totals.fat}g / {goals.fat}g
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${getProgressBarColor(totals.fat, goals.fat)} shadow-sm`}
                  style={{ width: `${Math.min((totals.fat / goals.fat) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Selector de fecha mejorado */}
        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Entradas del Día</h3>
              <p className="text-slate-600">Gestiona tus comidas diarias</p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Historial
              </button>
            </div>
          </div>

          {/* Lista de entradas mejorada */}
          <div className="space-y-4">
            {todayEntries.length === 0 ? (
              <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Apple className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No hay entradas para este día</h3>
                <p className="text-slate-600">Agrega tu primera comida del día</p>
              </div>
            ) : (
              todayEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full">
                        {entry.meal}
                      </span>
                      <h4 className="font-bold text-slate-800 text-lg">{entry.name}</h4>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm text-slate-600 mb-3">
                      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 text-center">
                        <div className="font-bold text-slate-800">{entry.calories}</div>
                        <div className="text-xs">cal</div>
                      </div>
                      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 text-center">
                        <div className="font-bold text-slate-800">{entry.protein}g</div>
                        <div className="text-xs">proteína</div>
                      </div>
                      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 text-center">
                        <div className="font-bold text-slate-800">{entry.carbs}g</div>
                        <div className="text-xs">carbos</div>
                      </div>
                      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 text-center">
                        <div className="font-bold text-slate-800">{entry.fat}g</div>
                        <div className="text-xs">grasas</div>
                      </div>
                      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 text-center">
                        <div className="font-bold text-slate-800">{entry.fiber}g</div>
                        <div className="text-xs">fibra</div>
                      </div>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-slate-500 bg-white/40 backdrop-blur-sm p-3 rounded-xl">{entry.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEditEntry(entry)}
                      className="p-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Componente de seguimiento nutricional mejorado */}
        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Agregar Nueva Entrada</h3>
              <p className="text-slate-600">Registra tu consumo nutricional</p>
            </div>
          </div>
          <NutritionTracker onAddEntry={handleAddEntry} />
        </div>
      </div>
    </div>
  );
};

export default NutritionPage; 