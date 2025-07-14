import React, { useState } from 'react';
import { WeightRecord } from '../types';
import { mockWeightHistory } from '../data/mockData';
import { Weight, Plus, Camera, BarChart3, Calendar, TrendingUp, Save, Image, X } from 'lucide-react';

interface WeightTrackerProps {
  onSave?: (weightRecord: WeightRecord) => void;
}

const WeightTracker: React.FC<WeightTrackerProps> = ({ onSave }) => {
  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>(mockWeightHistory);
  const [showForm, setShowForm] = useState(false);
  const [newWeight, setNewWeight] = useState<Partial<WeightRecord>>({
    weight: 0,
    notes: ''
  });
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const weightRecord: WeightRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      weight: newWeight.weight!,
      photo: selectedPhoto || undefined,
      notes: newWeight.notes
    };

    setWeightHistory([weightRecord, ...weightHistory]);
    setShowForm(false);
    setNewWeight({ weight: 0, notes: '' });
    setSelectedPhoto(null);
    onSave?.(weightRecord);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Seguimiento de Peso</h2>
          <p className="text-slate-600">Registra tu peso y adjunta fotos para seguir tu progreso</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Nuevo Registro
        </button>
      </div>

      {/* Formulario de nuevo registro */}
      {showForm && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <Weight className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Nuevo Registro de Peso</h3>
              <p className="text-slate-600 text-sm">Registra tu peso actual y opcionalmente una foto</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                ⚖️ Peso (kg)
              </label>
              <input
                type="number"
                value={newWeight.weight || ''}
                onChange={(e) => setNewWeight({ ...newWeight, weight: Number(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                placeholder="70.5"
                step="0.1"
                min="30"
                max="200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                📝 Notas (opcional)
              </label>
              <input
                type="text"
                value={newWeight.notes || ''}
                onChange={(e) => setNewWeight({ ...newWeight, notes: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                placeholder="Ej: Después del entrenamiento"
              />
            </div>
          </div>

          {/* Foto opcional */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              📸 Foto (opcional)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 cursor-pointer">
                <Camera className="w-5 h-5" />
                Seleccionar Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {selectedPhoto && (
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                  Eliminar
                </button>
              )}
            </div>
            {selectedPhoto && (
              <div className="mt-4">
                <img
                  src={selectedPhoto}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl border-2 border-slate-200"
                />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={!newWeight.weight}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                newWeight.weight
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-5 h-5" />
              Guardar Registro
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setNewWeight({ weight: 0, notes: '' });
                setSelectedPhoto(null);
              }}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Historial de peso */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Historial de Peso</h3>
            <p className="text-slate-600 text-sm">Tus registros de peso</p>
          </div>
        </div>

        {weightHistory.length === 0 ? (
          <div className="text-center py-12">
            <Weight className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No hay registros de peso</p>
          </div>
        ) : (
          <div className="space-y-4">
            {weightHistory.map((record) => (
              <div
                key={record.id}
                className="bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-6 border border-white/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">
                        {record.weight}kg
                      </div>
                      <div className="text-sm text-slate-600">
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                    </div>
                    {record.photo && (
                      <div className="relative">
                        <img
                          src={record.photo}
                          alt="Progress photo"
                          className="w-20 h-20 object-cover rounded-xl border-2 border-white shadow-lg"
                        />
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                          📸
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(record.timestamp).toLocaleTimeString()}
                    </div>
                    {record.notes && (
                      <div className="text-slate-700 text-sm bg-white/60 rounded-lg p-2">
                        "{record.notes}"
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gráficos de progreso */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Gráficos de Progreso</h3>
            <p className="text-slate-600 text-sm">Visualiza tu progreso de peso en el tiempo</p>
          </div>
        </div>

        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">Los gráficos estarán disponibles próximamente</p>
          <div className="flex justify-center gap-4">
            <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm">
              Últimos 30 días
            </button>
            <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm">
              Últimos 90 días
            </button>
            <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm">
              Último año
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightTracker; 