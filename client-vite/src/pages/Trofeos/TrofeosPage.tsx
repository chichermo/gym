import React, { useState } from 'react';
import { Trophy, Target, Zap, Star, Award, Crown, Calendar } from 'lucide-react';

interface Trofeo {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'levantamientos' | 'constancia' | 'peso-corporal' | 'por-definir';
  icono: string;
  alcanzado: boolean;
  fecha?: string;
  progreso?: number;
  color: string;
}

const trofeos: Trofeo[] = [
  // Levantamientos
  {
    id: '1',
    nombre: 'Primer 100kg',
    descripcion: 'Levanta 100kg en press de banca',
    tipo: 'levantamientos',
    icono: '🏋️',
    alcanzado: true,
    fecha: '2024-06-15',
    color: 'blue'
  },
  {
    id: '2',
    nombre: 'Squat Master',
    descripcion: 'Levanta 150kg en sentadilla',
    tipo: 'levantamientos',
    icono: '🏋️',
    alcanzado: false,
    progreso: 75,
    color: 'purple'
  },
  {
    id: '3',
    nombre: 'Deadlift King',
    descripcion: 'Levanta 200kg en peso muerto',
    tipo: 'levantamientos',
    icono: '🏋️',
    alcanzado: false,
    progreso: 45,
    color: 'red'
  },
  // Constancia
  {
    id: '4',
    nombre: '7 días seguidos',
    descripcion: 'Entrena 7 días consecutivos',
    tipo: 'constancia',
    icono: '🔥',
    alcanzado: true,
    fecha: '2024-06-20',
    color: 'orange'
  },
  {
    id: '5',
    nombre: '30 días de disciplina',
    descripcion: 'Entrena 30 días seguidos',
    tipo: 'constancia',
    icono: '🔥',
    alcanzado: false,
    progreso: 60,
    color: 'yellow'
  },
  {
    id: '6',
    nombre: '100 entrenamientos',
    descripcion: 'Completa 100 entrenamientos',
    tipo: 'constancia',
    icono: '🔥',
    alcanzado: false,
    progreso: 85,
    color: 'green'
  },
  // Peso corporal
  {
    id: '7',
    nombre: 'Pull-up Master',
    descripcion: 'Haz 20 pull-ups seguidos',
    tipo: 'peso-corporal',
    icono: '💪',
    alcanzado: true,
    fecha: '2024-06-10',
    color: 'green'
  },
  {
    id: '8',
    nombre: 'Plancha Pro',
    descripcion: 'Mantén plancha por 5 minutos',
    tipo: 'peso-corporal',
    icono: '💪',
    alcanzado: false,
    progreso: 80,
    color: 'blue'
  },
  {
    id: '9',
    nombre: 'Burpee Warrior',
    descripcion: 'Haz 100 burpees en 10 minutos',
    tipo: 'peso-corporal',
    icono: '💪',
    alcanzado: false,
    progreso: 30,
    color: 'red'
  },
  // Por definir
  {
    id: '10',
    nombre: 'Misterio #1',
    descripcion: 'Trofeo secreto por descubrir',
    tipo: 'por-definir',
    icono: '❓',
    alcanzado: false,
    color: 'gray'
  },
  {
    id: '11',
    nombre: 'Misterio #2',
    descripcion: 'Otro trofeo secreto',
    tipo: 'por-definir',
    icono: '❓',
    alcanzado: false,
    color: 'gray'
  }
];

const tipos = [
  { id: 'levantamientos', nombre: 'Levantamientos', icono: Trophy, color: 'blue' },
  { id: 'constancia', nombre: 'Constancia', icono: Target, color: 'orange' },
  { id: 'peso-corporal', nombre: 'Peso Corporal', icono: Zap, color: 'green' },
  { id: 'por-definir', nombre: 'Por Definir', icono: Star, color: 'gray' }
];

