import React, { useState } from 'react';
import { 
  Coffee, 
  Utensils, 
  Moon, 
  Activity,
  Heart,
  Brain,
  Users,
  Smartphone,
  BookOpen,
  Music,
  ArrowRight,
  ArrowLeft,
  FileText,
  CheckCircle
} from 'lucide-react';

interface HabitsFormProps {
  onComplete: (data: HabitsData) => void;
  onBack: () => void;
}

interface HabitsData {
  sleep: {
    hoursPerNight: number;
    quality: 'excellent' | 'good' | 'fair' | 'poor';
    hasSleepProblems: boolean;
  };
  nutrition: {
    mealsPerDay: number;
    waterIntake: number;
    hasDietaryRestrictions: boolean;
    eatsProcessedFood: boolean;
  };
  physicalActivity: {
    daysPerWeek: number;
    sessionDuration: number;
    activityType: string[];
    hasSedentaryJob: boolean;
  };
  stress: {
    stressLevel: 'low' | 'medium' | 'high';
    hasStressManagement: boolean;
    relaxationTechniques: string[];
  };
  social: {
    socialConnections: number;
    hasSupportNetwork: boolean;
    socialActivities: string[];
  };
  technology: {
    screenTimeHours: number;
    hasDigitalDetox: boolean;
    usesTechnologyForHealth: boolean;
  };
  learning: {
    readsRegularly: boolean;
    learningActivities: string[];
    hasGrowthMindset: boolean;
  };
  completed: boolean;
}

