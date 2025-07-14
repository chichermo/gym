import React, { useState } from 'react';
import { Measurement } from '../types';
import { mockMeasurements } from '../data/mockData';
import { Ruler, Plus, BarChart3, Calendar, TrendingUp, Save, Camera } from 'lucide-react';

interface MeasurementTrackerProps {
  onSave?: (measurement: Measurement) => void;
}

const MeasurementTracker: React.FC<MeasurementTrackerProps> = ({ onSave }) => {
  const [measurements, setMeasurements] = useState<Measurement[]>(mockMeasurements);
  const [showForm, setShowForm] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState<Partial<Measurement>>({
    cintura: 0,
    gluteoMaximo: 0,
    muslo: 0,
    pantorrilla: 0,
    brazoRelajado: 0,
    brazoContraido: 0,
    pectoral: 0
  });

  const handleSave = () => {
    const total = Object.values(newMeasurement).reduce((sum, value) => sum + (value || 0), 0);
    const measurement: Measurement = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      ...newMeasurement,
      total
    } as Measurement;

    setMeasurements([measurement, ...measurements]);
    setShowForm(false);
    setNewMeasurement({
      cintura: 0,
      gluteoMaximo: 0,
      muslo: 0,
      pantorrilla: 0,
      brazoRelajado: 0,
      brazoContraido: 0,
      pectoral: 0
    });
    onSave?.(measurement);
  };

  const measurementFields = [
    { key: 'cintura', label: 'Cintura', icon: '📏' },
    { key: 'gluteoMaximo', label: 'Glúteo máximo', icon: '🍑' },
    { key: 'muslo', label: 'Muslo', icon: '🦵' },
    { key: 'pantorrilla', label: 'Pantorrilla', icon: '🦵' },
    { key: 'brazoRelajado', label: 'Brazo relajado', icon: '💪' },
    { key: 'brazoContraido', label: 'Brazo contraído', icon: '💪' },
    { key: 'pectoral', label: 'Pectoral', icon: '🏋️' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Medición de Perímetros</h2>
          <p className="text-slate-600">Registra tus mediciones corporales para seguir tu progreso</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Nueva Medición
        </button>
      </div>

      {/* Formulario de nueva medición */}
      {showForm && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <Ruler className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Nueva Medición</h3>
              <p className="text-slate-600 text-sm">Completa todos los campos en milímetros</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {measurementFields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  {field.icon} {field.label} (mm)
                </label>
                <input
                  type="number"
                  value={newMeasurement[field.key as keyof Measurement] || ''}
                  onChange={(e) => setNewMeasurement({
                    ...newMeasurement,
                    [field.key]: Number(e.target.value)
                  })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="0"
                  min="0"
                  max="200"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              <Save className="w-5 h-5" />
              Guardar Medición
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Historial de mediciones */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Historial de Mediciones</h3>
            <p className="text-slate-600 text-sm">Tus mediciones registradas</p>
          </div>
        </div>

        {measurements.length === 0 ? (
          <div className="text-center py-12">
            <Ruler className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No hay mediciones registradas</p>
          </div>
        ) : (
          <div className="space-y-4">
            {measurements.map((measurement) => (
              <div
                key={measurement.id}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-white/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-slate-800">
                      {new Date(measurement.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-emerald-600">
                      Total: {measurement.total}mm
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📏</div>
                    <div className="text-sm text-slate-600">Cintura</div>
                    <div className="font-bold text-slate-800">{measurement.cintura}mm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🍑</div>
                    <div className="text-sm text-slate-600">Glúteo</div>
                    <div className="font-bold text-slate-800">{measurement.gluteoMaximo}mm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🦵</div>
                    <div className="text-sm text-slate-600">Muslo</div>
                    <div className="font-bold text-slate-800">{measurement.muslo}mm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🦵</div>
                    <div className="text-sm text-slate-600">Pantorrilla</div>
                    <div className="font-bold text-slate-800">{measurement.pantorrilla}mm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">💪</div>
                    <div className="text-sm text-slate-600">Brazo Rel.</div>
                    <div className="font-bold text-slate-800">{measurement.brazoRelajado}mm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">💪</div>
                    <div className="text-sm text-slate-600">Brazo Cont.</div>
                    <div className="font-bold text-slate-800">{measurement.brazoContraido}mm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🏋️</div>
                    <div className="text-sm text-slate-600">Pectoral</div>
                    <div className="font-bold text-slate-800">{measurement.pectoral}mm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-sm text-slate-600">Total</div>
                    <div className="font-bold text-emerald-600">{measurement.total}mm</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gráficos (placeholder) */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Gráficos de Progreso</h3>
            <p className="text-slate-600 text-sm">Visualiza tu progreso en el tiempo</p>
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

export default MeasurementTracker; 