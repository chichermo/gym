import React, { useState } from 'react';
import { trofeos, TipoTrofeo } from '../../data/trofeos';
import ModernCard from '../../components/ModernUI/ModernCard';
import ModernButton from '../../components/ModernUI/ModernButton';

const tipos: { key: TipoTrofeo; label: string }[] = [
  { key: 'levantamientos', label: 'Levantamientos' },
  { key: 'constancia', label: 'Constancia' },
  { key: 'peso corporal', label: 'Peso corporal' },
  { key: 'por definir', label: 'Por definir' },
];

const TrofeosPage: React.FC = () => {
  const [tipo, setTipo] = useState<TipoTrofeo>('levantamientos');
  const trofeosFiltrados = trofeos.filter(t => t.tipo === tipo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white lg:pl-64">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-hero text-gradient-primary mb-4">🏆 Trofeos</h1>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Desbloquea logros y medallas por tus hazañas en el gimnasio. ¡Mantén la motivación!
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tipos.map(t => (
            <ModernButton
              key={t.key}
              variant={tipo === t.key ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTipo(t.key)}
            >
              {t.label}
            </ModernButton>
          ))}
        </div>

        {/* Grid de trofeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {trofeosFiltrados.map(t => (
            <ModernCard
              key={t.id}
              title={t.nombre}
              subtitle={t.descripcion}
              variant={t.unlocked ? 'success' : 'default'}
              hover={t.unlocked}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">
                  {t.unlocked ? '🏆' : '🔒'}
                </div>
                <div className={`text-sm font-medium ${
                  t.unlocked 
                    ? 'text-success-600 dark:text-success-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {t.unlocked ? '¡Desbloqueado!' : 'Pendiente'}
                </div>
              </div>
            </ModernCard>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="mt-12">
          <ModernCard
            title="Progreso de Trofeos"
            subtitle="Resumen de tus logros"
            variant="gradient"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {trofeos.filter(t => t.unlocked).length}
                </div>
                <div className="text-white/80 text-sm">Desbloqueados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {trofeos.length}
                </div>
                <div className="text-white/80 text-sm">Total</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {Math.round((trofeos.filter(t => t.unlocked).length / trofeos.length) * 100)}%
                </div>
                <div className="text-white/80 text-sm">Completado</div>
              </div>
            </div>
          </ModernCard>
        </div>
      </div>
    </div>
  );
};

export default TrofeosPage; 