const HabitsForm: React.FC<HabitsFormProps> = ({ onComplete, onBack }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<HabitsData>({
    sleep: {
      hoursPerNight: 7,
      quality: 'good',
      hasSleepProblems: false
    },
    nutrition: {
      mealsPerDay: 3,
      waterIntake: 8,
      hasDietaryRestrictions: false,
      eatsProcessedFood: false
    },
    physicalActivity: {
      daysPerWeek: 3,
      sessionDuration: 30,
      activityType: [],
      hasSedentaryJob: false
    },
    stress: {
      stressLevel: 'medium',
      hasStressManagement: false,
      relaxationTechniques: []
    },
    social: {
      socialConnections: 5,
      hasSupportNetwork: false,
      socialActivities: []
    },
    technology: {
      screenTimeHours: 4,
      hasDigitalDetox: false,
      usesTechnologyForHealth: false
    },
    learning: {
      readsRegularly: false,
      learningActivities: [],
      hasGrowthMindset: false
    },
    completed: false
  });

  const sections = [
    {
      id: 'sleep',
      title: 'Hábitos de Sueño',
      description: 'Evaluación de la calidad y cantidad de sueño',
      icon: Moon,
      color: 'from-purple-500 to-purple-600',
      questions: [
        {
          id: 'hoursPerNight',
          question: '¿Cuántas horas duermes por noche en promedio?',
          type: 'range',
          min: 4,
          max: 12,
          step: 0.5,
          unit: 'horas'
        },
        {
          id: 'quality',
          question: '¿Cómo calificarías la calidad de tu sueño?',
          type: 'select',
          options: [
            { value: 'excellent', label: 'Excelente', description: 'Duermo profundamente y me despierto renovado' },
            { value: 'good', label: 'Buena', description: 'Duermo bien la mayoría de las noches' },
            { value: 'fair', label: 'Regular', description: 'A veces tengo problemas para dormir' },
            { value: 'poor', label: 'Mala', description: 'Frecuentemente tengo problemas de sueño' }
          ]
        },
        {
          id: 'hasSleepProblems',
          question: '¿Tienes problemas para dormir o mantener el sueño?',
          type: 'boolean'
        }
      ]
    },
    {
      id: 'nutrition',
      title: 'Hábitos Nutricionales',
      description: 'Evaluación de alimentación e hidratación',
      icon: Utensils,
      color: 'from-green-500 to-green-600',
      questions: [
        {
          id: 'mealsPerDay',
          question: '¿Cuántas comidas principales realizas al día?',
          type: 'range',
          min: 1,
          max: 6,
          step: 1,
          unit: 'comidas'
        },
        {
          id: 'waterIntake',
          question: '¿Cuántos vasos de agua bebes al día?',
          type: 'range',
          min: 1,
          max: 15,
          step: 1,
          unit: 'vasos'
        },
        {
          id: 'hasDietaryRestrictions',
          question: '¿Tienes alguna restricción dietética?',
          type: 'boolean'
        },
        {
          id: 'eatsProcessedFood',
          question: '¿Consumes alimentos procesados regularmente?',
          type: 'boolean'
        }
      ]
    },
    {
      id: 'physicalActivity',
      title: 'Actividad Física',
      description: 'Evaluación de hábitos de ejercicio',
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
      questions: [
        {
          id: 'daysPerWeek',
          question: '¿Cuántos días a la semana realizas actividad física?',
          type: 'range',
          min: 0,
          max: 7,
          step: 1,
          unit: 'días'
        },
        {
          id: 'sessionDuration',
          question: '¿Cuántos minutos dura tu sesión de ejercicio promedio?',
          type: 'range',
          min: 10,
          max: 120,
          step: 5,
          unit: 'minutos'
        },
        {
          id: 'activityType',
          question: '¿Qué tipos de actividad física realizas?',
          type: 'multiselect',
          options: [
            'Caminar', 'Correr', 'Ciclismo', 'Natación', 'Yoga', 'Pilates',
            'Entrenamiento de fuerza', 'Deportes de equipo', 'Baile', 'Otros'
          ]
        },
        {
          id: 'hasSedentaryJob',
          question: '¿Tu trabajo es principalmente sedentario?',
          type: 'boolean'
        }
      ]
    },
    {
      id: 'stress',
      title: 'Manejo del Estrés',
      description: 'Evaluación de niveles de estrés y técnicas de relajación',
      icon: Brain,
      color: 'from-red-500 to-red-600',
      questions: [
        {
          id: 'stressLevel',
          question: '¿Cómo calificarías tu nivel de estrés actual?',
          type: 'select',
          options: [
            { value: 'low', label: 'Bajo', description: 'Me siento tranquilo y relajado' },
            { value: 'medium', label: 'Moderado', description: 'Algo de estrés pero manejable' },
            { value: 'high', label: 'Alto', description: 'Me siento muy estresado' }
          ]
        },
        {
          id: 'hasStressManagement',
          question: '¿Practicas técnicas de manejo del estrés?',
          type: 'boolean'
        },
        {
          id: 'relaxationTechniques',
          question: '¿Qué técnicas de relajación utilizas?',
          type: 'multiselect',
          options: [
            'Meditación', 'Respiración profunda', 'Yoga', 'Ejercicio',
            'Música relajante', 'Lectura', 'Tiempo en naturaleza', 'Ninguna'
          ]
        }
      ]
    },
    {
      id: 'social',
      title: 'Conexiones Sociales',
      description: 'Evaluación de relaciones sociales y apoyo',
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      questions: [
        {
          id: 'socialConnections',
          question: '¿Con cuántas personas cercanas mantienes contacto regular?',
          type: 'range',
          min: 0,
          max: 20,
          step: 1,
          unit: 'personas'
        },
        {
          id: 'hasSupportNetwork',
          question: '¿Tienes una red de apoyo en momentos difíciles?',
          type: 'boolean'
        },
        {
          id: 'socialActivities',
          question: '¿Qué actividades sociales realizas?',
          type: 'multiselect',
          options: [
            'Reuniones con amigos', 'Actividades grupales', 'Voluntariado',
            'Clubes o grupos', 'Redes sociales', 'Eventos comunitarios', 'Ninguna'
          ]
        }
      ]
    },
    {
      id: 'technology',
      title: 'Uso de Tecnología',
      description: 'Evaluación del uso de dispositivos digitales',
      icon: Smartphone,
      color: 'from-indigo-500 to-indigo-600',
      questions: [
        {
          id: 'screenTimeHours',
          question: '¿Cuántas horas al día pasas frente a pantallas?',
          type: 'range',
          min: 0,
          max: 16,
          step: 0.5,
          unit: 'horas'
        },
        {
          id: 'hasDigitalDetox',
          question: '¿Practicas desintoxicación digital?',
          type: 'boolean'
        },
        {
          id: 'usesTechnologyForHealth',
          question: '¿Utilizas tecnología para mejorar tu salud?',
          type: 'boolean'
        }
      ]
    },
    {
      id: 'learning',
      title: 'Hábitos de Aprendizaje',
      description: 'Evaluación de actividades de crecimiento personal',
      icon: BookOpen,
      color: 'from-yellow-500 to-yellow-600',
      questions: [
        {
          id: 'readsRegularly',
          question: '¿Lees libros o artículos regularmente?',
          type: 'boolean'
        },
        {
          id: 'learningActivities',
          question: '¿Qué actividades de aprendizaje realizas?',
          type: 'multiselect',
          options: [
            'Lectura', 'Cursos online', 'Podcasts', 'Tutoriales',
            'Idiomas', 'Hobbies', 'Investigación', 'Ninguna'
          ]
        },
        {
          id: 'hasGrowthMindset',
          question: '¿Te consideras una persona que busca crecer y aprender?',
          type: 'boolean'
        }
      ]
    }
  ];

  const currentSectionData = sections[currentSection];
  const Icon = currentSectionData.icon;

  const handleAnswer = (questionId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [currentSectionData.id]: {
        ...prev[currentSectionData.id as keyof HabitsData],
        [questionId]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      // Formulario completado
      const completedData = {
        ...formData,
        completed: true
      };
      onComplete(completedData);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const renderQuestion = (question: any) => {
    const currentValue = formData[currentSectionData.id as keyof HabitsData][question.id as keyof any];

    switch (question.type) {
      case 'range':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{question.min} {question.unit}</span>
              <span className="text-lg font-semibold text-gray-900">{currentValue} {question.unit}</span>
              <span className="text-sm text-gray-600">{question.max} {question.unit}</span>
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              step={question.step}
              value={currentValue}
              onChange={(e) => handleAnswer(question.id, parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        );

      case 'select':
        return (
          <div className="space-y-3">
            {question.options.map((option: any) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-300 text-left
                  ${currentValue === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }
                `}
              >
                <div className="font-semibold">{option.label}</div>
                <div className="text-sm opacity-70">{option.description}</div>
              </button>
            ))}
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-3">
            {question.options.map((option: string) => (
              <button
                key={option}
                onClick={() => {
                  const currentArray = currentValue as string[];
                  const newArray = currentArray.includes(option)
                    ? currentArray.filter(item => item !== option)
                    : [...currentArray, option];
                  handleAnswer(question.id, newArray);
                }}
                className={`
                  w-full p-3 rounded-lg border-2 transition-all duration-300 text-left
                  ${(currentValue as string[]).includes(option)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {(currentValue as string[]).includes(option) && (
                    <CheckCircle className="w-5 h-5" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 'boolean':
        return (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(question.id, true)}
              className={`
                p-6 rounded-xl border-2 transition-all duration-300
                ${currentValue === true
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }
              `}
            >
              <div className="text-center">
                <div className="font-semibold text-lg">Sí</div>
                <div className="text-sm opacity-70">Tengo este hábito</div>
              </div>
            </button>
            <button
              onClick={() => handleAnswer(question.id, false)}
              className={`
                p-6 rounded-xl border-2 transition-all duration-300
                ${currentValue === false
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                }
              `}
            >
              <div className="text-center">
                <div className="font-semibold text-lg">No</div>
                <div className="text-sm opacity-70">No tengo este hábito</div>
              </div>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${currentSectionData.color} text-white p-6`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handlePrevious}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentSectionData.title}</h1>
                <p className="text-white text-opacity-90">{currentSectionData.description}</p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-4">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>Sección {currentSection + 1} de {sections.length}</span>
            <span>{Math.round(((currentSection + 1) / sections.length) * 100)}% completado</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Questions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
          <div className="space-y-8">
            {currentSectionData.questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-100 pb-8 last:border-b-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {index + 1}. {question.question}
                </h3>
                {renderQuestion(question)}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              {currentSection === sections.length - 1 ? 'Completar' : 'Siguiente'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitsForm; 