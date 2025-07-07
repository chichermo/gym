import React, { useState } from 'react';
import { 
  Plus, 
  Apple, 
  Utensils, 
  Coffee, 
  Cookie,
  Trash2,
  Edit,
  BarChart3,
  Target,
  Flame
} from 'lucide-react';
import type { Nutrition } from '../types/nutrition';

interface NutritionTrackerProps {
  entries?: Nutrition[];
  onAddEntry?: (entry: Nutrition) => void;
  onEditEntry?: (entry: Nutrition) => void;
  onDeleteEntry?: (id: string) => void;
}

const NutritionTracker: React.FC<NutritionTrackerProps> = ({
  entries = [],
  onAddEntry,
  onEditEntry,
  onDeleteEntry
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Nutrition | null>(null);
  const [newEntry, setNewEntry] = useState({
    meal: 'breakfast' as const,
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    notes: ''
  });

  const today = new Date().toISOString().split('T')[0];
  const todayEntries = entries.filter(entry => entry.date === today);

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

  const getMealIcon = (meal: string) => {
    switch (meal) {
      case 'breakfast': return <Coffee className="w-4 h-4" />;
      case 'lunch': return <Utensils className="w-4 h-4" />;
      case 'dinner': return <Apple className="w-4 h-4" />;
      case 'snack': return <Cookie className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const getMealName = (meal: string) => {
    switch (meal) {
      case 'breakfast': return 'Desayuno';
      case 'lunch': return 'Almuerzo';
      case 'dinner': return 'Cena';
      case 'snack': return 'Snack';
      default: return meal;
    }
  };

  const handleAddEntry = () => {
    if (newEntry.name && newEntry.calories > 0) {
      const entry: Nutrition = {
        id: Date.now().toString(),
        date: today,
        ...newEntry
      };
      
      onAddEntry?.(entry);
      setShowAddModal(false);
      setNewEntry({
        meal: 'breakfast',
        name: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        notes: ''
      });
    }
  };

  const handleEditEntry = () => {
    if (selectedEntry && newEntry.name) {
      const updatedEntry: Nutrition = {
        ...selectedEntry,
        ...newEntry
      };
      
      onEditEntry?.(updatedEntry);
      setShowEditModal(false);
      setSelectedEntry(null);
      setNewEntry({
        meal: 'breakfast',
        name: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        notes: ''
      });
    }
  };

  const handleDeleteEntry = (id: string) => {
    onDeleteEntry?.(id);
  };

  const openEditModal = (entry: Nutrition) => {
    setSelectedEntry(entry);
    setNewEntry({
      meal: entry.meal,
      name: entry.name,
      calories: entry.calories,
      protein: entry.protein,
      carbs: entry.carbs,
      fat: entry.fat,
      fiber: entry.fiber,
      notes: entry.notes || ''
    });
    setShowEditModal(true);
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Apple className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Seguimiento Nutricional</h2>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Comida
        </button>
      </div>

      {/* Resumen del día */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5" />
            <span className="text-sm font-medium">Calorías</span>
          </div>
          <div className="text-2xl font-bold">{totals.calories}</div>
          <div className="text-xs opacity-90">Meta: {goals.calories}</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Proteína</span>
          </div>
          <div className="text-2xl font-bold">{totals.protein}g</div>
          <div className="text-xs opacity-90">Meta: {goals.protein}g</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium">Carbohidratos</span>
          </div>
          <div className="text-2xl font-bold">{totals.carbs}g</div>
          <div className="text-xs opacity-90">Meta: {goals.carbs}g</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Grasas</span>
          </div>
          <div className="text-2xl font-bold">{totals.fat}g</div>
          <div className="text-xs opacity-90">Meta: {goals.fat}g</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium">Fibra</span>
          </div>
          <div className="text-2xl font-bold">{totals.fiber}g</div>
          <div className="text-xs opacity-90">Meta: {goals.fiber}g</div>
        </div>
      </div>

      {/* Barras de progreso */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Calorías</span>
            <span className={getProgressColor(totals.calories, goals.calories)}>
              {Math.round((totals.calories / goals.calories) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totals.calories / goals.calories) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Proteína</span>
            <span className={getProgressColor(totals.protein, goals.protein)}>
              {Math.round((totals.protein / goals.protein) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totals.protein / goals.protein) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Carbohidratos</span>
            <span className={getProgressColor(totals.carbs, goals.carbs)}>
              {Math.round((totals.carbs / goals.carbs) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totals.carbs / goals.carbs) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Grasas</span>
            <span className={getProgressColor(totals.fat, goals.fat)}>
              {Math.round((totals.fat / goals.fat) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totals.fat / goals.fat) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Lista de comidas del día */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Comidas de Hoy</h3>
        
        {todayEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Apple className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No hay comidas registradas hoy</p>
            <p className="text-sm">¡Agrega tu primera comida!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayEntries.map(entry => (
              <div key={entry.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-white rounded-lg">
                    {getMealIcon(entry.meal)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{entry.name}</span>
                      <span className="text-xs text-gray-500">({getMealName(entry.meal)})</span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-600">
                      <span>{entry.calories} cal</span>
                      <span>P: {entry.protein}g</span>
                      <span>C: {entry.carbs}g</span>
                      <span>G: {entry.fat}g</span>
                    </div>
                    {entry.notes && (
                      <p className="text-xs text-gray-500 mt-1">{entry.notes}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(entry)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para agregar comida */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Agregar Comida</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comida
                </label>
                <input
                  type="text"
                  value={newEntry.name}
                  onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ej: Avena con proteína"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de comida
                </label>
                <select
                  value={newEntry.meal}
                  onChange={(e) => setNewEntry({ ...newEntry, meal: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="breakfast">Desayuno</option>
                  <option value="lunch">Almuerzo</option>
                  <option value="dinner">Cena</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calorías
                  </label>
                  <input
                    type="number"
                    value={newEntry.calories}
                    onChange={(e) => setNewEntry({ ...newEntry, calories: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proteína (g)
                  </label>
                  <input
                    type="number"
                    value={newEntry.protein}
                    onChange={(e) => setNewEntry({ ...newEntry, protein: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carbohidratos (g)
                  </label>
                  <input
                    type="number"
                    value={newEntry.carbs}
                    onChange={(e) => setNewEntry({ ...newEntry, carbs: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grasas (g)
                  </label>
                  <input
                    type="number"
                    value={newEntry.fat}
                    onChange={(e) => setNewEntry({ ...newEntry, fat: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fibra (g)
                </label>
                <input
                  type="number"
                  value={newEntry.fiber}
                  onChange={(e) => setNewEntry({ ...newEntry, fiber: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas (opcional)
                </label>
                <textarea
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Notas adicionales..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddEntry}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar comida */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Editar Comida</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comida
                </label>
                <input
                  type="text"
                  value={newEntry.name}
                  onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de comida
                </label>
                <select
                  value={newEntry.meal}
                  onChange={(e) => setNewEntry({ ...newEntry, meal: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="breakfast">Desayuno</option>
                  <option value="lunch">Almuerzo</option>
                  <option value="dinner">Cena</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calorías
                  </label>
                  <input
                    type="number"
                    value={newEntry.calories}
                    onChange={(e) => setNewEntry({ ...newEntry, calories: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proteína (g)
                  </label>
                  <input
                    type="number"
                    value={newEntry.protein}
                    onChange={(e) => setNewEntry({ ...newEntry, protein: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carbohidratos (g)
                  </label>
                  <input
                    type="number"
                    value={newEntry.carbs}
                    onChange={(e) => setNewEntry({ ...newEntry, carbs: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grasas (g)
                  </label>
                  <input
                    type="number"
                    value={newEntry.fat}
                    onChange={(e) => setNewEntry({ ...newEntry, fat: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fibra (g)
                </label>
                <input
                  type="number"
                  value={newEntry.fiber}
                  onChange={(e) => setNewEntry({ ...newEntry, fiber: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas
                </label>
                <textarea
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditEntry}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionTracker; 