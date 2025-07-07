import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2,
  Weight,
  Ruler,
  Camera,
  BarChart3,
  Download,
  Share2
} from 'lucide-react';
import NavBar from '../../components/NavBar';

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

  const getWeightChange = () => {
    if (progressData.weight.length < 2) return 0;
    const first = progressData.weight[0].value;
    const last = progressData.weight[progressData.weight.length - 1].value;
    return (last - first).toFixed(1);
  };

  const getWeightChangeColor = () => {
    const change = parseFloat(getWeightChange());
    if (change < 0) return 'text-green-600';
    if (change > 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col">
      <NavBar />
      
      {/* Banner Demo */}
      <div className="w-full bg-gradient-to-r from-yellow-200 via-yellow-50 to-yellow-100 border-b border-yellow-300 py-2 px-4 flex items-center justify-center">
        <span className="text-yellow-800 text-sm font-medium">Modo DEMO: Datos simulados de progreso</span>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Seguimiento de Progreso</h1>
          </div>
          <p className="text-gray-600">Registra y visualiza tu progreso físico</p>
        </div>

        {/* Resumen rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Weight className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-gray-500">Peso Actual</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {progressData.weight[progressData.weight.length - 1]?.value} kg
            </div>
            <div className={`text-sm ${getWeightChangeColor()}`}>
              {getWeightChange()} kg desde el inicio
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Ruler className="w-6 h-6 text-green-600" />
              <span className="text-sm text-gray-500">Mediciones</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">7</div>
            <div className="text-sm text-gray-600">Perímetros registrados</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Camera className="w-6 h-6 text-purple-600" />
              <span className="text-sm text-gray-500">Fotos</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{progressData.photos.length}</div>
            <div className="text-sm text-gray-600">Fotos de progreso</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Contenido de Peso */}
            {selectedTab === 'weight' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Registro de Peso</h3>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Peso
                  </button>
                </div>
                
                <div className="space-y-4">
                  {progressData.weight.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">{new Date(entry.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold">{entry.value} kg</span>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contenido de Mediciones */}
            {selectedTab === 'measurements' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Mediciones Corporales</h3>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Mediciones
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Pectoral</span>
                      <span className="text-lg font-bold">{progressData.measurements.pectoral} cm</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Brazo Relajado</span>
                      <span className="text-lg font-bold">{progressData.measurements.brazoRelajado} cm</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Brazo Contraído</span>
                      <span className="text-lg font-bold">{progressData.measurements.brazoContraido} cm</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Cintura</span>
                      <span className="text-lg font-bold">{progressData.measurements.cintura} cm</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Glúteo</span>
                      <span className="text-lg font-bold">{progressData.measurements.gluteo} cm</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Muslo</span>
                      <span className="text-lg font-bold">{progressData.measurements.muslo} cm</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Pantorrilla</span>
                      <span className="text-lg font-bold">{progressData.measurements.pantorrilla} cm</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contenido de Fotos */}
            {selectedTab === 'photos' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Fotos de Progreso</h3>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Fotos
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {progressData.photos.map((photo) => (
                    <div key={photo.id} className="bg-gray-50 rounded-lg p-4">
                      <img 
                        src={photo.url} 
                        alt={`Foto ${photo.type}`}
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium capitalize">{photo.type}</p>
                          <p className="text-sm text-gray-500">{new Date(photo.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contenido de Gráficos */}
            {selectedTab === 'charts' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Gráficos de Progreso</h3>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                      <Download className="w-4 h-4" />
                      Exportar
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Share2 className="w-4 h-4" />
                      Compartir
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Gráficos en Desarrollo</h3>
                  <p className="text-gray-500">Los gráficos interactivos estarán disponibles próximamente</p>
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
