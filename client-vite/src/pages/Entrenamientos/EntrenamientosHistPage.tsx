import React from 'react';
import ModernCard from '../../components/ModernUI/ModernCard';

const EntrenamientosHistPage: React.FC = () => {
  const workouts = React.useMemo(() => {
    return JSON.parse(localStorage.getItem('workouts_hist') || '[]');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white lg:pl-64">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-hero text-gradient-primary mb-4">📊 Tus Entrenamientos</h1>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Revisa tu historial de entrenamientos y sigue tu progreso.
          </p>
        </div>

        {workouts.length === 0 ? (
          <ModernCard
            title="No hay entrenamientos"
            subtitle="Aún no tienes rutinas guardadas"
            variant="default"
          >
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💪</div>
              <p className="text-gray-600 mb-4">
                Comienza creando tu primera rutina de entrenamiento.
              </p>
              <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Crear Entrenamiento
              </button>
            </div>
          </ModernCard>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {workouts.map((w: any, index: number) => (
              <ModernCard
                key={w.id}
                title={w.nombre}
                subtitle={new Date(w.fecha).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                variant="default"
                hover={true}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Ejercicios: {w.ejercicios.length}</span>
                    <span>{new Date(w.fecha).toLocaleTimeString()}</span>
                  </div>
                  
                  <div className="space-y-2">
                    {w.ejercicios.slice(0, 3).map((e: any) => (
                      <div key={e.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="font-medium text-sm">{e.nombre}</span>
                        <span className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                          {e.grupoMuscular}
                        </span>
                      </div>
                    ))}
                    
                    {w.ejercicios.length > 3 && (
                      <div className="text-center text-sm text-gray-500">
                        +{w.ejercicios.length - 3} ejercicios más
                      </div>
                    )}
                  </div>
                </div>
              </ModernCard>
            ))}
          </div>
        )}

        {/* Estadísticas */}
        {workouts.length > 0 && (
          <div className="mt-12">
            <ModernCard
              title="Resumen de Entrenamientos"
              subtitle="Estadísticas de tu actividad"
              variant="gradient"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {workouts.length}
                  </div>
                  <div className="text-white/80 text-sm">Total Entrenamientos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {workouts.reduce((acc: number, w: any) => acc + w.ejercicios.length, 0)}
                  </div>
                  <div className="text-white/80 text-sm">Ejercicios Realizados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {Math.round(workouts.length / 7 * 100)}%
                  </div>
                  <div className="text-white/80 text-sm">Frecuencia Semanal</div>
                </div>
              </div>
            </ModernCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntrenamientosHistPage; 