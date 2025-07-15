import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  BarChart, 
  User, 
  LogOut, 
  Calendar, 
  Activity, 
  Info, 
  Flame, 
  Trophy, 
  Target,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Heart,
  ArrowRight,
  Plus,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';
import ModernCard from '../../components/ModernUI/ModernCard';
import ModernButton from '../../components/ModernUI/ModernButton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/profile', label: 'Perfil' },
  { to: '/workouts', label: 'Entrenamientos' },
  { to: '/progress', label: 'Progreso' },
];

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      icon: Dumbbell,
      value: '12',
      label: 'Entrenamientos este mes',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Flame,
      value: '4,200',
      label: 'Calorías quemadas',
      color: 'orange',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Trophy,
      value: '5',
      label: 'Logros desbloqueados',
      color: 'yellow',
      gradient: 'from-yellow-500 to-amber-500'
    },
    {
      icon: TrendingUp,
      value: '+2.5 kg',
      label: 'Progreso de peso',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const quickActions = [
    {
      icon: Plus,
      title: 'Nuevo entrenamiento',
      description: 'Crea una nueva rutina',
      href: '/workouts',
      color: 'blue'
    },
    {
      icon: BarChart,
      title: 'Registrar progreso',
      description: 'Actualiza tus métricas',
      href: '/progress',
      color: 'green'
    },
    {
      icon: Target,
      title: 'Plan de IA',
      description: 'Recomendaciones personalizadas',
      href: '/plan',
      color: 'purple'
    }
  ];

  const userInfo = [
    {
      icon: Activity,
      label: 'Nivel de fitness',
      value: user?.fitnessLevel?.replace('_', ' ') || 'Intermedio',
      color: 'blue'
    },
    {
      icon: Calendar,
      label: 'Último acceso',
      value: user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Hoy',
      color: 'green'
    },
    {
      icon: Heart,
      label: 'Altura',
      value: `${user?.height || 175} cm`,
      color: 'pink'
    },
    {
      icon: Target,
      label: 'Peso',
      value: `${user?.weight || 70} kg`,
      color: 'orange'
    }
  ];

  // Datos mock para gráficos
  const weeklyData = [
    { day: 'Lun', workouts: 3, calories: 1200, steps: 8500 },
    { day: 'Mar', workouts: 2, calories: 1100, steps: 9200 },
    { day: 'Mié', workouts: 4, calories: 1400, steps: 10500 },
    { day: 'Jue', workouts: 1, calories: 900, steps: 7800 },
    { day: 'Vie', workouts: 3, calories: 1300, steps: 9500 },
    { day: 'Sáb', workouts: 2, calories: 1000, steps: 8200 },
    { day: 'Dom', workouts: 0, calories: 800, steps: 6500 },
  ];

  const pieData = [
    { name: 'Cardio', value: 35, color: '#3b82f6' },
    { name: 'Fuerza', value: 45, color: '#10b981' },
    { name: 'Flexibilidad', value: 20, color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 lg:pl-64">
      {/* Banner Demo mejorado */}
      <motion.div 
        className="w-full bg-gradient-to-r from-yellow-100 via-amber-100 to-yellow-100 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 border-b border-yellow-200 dark:border-yellow-700/30 py-3 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
          <span className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
            Modo DEMO: Estás viendo datos simulados. ¡Explora libremente!
          </span>
        </div>
      </motion.div>

      <main className="container-custom section-padding">
        {/* Header usuario mejorado */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-6">
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User className="w-12 h-12 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gradient leading-tight mb-2">
                ¡Hola, {user?.firstName || user?.username}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Bienvenido a tu panel de control fitness</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Último entrenamiento: hace 2 días</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <Zap className="w-4 h-4" />
                  <span>Racha: 7 días</span>
                </div>
              </div>
            </div>
          </div>
          <motion.button
            onClick={logout}
            className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5" /> 
            Cerrar sesión
          </motion.button>
        </motion.div>

        {/* Estadísticas principales mejoradas */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="card card-hover p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${70 + Math.random() * 30}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Acciones rápidas mejoradas */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                className="card card-hover p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{action.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{action.description}</p>
                <Link 
                  to={action.href}
                  className={`inline-flex items-center gap-2 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium`}
                >
                  Ir a {action.title}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Información del usuario y accesos rápidos mejorados */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Información del usuario */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Información del usuario</h2>
            </div>
            <div className="space-y-4">
              {userInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-r from-${info.color}-500 to-${info.color}-600 rounded-lg flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{info.label}</span>
                    </div>
                    <span className="text-gray-900 dark:text-gray-100 font-semibold">{info.value}</span>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700/30">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-800 dark:text-blue-200">Objetivos de fitness</span>
              </div>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                {user?.fitnessGoals?.map((g: string) => g.replace('_', ' ')).join(', ') || 'Ganar masa muscular, Mejorar resistencia'}
              </p>
            </div>
          </div>

          {/* Accesos rápidos */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Accesos rápidos</h2>
            </div>
            <div className="space-y-4">
              <Link 
                to="/workouts"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <Dumbbell className="w-5 h-5" />
                  <span className="font-medium">Nuevo entrenamiento</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/progress"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <BarChart className="w-5 h-5" />
                  <span className="font-medium">Registrar progreso</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/plan"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5" />
                  <span className="font-medium">Ver plan de IA</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Progreso reciente */}
        <motion.div 
          className="card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Progreso reciente</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Objetivo semanal</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">+3.2 kg</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Masa muscular</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">-2.1 kg</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Grasa corporal</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs con botones modernos */}
        <div className="flex space-x-2 mb-6">
          <ModernButton
            variant={activeTab === 'overview' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('overview')}
          >
            Resumen
          </ModernButton>
          <ModernButton
            variant={activeTab === 'analytics' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('analytics')}
          >
            Análisis
          </ModernButton>
          <ModernButton
            variant={activeTab === 'goals' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('goals')}
          >
            Metas
          </ModernButton>
        </div>

        {/* Contenido de tabs */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ModernCard 
              title="Actividad Semanal" 
              subtitle="Entrenamientos y calorías"
              variant="default"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="workouts" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ModernCard>

            <ModernCard 
              title="Distribución de Entrenamientos" 
              subtitle="Por tipo de ejercicio"
              variant="default"
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ModernCard>
          </div>
        )}

        {activeTab === 'analytics' && (
          <ModernCard 
            title="Análisis Detallado" 
            subtitle="Métricas avanzadas"
            variant="glass"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">85%</div>
                  <div className="text-sm text-gray-600">Consistencia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-600">+15%</div>
                  <div className="text-sm text-gray-600">Mejora semanal</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning-600">92%</div>
                  <div className="text-sm text-gray-600">Meta alcanzada</div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="steps" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>
        )}

        {activeTab === 'goals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModernCard 
              title="Metas Mensuales" 
              subtitle="Progreso actual"
              variant="success"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Entrenamientos</span>
                    <span className="text-sm font-medium">15/20</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-success-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Calorías</span>
                    <span className="text-sm font-medium">8,450/10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '84.5%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Pasos</span>
                    <span className="text-sm font-medium">68,950/70,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-warning-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                  </div>
                </div>
              </div>
            </ModernCard>

            <ModernCard 
              title="Próximos Logros" 
              subtitle="Desbloquea nuevas insignias"
              variant="gradient"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    🏆
                  </div>
                  <div>
                    <div className="font-medium text-white">Entrenador Consistente</div>
                    <div className="text-sm text-white/80">20 entrenamientos este mes</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    🎯
                  </div>
                  <div>
                    <div className="font-medium text-white">Quemador de Calorías</div>
                    <div className="text-sm text-white/80">10,000 calorías esta semana</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    🚶
                  </div>
                  <div>
                    <div className="font-medium text-white">Caminante Pro</div>
                    <div className="text-sm text-white/80">70,000 pasos esta semana</div>
                  </div>
                </div>
              </div>
            </ModernCard>
          </div>
        )}
      </main>

      {/* Footer mejorado */}
      <motion.footer 
        className="w-full py-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-center border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="container-custom">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FitTrack · Hecho con <span className="text-pink-500">♥</span> por tu equipo
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default DashboardPage; 