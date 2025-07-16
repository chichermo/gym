import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Activity, Heart, Target, Calendar, TrendingUp, 
  Zap, Clock, Star, Trophy, Users, MapPin, 
  BarChart3, PieChart, LineChart, Target as TargetIcon, Plus
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Widget {
  id: string;
  title: string;
  type: 'stats' | 'chart' | 'progress' | 'activity' | 'map';
  data: any;
  position: { x: number; y: number; w: number; h: number };
}

interface ImmersiveDashboardProps {
  userData: {
    stats: {
      workouts: number;
      calories: number;
      steps: number;
      heartRate: number;
    };
    goals: {
      weekly: number;
      monthly: number;
      progress: number;
    };
    activities: Array<{
      id: string;
      type: string;
      duration: number;
      calories: number;
      date: string;
    }>;
  };
}

const ImmersiveDashboard: React.FC<ImmersiveDashboardProps> = ({ userData }) => {
  const { theme } = useTheme();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  useEffect(() => {
    // Inicializar widgets
    const initialWidgets: Widget[] = [
      {
        id: 'stats-overview',
        title: 'Resumen de Estadísticas',
        type: 'stats',
        data: userData.stats,
        position: { x: 0, y: 0, w: 4, h: 2 }
      },
      {
        id: 'progress-chart',
        title: 'Progreso Semanal',
        type: 'chart',
        data: userData.activities,
        position: { x: 4, y: 0, w: 4, h: 3 }
      },
      {
        id: 'goals-tracker',
        title: 'Metas y Objetivos',
        type: 'progress',
        data: userData.goals,
        position: { x: 0, y: 2, w: 3, h: 2 }
      },
      {
        id: 'activity-feed',
        title: 'Actividad Reciente',
        type: 'activity',
        data: userData.activities.slice(0, 5),
        position: { x: 3, y: 2, w: 5, h: 3 }
      }
    ];
    setWidgets(initialWidgets);
  }, [userData]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'stats':
        return <StatsWidget data={widget.data} />;
      case 'chart':
        return <ChartWidget data={widget.data} />;
      case 'progress':
        return <ProgressWidget data={widget.data} />;
      case 'activity':
        return <ActivityWidget data={widget.data} />;
      default:
        return <div>Widget no soportado</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div 
        className="max-w-7xl mx-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header inmersivo */}
        <motion.div
          style={{ rotateX, rotateY }}
          className="mb-8 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Dashboard Inmersivo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Tu centro de control de fitness personalizado
          </motion.p>
        </motion.div>

        {/* Grid de widgets */}
        <div className="grid grid-cols-12 gap-6 auto-rows-min">
          {widgets.map((widget) => (
            <motion.div
              key={widget.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              whileTap={{ scale: 0.98 }}
              className={`col-span-${widget.position.w} row-span-${widget.position.h} bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden cursor-pointer transition-all duration-300 ${
                activeWidget === widget.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
              onClick={() => setActiveWidget(widget.id)}
            >
              {/* Header del widget */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {widget.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
                    >
                      <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Contenido del widget */}
              <div className="p-4">
                {renderWidget(widget)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Panel de controles flotante */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-4"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg"
            >
              <Target className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl shadow-lg"
            >
              <Trophy className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Widget de estadísticas
const StatsWidget: React.FC<{ data: any }> = ({ data }) => {
  const stats = [
    { label: 'Entrenamientos', value: data.workouts, icon: Activity, color: 'blue' },
    { label: 'Calorías', value: data.calories, icon: Zap, color: 'green' },
    { label: 'Pasos', value: data.steps.toLocaleString(), icon: TrendingUp, color: 'purple' },
    { label: 'Frecuencia Cardíaca', value: `${data.heartRate} BPM`, icon: Heart, color: 'red' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl"
          >
            <div className={`w-12 h-12 mx-auto mb-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-xl flex items-center justify-center`}>
              <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Widget de gráfico
const ChartWidget: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="text-center">
        <LineChart className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Gráfico de Actividad
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          {data.length} actividades registradas
        </p>
      </div>
    </div>
  );
};

// Widget de progreso
const ProgressWidget: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Progreso General
        </h4>
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {data.progress}%
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Meta Semanal</span>
            <span>{data.weekly}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(data.weekly / 100) * 100}%` }}
              className="bg-blue-500 h-2 rounded-full"
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Meta Mensual</span>
            <span>{data.monthly}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(data.monthly / 100) * 100}%` }}
              className="bg-green-500 h-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Widget de actividad
const ActivityWidget: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="space-y-3">
      {data.map((activity: any, index: number) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-800 dark:text-white">
              {activity.type}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {activity.duration} min • {activity.calories} cal
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(activity.date).toLocaleDateString()}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ImmersiveDashboard; 