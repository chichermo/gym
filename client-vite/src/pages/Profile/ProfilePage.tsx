import React, { useState } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Palette,
  Download,
  Upload,
  Edit,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Target,
  Trophy,
  Star,
  Heart,
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  LineChart,
  PieChart
} from 'lucide-react';
import { ModernCard, ModernButton, ModernBadge } from '../../components/ModernUI';

const ProfilePage: React.FC = () => {
  const { 
    profile, 
    updateExperienceLevel, 
    updateBodyType, 
    addPerimeter, 
    addWeightRecord,
    updateBodyComposition,
    getExperienceLevelName,
    getBodyTypes,
    getWeightHistory
  } = useProfile();

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  // Datos mock para las estadísticas
  const mockStats = {
    workouts: 45,
    completedGoals: 12,
    achievements: 8,
    points: 1250,
    totalHours: 180,
    caloriesBurned: 45000,
    activeDays: 28
  };

  // Datos mock para el perfil
  const mockProfileData = {
    name: 'Usuario Fitness',
    email: 'usuario@fitness.com',
    phone: '+34 123 456 789',
    location: 'Madrid, España',
    bio: 'Apasionado del fitness y la vida saludable',
    website: 'https://miperfil.com',
    joinDate: new Date('2023-01-15')
  };

  // Datos mock para actividad
  const mockActivityHistory = [
    {
      id: '1',
      title: 'Entrenamiento de Fuerza',
      description: 'Completaste un entrenamiento de 45 minutos',
      type: 'workout',
      date: '2024-01-15',
      points: 50,
      duration: '45 min'
    },
    {
      id: '2',
      title: 'Meta Alcanzada',
      description: 'Lograste tu meta semanal de entrenamientos',
      type: 'goal',
      date: '2024-01-14',
      points: 100,
      duration: '7 días'
    },
    {
      id: '3',
      title: 'Nuevo Logro',
      description: 'Desbloqueaste el trofeo "Consistencia"',
      type: 'achievement',
      date: '2024-01-13',
      points: 75,
      duration: '30 días'
    }
  ];

  // Datos mock para logros
  const mockAchievements = [
    {
      id: '1',
      name: 'Primer Entrenamiento',
      description: 'Completaste tu primer entrenamiento',
      level: 'bronze',
      points: 25,
      date: '2024-01-10'
    },
    {
      id: '2',
      name: 'Consistencia Semanal',
      description: 'Entrenaste 5 días en una semana',
      level: 'silver',
      points: 50,
      date: '2024-01-08'
    },
    {
      id: '3',
      name: 'Meta Mensual',
      description: 'Alcanzaste tu meta de peso',
      level: 'gold',
      points: 100,
      date: '2024-01-05'
    }
  ];

  // Datos mock para preferencias
  const mockPreferences = {
    notifications: {
      'Recordatorios de entrenamiento': true,
      'Logros desbloqueados': true,
      'Metas alcanzadas': false,
      'Consejos semanales': true
    },
    privacy: {
      'Perfil público': false,
      'Mostrar progreso': true,
      'Compartir logros': false,
      'Permitir mensajes': true
    },
    theme: 'dark',
    language: 'es'
  };

  const handleSave = () => {
    // Aquí se guardarían los cambios del perfil
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'workout': return Activity;
      case 'goal': return Target;
      case 'achievement': return Trophy;
      case 'progress': return TrendingUp;
      default: return Star;
    }
  };

  const getAchievementColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'from-yellow-600 to-orange-600';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const updatePreferences = (category: string, key: string, value: any) => {
    // Aquí se actualizarían las preferencias
    console.log('Actualizando preferencia:', category, key, value);
  };

  return (
    <div className="space-y-8">
      {/* Header y acciones */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{mockProfileData.name}</h1>
              <p className="text-gray-300">{mockProfileData.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <ModernBadge variant="success" size="sm" icon={CheckCircle}>
                  Miembro desde {mockProfileData.joinDate.getFullYear()}
                </ModernBadge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <ModernButton icon={Save} onClick={handleSave}>
                  Guardar
                </ModernButton>
                <ModernButton icon={Edit} variant="secondary" onClick={handleCancel}>
                  Cancelar
                </ModernButton>
              </>
            ) : (
              <>
                <ModernButton icon={Edit} onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </ModernButton>
                <ModernButton icon={Download} variant="secondary" onClick={() => console.log('Exportar')}>
                  Exportar
                </ModernButton>
                <ModernButton icon={Upload} variant="glass" onClick={() => console.log('Importar')}>
                  Importar
                </ModernButton>
              </>
            )}
          </div>
        </div>
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Entrenamientos</p>
                <p className="text-2xl font-bold text-white">{mockStats.workouts}</p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Metas Completadas</p>
                <p className="text-2xl font-bold text-white">{mockStats.completedGoals}</p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Logros</p>
                <p className="text-2xl font-bold text-white">{mockStats.achievements}</p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Puntos</p>
                <p className="text-2xl font-bold text-white">{mockStats.points}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="fitness-card">
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
          {[
            { id: 'overview', label: 'Resumen', icon: BarChart3 },
            { id: 'personal', label: 'Personal', icon: User },
            { id: 'activity', label: 'Actividad', icon: Activity },
            { id: 'achievements', label: 'Logros', icon: Trophy },
            { id: 'preferences', label: 'Preferencias', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido de las tabs */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información personal */}
          <ModernCard title="Información Personal" icon={User} gradient="from-blue-500 to-cyan-500" variant="stats">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-white">{mockProfileData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-white">{mockProfileData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-white">{mockProfileData.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-white">Miembro desde {mockProfileData.joinDate.toLocaleDateString()}</span>
              </div>
            </div>
          </ModernCard>

          {/* Estadísticas de actividad */}
          <ModernCard title="Estadísticas de Actividad" icon={Activity} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Entrenamientos</span>
                <span className="text-white font-bold">{mockStats.workouts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Horas Totales</span>
                <span className="text-white font-bold">{mockStats.totalHours}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Calorías Quemadas</span>
                <span className="text-white font-bold">{mockStats.caloriesBurned}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Días Activos</span>
                <span className="text-white font-bold">{mockStats.activeDays}</span>
              </div>
            </div>
          </ModernCard>

          {/* Logros recientes */}
          <ModernCard title="Logros Recientes" icon={Trophy} gradient="from-purple-500 to-pink-500" variant="stats">
            <div className="space-y-3">
              {mockAchievements.slice(0, 3).map((achievement, idx) => (
                <div key={achievement.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${getAchievementColor(achievement.level)} rounded-full flex items-center justify-center`}>
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{achievement.name}</p>
                    <p className="text-xs text-gray-400">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </ModernCard>
        </div>
      )}

      {activeTab === 'personal' && (
        <div className="fitness-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información básica */}
            <ModernCard title="Información Básica" icon={User} gradient="from-blue-500 to-cyan-500" variant="fitness">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={mockProfileData.name}
                    onChange={(e) => console.log('Cambiar nombre:', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={mockProfileData.email}
                    onChange={(e) => console.log('Cambiar email:', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={mockProfileData.phone}
                    onChange={(e) => console.log('Cambiar teléfono:', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                  />
                </div>
              </div>
            </ModernCard>

            {/* Información adicional */}
            <ModernCard title="Información Adicional" icon={User} gradient="from-green-500 to-emerald-500" variant="fitness">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ubicación</label>
                  <input
                    type="text"
                    value={mockProfileData.location}
                    onChange={(e) => console.log('Cambiar ubicación:', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Biografía</label>
                  <textarea
                    value={mockProfileData.bio}
                    onChange={(e) => console.log('Cambiar bio:', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 disabled:opacity-50 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sitio Web</label>
                  <input
                    type="url"
                    value={mockProfileData.website}
                    onChange={(e) => console.log('Cambiar website:', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                  />
                </div>
              </div>
            </ModernCard>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="fitness-card">
          <div className="space-y-6">
            {mockActivityHistory.map((activity, idx) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <ModernCard
                  key={activity.id}
                  title={activity.title}
                  description={activity.description}
                  icon={Icon}
                  gradient="from-blue-500 to-cyan-500"
                  variant="fitness"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ModernBadge variant="info" size="sm" icon={Clock}>
                        {activity.date}
                      </ModernBadge>
                      <ModernBadge variant="success" size="sm" icon={Star}>
                        {activity.points} pts
                      </ModernBadge>
                    </div>
                    <span className="text-sm text-gray-400">{activity.duration}</span>
                  </div>
                </ModernCard>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="fitness-card">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAchievements.map((achievement, idx) => (
              <ModernCard
                key={achievement.id}
                title={achievement.name}
                description={achievement.description}
                icon={Trophy}
                gradient={getAchievementColor(achievement.level)}
                variant="fitness"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ModernBadge variant="default" size="sm" icon={Star}>
                    {achievement.level}
                  </ModernBadge>
                  <span className="text-xs text-gray-400">{achievement.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300">{achievement.points} puntos</span>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="fitness-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Configuración de notificaciones */}
            <ModernCard title="Notificaciones" icon={Bell} gradient="from-blue-500 to-cyan-500" variant="fitness">
              <div className="space-y-4">
                {Object.entries(mockPreferences.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-white">{key}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updatePreferences('notifications', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </ModernCard>

            {/* Configuración de privacidad */}
            <ModernCard title="Privacidad" icon={Shield} gradient="from-green-500 to-emerald-500" variant="fitness">
              <div className="space-y-4">
                {Object.entries(mockPreferences.privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-white">{key}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updatePreferences('privacy', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </ModernCard>

            {/* Configuración de tema */}
            <ModernCard title="Apariencia" icon={Palette} gradient="from-purple-500 to-pink-500" variant="fitness">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tema</label>
                  <select
                    value={mockPreferences.theme}
                    onChange={(e) => updatePreferences('theme', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Idioma</label>
                  <select
                    value={mockPreferences.language}
                    onChange={(e) => updatePreferences('language', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
