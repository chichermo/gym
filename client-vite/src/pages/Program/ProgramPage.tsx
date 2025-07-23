import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Dumbbell, 
  Zap,
  Plus,
  Edit,
  Eye,
  Play,
  Target,
  Clock,
  Users,
  Award,
  FileText,
  Heart,
  Activity
} from 'lucide-react';

const ProgramPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('program');

  const sections = [
    {
      id: 'program',
      title: 'Mi Programa',
      description: 'Visualiza, crea y edita tu programación acorde a tu objetivo.',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'progress',
      title: 'Mi Progreso',
      description: 'Visualiza tu registro histórico de rutinas y ejercicios.',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'exercises',
      title: 'Ejercicios',
      description: 'Explora y filtra ejercicios según tu interés.',
      icon: Dumbbell,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'quick-workout',
      title: 'Vamos a entrenar',
      description: 'Crea una rutina rápida de ejercicios.',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-8 rounded-b-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Mi Programa</h1>
              <p className="text-xl opacity-90">Personaliza tu entrenamiento según tus objetivos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                  ${isActive 
                    ? `bg-gradient-to-r ${section.color} text-white shadow-lg` 
                    : `${section.bgColor} ${section.borderColor} text-gray-700 hover:shadow-md`
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${isActive 
                      ? 'bg-white bg-opacity-20' 
                      : `bg-gradient-to-r ${section.color} text-white`
                    }
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                    <p className={`text-sm ${isActive ? 'opacity-90' : 'opacity-70'}`}>
                      {section.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {activeSection === 'program' && <ProgramSection />}
          {activeSection === 'progress' && <ProgressSection />}
          {activeSection === 'exercises' && <ExercisesSection />}
          {activeSection === 'quick-workout' && <QuickWorkoutSection />}
        </div>
      </div>
    </div>
  );
};

// Sección Mi Programa
const ProgramSection: React.FC = () => {
  const [showHealthForms, setShowHealthForms] = useState(false);

  const healthForms = [
    {
      id: 'par-q',
      name: 'Formulario PAR-Q',
      description: 'Evaluación de preparación para actividad física',
      status: 'pending',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'habits',
      name: 'Formulario Hábitos de Vida',
      description: 'Evaluación de hábitos y estilo de vida',
      status: 'pending',
      icon: Users,
      color: 'green'
    },
    {
      id: 'heart-rate',
      name: 'Test Frecuencia Cardíaca',
      description: 'Evaluación de frecuencia cardíaca en reposo',
      status: 'pending',
      icon: Heart,
      color: 'red'
    },
    {
      id: 'one-rm',
      name: 'Test 1 RM',
      description: 'Evaluación de fuerza máxima',
      status: 'pending',
      icon: Activity,
      color: 'purple'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Mi Programa</h2>
        <p className="text-gray-600 mb-6">
          Vamos a crear tu rutina de musculación pero antes debemos contestar algunas preguntas:
        </p>
      </div>

      {/* Formularios de Salud */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Formularios de Salud
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthForms.map((form) => {
            const Icon = form.icon;
            return (
              <div key={form.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-10 h-10 bg-${form.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${form.color}-600`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{form.name}</h4>
                    <p className="text-sm text-gray-600">{form.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    form.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {form.status === 'completed' ? 'Completado' : 'Pendiente'}
                  </span>
                  
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    {form.status === 'completed' ? 'Ver' : 'Completar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Programa Actual */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          Programa Actual
        </h3>
        
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No hay programa creado</h4>
          <p className="text-gray-600 mb-4">
            Completa los formularios de salud para crear tu programa personalizado
          </p>
          <button 
            onClick={() => setShowHealthForms(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Comenzar Evaluación
          </button>
        </div>
      </div>
    </div>
  );
};

// Sección Mi Progreso
const ProgressSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Mi Progreso</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estadísticas */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Resumen Semanal</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm opacity-90">Entrenamientos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8.5h</div>
                <div className="text-sm opacity-90">Tiempo Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4200</div>
                <div className="text-sm opacity-90">Calorías</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">Entrenamiento de Fuerza</div>
                <div className="text-xs text-gray-500">Hace 2 horas</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">Cardio</div>
                <div className="text-xs text-gray-500">Hace 1 día</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sección Ejercicios
const ExercisesSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Ejercicios</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtros */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grupo Muscular
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>Todos</option>
                  <option>Pecho</option>
                  <option>Espalda</option>
                  <option>Piernas</option>
                  <option>Hombros</option>
                  <option>Brazos</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Ejercicio
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>Todos</option>
                  <option>Fuerza</option>
                  <option>Cardio</option>
                  <option>Flexibilidad</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dificultad
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>Todas</option>
                  <option>Principiante</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Ejercicios */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                <h4 className="font-semibold text-gray-900 mb-2">Ejercicio {i}</h4>
                <p className="text-sm text-gray-600 mb-3">Descripción del ejercicio</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Fuerza
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sección Vamos a Entrenar
const QuickWorkoutSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Vamos a entrenar</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Crear Rutina Rápida */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Crear Rutina Rápida</h3>
              <p className="opacity-90">Personaliza tu entrenamiento en minutos</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">1</span>
              </div>
              <span>Selecciona el tipo de entrenamiento</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">2</span>
              </div>
              <span>Elige los ejercicios</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">3</span>
              </div>
              <span>Configura series y repeticiones</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">4</span>
              </div>
              <span>¡Comienza a entrenar!</span>
            </div>
          </div>
          
          <button className="w-full bg-white text-orange-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            Crear Rutina Rápida
          </button>
        </div>

        {/* Rutinas Guardadas */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Rutinas Guardadas</h3>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Rutina de Fuerza</h4>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">8 ejercicios • 45 min</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                Última vez: hace 2 días
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Cardio HIIT</h4>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">6 ejercicios • 30 min</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                Última vez: hace 1 semana
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPage; 