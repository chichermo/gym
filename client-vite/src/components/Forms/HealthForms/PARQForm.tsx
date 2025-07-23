import React, { useState } from 'react';
import { 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  ArrowLeft,
  FileText
} from 'lucide-react';

interface PARQFormProps {
  onComplete: (data: PARQData) => void;
  onBack: () => void;
}

interface PARQData {
  hasHeartCondition: boolean;
  hasChestPain: boolean;
  hasDizziness: boolean;
  hasBoneProblem: boolean;
  hasBloodPressure: boolean;
  hasPhysicalLimitation: boolean;
  isClearedByDoctor: boolean;
  completed: boolean;
}

const PARQForm: React.FC<PARQFormProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<PARQData>({
    hasHeartCondition: false,
    hasChestPain: false,
    hasDizziness: false,
    hasBoneProblem: false,
    hasBloodPressure: false,
    hasPhysicalLimitation: false,
    isClearedByDoctor: false,
    completed: false
  });

  const questions = [
    {
      id: 'hasHeartCondition',
      question: '¿Su médico le ha dicho alguna vez que tiene un problema cardíaco?',
      description: 'Incluye problemas de corazón, enfermedad coronaria, arritmia, etc.'
    },
    {
      id: 'hasChestPain',
      question: '¿Siente dolor en el pecho cuando realiza actividad física?',
      description: 'Dolor, presión o molestia en el pecho durante el ejercicio'
    },
    {
      id: 'hasDizziness',
      question: '¿En el último mes, ha tenido dolor en el pecho cuando NO estaba realizando actividad física?',
      description: 'Dolor en reposo o durante actividades cotidianas'
    },
    {
      id: 'hasBoneProblem',
      question: '¿Se desmaya o pierde el equilibrio debido a mareos?',
      description: 'Incluye sensación de desmayo o pérdida de conciencia'
    },
    {
      id: 'hasBloodPressure',
      question: '¿Tiene un problema óseo o articular que podría agravarse con la actividad física?',
      description: 'Problemas en huesos, articulaciones, espalda, etc.'
    },
    {
      id: 'hasPhysicalLimitation',
      question: '¿Su médico le está recetando actualmente medicamentos para la presión arterial o un problema cardíaco?',
      description: 'Medicamentos para el corazón o presión arterial'
    },
    {
      id: 'isClearedByDoctor',
      question: '¿Sabe de alguna otra razón por la que no debería realizar actividad física?',
      description: 'Otras condiciones médicas o limitaciones'
    }
  ];

  const handleAnswer = (answer: boolean) => {
    const questionId = questions[currentQuestion].id as keyof PARQData;
    setFormData(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
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
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = formData[currentQuestionData.id as keyof PARQData] as boolean;

  const hasAnyYes = Object.values(formData).some(value => value === true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
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
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Formulario PAR-Q</h1>
                <p className="text-blue-100">Evaluación de preparación para actividad física</p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-4">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% completado</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentQuestionData.question}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {currentQuestionData.description}
            </p>
          </div>

          {/* Answer Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleAnswer(true)}
              className={`
                p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                ${currentAnswer === true
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center
                  ${currentAnswer === true ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  <XCircle className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Sí</div>
                  <div className="text-sm opacity-70">Tengo esta condición</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className={`
                p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                ${currentAnswer === false
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center
                  ${currentAnswer === false ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">No</div>
                  <div className="text-sm opacity-70">No tengo esta condición</div>
                </div>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={currentAnswer === undefined}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200
                ${currentAnswer !== undefined
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {currentQuestion === questions.length - 1 ? 'Completar' : 'Siguiente'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Warning */}
        {hasAnyYes && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Importante</h3>
            </div>
            <p className="text-yellow-700 text-sm">
              Si ha respondido "Sí" a alguna pregunta, es recomendable consultar con su médico antes de comenzar un programa de ejercicio físico.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PARQForm; 