const TrofeosPage: React.FC = () => {
  const [tipoSeleccionado, setTipoSeleccionado] = useState('levantamientos');
  const trofeosFiltrados = trofeos.filter(t => t.tipo === tipoSeleccionado);
  const trofeosAlcanzados = trofeos.filter(t => t.alcanzado).length;
  const totalTrofeos = trofeos.length;

  const getTipoIcon = (tipo: string) => {
    const tipoObj = tipos.find(t => t.id === tipo);
    if (tipoObj) {
      const Icon = tipoObj.icono;
      return <Icon className="w-5 h-5" />;
    }
    return null;
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      red: 'from-red-500 to-red-600',
      orange: 'from-orange-500 to-orange-600',
      yellow: 'from-yellow-500 to-yellow-600',
      green: 'from-green-500 to-green-600',
      gray: 'from-gray-500 to-gray-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Trofeos</h1>
              <p className="text-yellow-100">Celebra tus logros y conquista nuevos desafíos</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Crown className="w-8 h-8 text-yellow-300" />
                <div>
                  <p className="text-sm text-yellow-100">Trofeos Ganados</p>
                  <p className="text-2xl font-bold">{trofeosAlcanzados}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-yellow-300" />
                <div>
                  <p className="text-sm text-yellow-100">Total Disponibles</p>
                  <p className="text-2xl font-bold">{totalTrofeos}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-yellow-300" />
                <div>
                  <p className="text-sm text-yellow-100">Progreso</p>
                  <p className="text-2xl font-bold">{Math.round((trofeosAlcanzados / totalTrofeos) * 100)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filtros */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Categorías</h2>
          <div className="flex flex-wrap gap-3">
            {tipos.map(tipo => (
              <button
                key={tipo.id}
                className={`chip transition-all duration-300 ${
                  tipoSeleccionado === tipo.id 
                    ? 'chip-active shadow-lg scale-105' 
                    : 'chip-primary hover:scale-105'
                }`}
                onClick={() => setTipoSeleccionado(tipo.id)}
              >
                <div className="flex items-center space-x-2">
                  {getTipoIcon(tipo.id)}
                  <span>{tipo.nombre}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de trofeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trofeosFiltrados.map(trofeo => (
            <div
              key={trofeo.id}
              className={`card card-hover ${
                trofeo.alcanzado 
                  ? 'ring-2 ring-green-200 shadow-green-100' 
                  : 'opacity-75'
              }`}
            >
              <div className="p-6 text-center">
                {/* Icono del trofeo */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  trofeo.alcanzado 
                    ? `bg-gradient-to-r ${getColorClasses(trofeo.color)} shadow-lg` 
                    : 'bg-gray-200'
                }`}>
                  <span className="text-2xl">{trofeo.icono}</span>
                </div>

                {/* Estado del trofeo */}
                {trofeo.alcanzado && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                      <Award className="w-3 h-3" />
                      <span>GANADO</span>
                    </div>
                  </div>
                )}

                {/* Contenido */}
                <h3 className={`text-lg font-bold mb-2 ${
                  trofeo.alcanzado ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {trofeo.nombre}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4">
                  {trofeo.descripcion}
                </p>

                {/* Progreso o fecha */}
                {trofeo.alcanzado ? (
                  <div className="text-sm text-green-600 font-medium">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Ganado el {trofeo.fecha}
                  </div>
                ) : trofeo.progreso ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progreso</span>
                      <span>{trofeo.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${getColorClasses(trofeo.color)}`}
                        style={{ width: `${trofeo.progreso}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    <Star className="w-4 h-4 inline mr-1" />
                    Por alcanzar
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {trofeosAlcanzados < totalTrofeos && (
          <div className="mt-12 text-center">
            <div className="card p-8 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Sigue entrenando!
              </h3>
              <p className="text-gray-600 mb-6">
                Tienes {totalTrofeos - trofeosAlcanzados} trofeos más por conquistar. 
                ¡Cada entrenamiento te acerca a nuevos logros!
              </p>
              <div className="flex justify-center space-x-4">
                <button className="btn-primary">
                  Ver Entrenamientos
                </button>
                <button className="btn-secondary">
                  Ver Progreso
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrofeosPage; 