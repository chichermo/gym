import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModernCard from '../../components/ModernUI/ModernCard';
import ModernButton from '../../components/ModernUI/ModernButton';

const EntrenamientoPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white lg:pl-64">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-hero text-gradient-primary mb-4">Entrenamiento</h1>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Gestiona tus entrenamientos, revisa tu historial y crea nuevas rutinas personalizadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <ModernCard 
            title="Tus Entrenamientos" 
            subtitle="Histórico de rutinas realizadas"
            variant="default"
            hover={true}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <ModernButton 
                variant="default" 
                onClick={() => navigate('/entrenamientos')}
                className="w-full"
              >
                Ver Historial
              </ModernButton>
            </div>
          </ModernCard>

          <ModernCard 
            title="Tus Registros" 
            subtitle="Histórico y gráficas por grupo muscular"
            variant="success"
            hover={true}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <ModernButton 
                variant="success" 
                onClick={() => navigate('/registros')}
                className="w-full"
              >
                Ver Registros
              </ModernButton>
            </div>
          </ModernCard>

          <ModernCard 
            title="Crea tu Workout" 
            subtitle="Arma tu rutina personalizada"
            variant="gradient"
            hover={true}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">💪</div>
              <ModernButton 
                variant="default" 
                onClick={() => navigate('/workouts')}
                className="w-full"
              >
                Crear Rutina
              </ModernButton>
            </div>
          </ModernCard>

          <ModernCard 
            title="Trofeos" 
            subtitle="Logros y medallas"
            variant="warning"
            hover={true}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <ModernButton 
                variant="warning" 
                onClick={() => navigate('/trofeos')}
                className="w-full"
              >
                Ver Trofeos
              </ModernButton>
            </div>
          </ModernCard>

          <ModernCard 
            title="Plan de Entrenamiento" 
            subtitle="Rutinas estructuradas"
            variant="primary"
            hover={true}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <ModernButton 
                variant="default" 
                onClick={() => navigate('/plan')}
                className="w-full"
              >
                Ver Plan
              </ModernButton>
            </div>
          </ModernCard>

          <ModernCard 
            title="Próximamente" 
            subtitle="Nuevas funcionalidades"
            variant="default"
            hover={false}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <div className="text-gray-500 text-sm">
                Más funcionalidades en desarrollo
              </div>
            </div>
          </ModernCard>
        </div>
      </div>
    </div>
  );
};

export default EntrenamientoPage; 