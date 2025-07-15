import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2,
  Weight,
  Ruler,
  Camera,
  BarChart3,
  Download,
  Share2,
  Zap
} from 'lucide-react';

const ProgressPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('weight');
  const [showAddModal, setShowAddModal] = useState(false);

  // Datos simulados de progreso
  const progressData = {
    weight: [
      { date: '2024-01-01', value: 75.0 },
      { date: '2024-01-08', value: 74.8 },
      { date: '2024-01-15', value: 74.5 },
      { date: '2024-01-22', value: 74.2 },
      { date: '2024-01-29', value: 73.8 }
    ],
    measurements: {
      pectoral: 95,
      brazoRelajado: 32,
      brazoContraido: 35,
      cintura: 78,
      gluteo: 98,
      muslo: 58,
      pantorrilla: 38
    },
    photos: [
      { id: '1', date: '2024-01-01', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvdG8gRnJvbnQ8L3RleHQ+Cjwvc3ZnPgo=', type: 'front' },
      { id: '2', date: '2024-01-15', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvdG8gU2lkZTwvdGV4dD4KPC9zdmc+Cg==', type: 'side' },
      { id: '3', date: '2024-01-29', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZvdG8gQmFjazwvdGV4dD4KPC9zdmc+Cg==', type: 'back' }
    ]
  };

  const tabs = [
    { id: 'weight', label: 'Peso', icon: Weight },
    { id: 'measurements', label: 'Mediciones', icon: Ruler },
    { id: 'photos', label: 'Fotos', icon: Camera },
    { id: 'charts', label: 'Gráficos', icon: BarChart3 }
  ];

  const getWeightChange = (): string => {
    if (progressData.weight.length < 2) return '0';
    const first = progressData.weight[0].value;
    const last = progressData.weight[progressData.weight.length - 1].value;
    return (last - first).toFixed(1);
  };

  const getWeightChangeColor = () => {
    const change = parseFloat(getWeightChange());
    if (change < 0) return 'text-emerald-600';
    if (change > 0) return 'text-rose-600';
    return 'text-slate-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col lg:pl-64">
      
      {/* Banner Demo Mejorado */}
      <div className="w-full bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 border-b border-amber-300 py-3 px-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-700" />
          <span className="text-amber-800 text-sm font-semibold">Modo DEMO: Datos simulados de progreso</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header Mejorado */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Seguimiento de Progreso
              </h1>
              <p className="text-slate-600 mt-1">Registra y visualiza tu progreso físico</p>
            </div>
          </div>
        </div>

        {/* Resumen rápido mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Weight className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">Peso Actual</span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">
              {progressData.weight[progressData.weight.length - 1]?.value} kg
            </div>
            <div className={`text-sm font-medium ${getWeightChangeColor()}`}>
              {getWeightChange()} kg desde el inicio
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <Ruler className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">Mediciones</span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">7</div>
            <div className="text-sm text-slate-600">Perímetros registrados</div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">Fotos</span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">{progressData.photos.length}</div>
            <div className="text-sm text-slate-600">Fotos de progreso</div>
          </div>
        </div>

        {/* Tabs mejorados */}
        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 mb-8">
          <div className="border-b border-white/30">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center gap-3 py-6 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {/* Contenido de Peso mejorado */}
            {selectedTab === 'weight' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Registro de Peso</h3>
                    <p className="text-slate-600">Mantén un seguimiento detallado de tu peso</p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Agregar Peso
                  </button>
                </div>
                
                <div className="space-y-4">
                  {progressData.weight.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-slate-800">{new Date(entry.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-2xl font-bold text-slate-800">{entry.value} kg</span>
                        <div className="flex gap-2">
                          <button className="p-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contenido de Mediciones mejorado */}
            {selectedTab === 'measurements' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Mediciones Corporales</h3>
                    <p className="text-slate-600">Registra tus perímetros corporales</p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Agregar Mediciones
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <span className="font-semibold text-slate-800">Pectoral</span>
                      <span className="text-xl font-bold text-slate-800">{progressData.measurements.pectoral} cm</span>
                    </div>
                    <div className="flex justify-between items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <span className="font-semibold text-slate-800">Brazo Relajado</span>
                      <span className="text-xl font-bold text-slate-800">{progressData.measurements.brazoRelajado} cm</span>
                    </div>
                    <div className="flex justify-between items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <span className="font-semibold text-slate-800">Brazo Contraído</span>
                      <span className="text-xl font-bold text-slate-800">{progressData.measurements.brazoContraido} cm</span>
                    </div>
                    <div className="flex justify-between items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <span className="font-semibold text-slate-800">Cintura</span>
                      <span className="text-xl font-bold text-slate-800">{progressData.measurements.cintura} cm</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <span className="font-semibold text-slate-800">Glúteo</span>
                      <span className="text-xl font-bold text-slate-800">{progressData.measurements.gluteo} cm</span>
                    </div>
                    <div className="flex justify-between items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <span className="font-semibold text-slate-800">Muslo</span>
                      <span className="text-xl font-bold text-slate-800">{progressData.measurements.muslo} cm</span>
                    </div>
                    <div className="flex justify-between items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <span className="font-semibold text-slate-800">Pantorrilla</span>
                      <span className="text-xl font-bold text-slate-800">{progressData.measurements.pantorrilla} cm</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contenido de Fotos mejorado */}
            {selectedTab === 'photos' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Fotos de Progreso</h3>
                    <p className="text-slate-600">Documenta visualmente tu transformación</p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Agregar Fotos
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {progressData.photos.map((photo) => (
                    <div key={photo.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <img 
                        src={photo.url} 
                        alt={`Foto ${photo.type}`}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold capitalize text-slate-800">{photo.type}</p>
                          <p className="text-sm text-slate-500">{new Date(photo.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contenido de Gráficos mejorado */}
            {selectedTab === 'charts' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Gráficos de Progreso</h3>
                    <p className="text-slate-600">Visualiza tu progreso con gráficos interactivos</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white px-6 py-3 rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      <Download className="w-5 h-5" />
                      Exportar
                    </button>
                    <button className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      <Share2 className="w-5 h-5" />
                      Compartir
                    </button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/30">
                  <div className="p-4 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Gráficos en Desarrollo</h3>
                  <p className="text-slate-600 text-lg">Los gráficos interactivos estarán disponibles próximamente</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;
