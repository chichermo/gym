import React, { useState } from 'react';
import ModernCard from './ModernCard';
import ModernButton from './ModernButton';
import ModernInput from './ModernInput';

const ModernUIExample: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-hero text-gradient-primary">Componentes Modernos</h1>
        <p className="text-body text-gray-600 max-w-2xl mx-auto">
          Ejemplos de componentes con mejoras de diseño, tipografía, colores y UX
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModernCard 
          title="Card Básica" 
          subtitle="Diseño limpio y moderno"
          variant="default"
        >
          <p className="text-body">Contenido de ejemplo con tipografía mejorada y espaciado consistente.</p>
        </ModernCard>

        <ModernCard 
          title="Card con Gradiente" 
          subtitle="Efecto visual atractivo"
          variant="gradient"
        >
          <p className="text-body">Gradiente moderno con transiciones suaves.</p>
        </ModernCard>

        <ModernCard 
          title="Card Glass" 
          subtitle="Efecto glassmorphism"
          variant="glass"
        >
          <p className="text-body">Efecto de cristal con blur y transparencia.</p>
        </ModernCard>

        <ModernCard 
          title="Card de Éxito" 
          subtitle="Estado positivo"
          variant="success"
        >
          <p className="text-body">Colores de éxito para feedback positivo.</p>
        </ModernCard>

        <ModernCard 
          title="Card de Advertencia" 
          subtitle="Estado de atención"
          variant="warning"
        >
          <p className="text-body">Colores de advertencia para alertas.</p>
        </ModernCard>

        <ModernCard 
          title="Card de Error" 
          subtitle="Estado de error"
          variant="danger"
        >
          <p className="text-body">Colores de error para problemas.</p>
        </ModernCard>
      </div>

      {/* Botones */}
      <div className="space-y-6">
        <h2 className="text-display font-semibold">Botones Modernos</h2>
        <div className="flex flex-wrap gap-4">
          <ModernButton variant="primary" size="md">
            Botón Primario
          </ModernButton>
          
          <ModernButton variant="secondary" size="md">
            Botón Secundario
          </ModernButton>
          
          <ModernButton variant="success" size="md">
            Éxito
          </ModernButton>
          
          <ModernButton variant="warning" size="md">
            Advertencia
          </ModernButton>
          
          <ModernButton variant="danger" size="md">
            Error
          </ModernButton>
          
          <ModernButton variant="ghost" size="md">
            Fantasma
          </ModernButton>
        </div>

        <div className="flex flex-wrap gap-4">
          <ModernButton 
            variant="primary" 
            size="md" 
            loading={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Cargando...' : 'Enviar'}
          </ModernButton>
          
          <ModernButton variant="primary" size="sm">
            Pequeño
          </ModernButton>
          
          <ModernButton variant="primary" size="lg">
            Grande
          </ModernButton>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-6">
        <h2 className="text-display font-semibold">Inputs Modernos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModernInput
            label="Nombre completo"
            placeholder="Ingresa tu nombre"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            helper="Este campo es obligatorio"
          />
          
          <ModernInput
            label="Email"
            type="email"
            placeholder="tu@email.com"
            required
            error="Email inválido"
          />
          
          <ModernInput
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            required
            helper="Mínimo 8 caracteres"
          />
          
          <ModernInput
            label="Teléfono"
            type="tel"
            placeholder="+1 (555) 123-4567"
            disabled
          />
        </div>
      </div>

      {/* Métricas */}
      <div className="space-y-6">
        <h2 className="text-display font-semibold">Métricas de Fitness</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="metric-card text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">1,247</div>
            <div className="text-sm text-gray-600">Calorías Quemadas</div>
            <div className="text-xs text-success-600 mt-1">+12% vs ayer</div>
          </div>
          
          <div className="metric-card text-center">
            <div className="text-4xl font-bold text-success-600 mb-2">45</div>
            <div className="text-sm text-gray-600">Minutos de Ejercicio</div>
            <div className="text-xs text-warning-600 mt-1">Meta: 60 min</div>
          </div>
          
          <div className="metric-card text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">8</div>
            <div className="text-sm text-gray-600">Entrenamientos</div>
            <div className="text-xs text-success-600 mt-1">Esta semana</div>
          </div>
        </div>
      </div>

      {/* Animaciones */}
      <div className="space-y-6">
        <h2 className="text-display font-semibold">Animaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="animate-fade-in-up">
            <ModernCard title="Animación Fade In Up" variant="default">
              <p>Este elemento aparece con animación suave desde abajo.</p>
            </ModernCard>
          </div>
          
          <div className="animate-scale-in">
            <ModernCard title="Animación Scale In" variant="gradient">
              <p>Este elemento aparece con efecto de escala.</p>
            </ModernCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernUIExample; 