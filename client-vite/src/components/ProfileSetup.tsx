import React, { useState } from 'react';
import { ExperienceLevel, BodyType, PhysicalInfo, Measurement, BodyComposition, WeightRecord } from '../types';
import { experienceLevels, bodyTypes } from '../data/mockData';
import { User, Camera, Save, ArrowRight, Info, Ruler, Weight, Activity, Target } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: (data: {
    experienceLevel: ExperienceLevel;
    bodyType: BodyType;
    physicalInfo: PhysicalInfo;
  }) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null);
  const [bodyType, setBodyType] = useState<BodyType | null>(null);
  const [physicalInfo, setPhysicalInfo] = useState<Partial<PhysicalInfo>>({
    weight: 0,
    height: 0,
    age: 0
  });

  const handleNext = () => {
    if (step === 1 && experienceLevel) {
      setStep(2);
    } else if (step === 2 && bodyType) {
      setStep(3);
    } else if (step === 3 && physicalInfo.weight && physicalInfo.height && physicalInfo.age) {
      onComplete({
        experienceLevel: experienceLevel!,
        bodyType: bodyType!,
        physicalInfo: {
          ...physicalInfo,
          bodyType: bodyType!
        } as PhysicalInfo
      });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return experienceLevel !== null;
      case 2:
        return bodyType !== null;
      case 3:
        return physicalInfo.weight && physicalInfo.height && physicalInfo.age;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center ${
                  stepNumber < step ? 'text-blue-600' : stepNumber === step ? 'text-blue-800' : 'text-slate-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    stepNumber < step
                      ? 'bg-blue-600 text-white'
                      : stepNumber === step
                      ? 'bg-blue-800 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {stepNumber < step ? '✓' : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      stepNumber < step ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Nivel de experiencia */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">¿Cuánto tiempo llevas entrenando?</h2>
              <p className="text-slate-600">Selecciona la opción que mejor describa tu experiencia</p>
            </div>

            <div className="grid gap-4">
              {experienceLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setExperienceLevel(level.value)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    experienceLevel === level.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 mb-1">{level.label}</h3>
                      <p className="text-slate-600 text-sm">{level.description}</p>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{level.value}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Tipo de cuerpo */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">¿Cuál de estos cuerpos se identifica más con el tuyo?</h2>
              <p className="text-slate-600">Selecciona el tipo de cuerpo que mejor te describa</p>
            </div>

            <div className="grid gap-6">
              {bodyTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setBodyType(type.value)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    bodyType === type.value
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200">
                      <img
                        src={type.image}
                        alt={type.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 mb-1">{type.label}</h3>
                      <p className="text-slate-600 text-sm">{type.description}</p>
                    </div>
                    <div className="text-2xl">🎯</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Información física */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Ruler className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Información Física</h2>
              <p className="text-slate-600">Completa tus datos básicos para personalizar tu experiencia</p>
            </div>

            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Peso (kg)</label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    value={physicalInfo.weight || ''}
                    onChange={(e) => setPhysicalInfo({ ...physicalInfo, weight: Number(e.target.value) })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    placeholder="70"
                    min="30"
                    max="200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Altura (cm)</label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    value={physicalInfo.height || ''}
                    onChange={(e) => setPhysicalInfo({ ...physicalInfo, height: Number(e.target.value) })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    placeholder="170"
                    min="100"
                    max="250"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Edad</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    value={physicalInfo.age || ''}
                    onChange={(e) => setPhysicalInfo({ ...physicalInfo, age: Number(e.target.value) })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    placeholder="25"
                    min="13"
                    max="100"
                  />
                </div>
              </div>

              {bodyType && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold text-slate-800">Tipo de cuerpo seleccionado</h4>
                      <p className="text-slate-600 text-sm">{bodyType}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300"
            >
              Atrás
            </button>
          )}
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`ml-auto px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              canProceed()
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {step === 3 ? (
              <div className="flex items-center gap-2">
                <span>Completar</span>
                <Save className="w-5 h-5" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Siguiente</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup; 