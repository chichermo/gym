import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Heart, 
  Activity, 
  Target, 
  Trophy, 
  Star, 
  Calendar,
  Edit,
  Camera,
  Bell,
  Shield,
  Zap,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  MapPin,
  Mail,
  Phone,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  BarChart3
} from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';

// Mock data
const mockProfileData = {
  name: 'Carlos Rodríguez',
  email: 'carlos.rodriguez@email.com',
  phone: '+1 (555) 123-4567',
  location: 'Madrid, España',
  bio: 'Entusiasta del fitness con más de 5 años de experiencia. Me apasiona ayudar a otros a alcanzar sus objetivos de salud y bienestar.',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  joinDate: '2023-01-15',
  level: 15,
  experience: 3200,
  achievements: 24,
  completedWorkouts: 156,
  totalTime: 2340, // en minutos
  streak: 28,
  rank: 'Oro',
  preferences: {
    notifications: true,
    privacy: 'public',
    theme: 'dark',
    language: 'español'
  },
  stats: {
    weight: 75,
    height: 180,
    bmi: 23.1,
    bodyFat: 15,
    muscleMass: 45,
    waterPercentage: 60,
    boneMass: 3.2,
    visceralFat: 8,
    bmr: 1850,
    tdee: 2200
  },
  goals: [
    { id: 1, name: 'Bajar 5kg', progress: 60, target: 5, unit: 'kg' },
    { id: 2, name: 'Correr 10km', progress: 80, target: 10, unit: 'km' },
    { id: 3, name: 'Hacer 50 flexiones', progress: 90, target: 50, unit: 'repeticiones' }
  ],
  recentAchievements: [
    { id: 1, name: 'Primer Maratón', date: '2024-06-15', icon: Trophy },
    { id: 2, name: '100 Días Consecutivos', date: '2024-06-10', icon: Star },
    { id: 3, name: 'Nuevo Récord Personal', date: '2024-06-05', icon: Award }
  ]
};

const mockHealthData = {
  vitals: {
    heartRate: { current: 72, normal: '60-100', unit: 'bpm' },
    bloodPressure: { systolic: 120, diastolic: 80, unit: 'mmHg' },
    oxygenSaturation: { current: 98, normal: '95-100', unit: '%' },
    temperature: { current: 36.8, normal: '36.1-37.2', unit: '°C' }
  },
  bodyComposition: {
    weight: { current: 75, target: 70, unit: 'kg' },
    bodyFat: { current: 15, target: 12, unit: '%' },
    muscleMass: { current: 45, target: 48, unit: 'kg' },
    waterPercentage: { current: 60, target: 62, unit: '%' }
  },
  nutrition: {
    dailyCalories: { current: 1850, target: 2000, unit: 'kcal' },
    protein: { current: 120, target: 150, unit: 'g' },
    carbs: { current: 200, target: 250, unit: 'g' },
    fats: { current: 65, target: 70, unit: 'g' }
  },
  sleep: {
    averageHours: { current: 7.5, target: 8, unit: 'horas' },
    quality: { current: 85, target: 90, unit: '%' },
    deepSleep: { current: 2.5, target: 3, unit: 'horas' }
  },
  stress: {
    currentLevel: { current: 3, target: 2, unit: '/10' },
    recovery: { current: 85, target: 90, unit: '%' },
    hrv: { current: 45, target: 50, unit: 'ms' }
  }
};

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Bajo peso', color: 'text-blue-400' };
    if (bmi < 25) return { category: 'Peso normal', color: 'text-green-400' };
    if (bmi < 30) return { category: 'Sobrepeso', color: 'text-yellow-400' };
    return { category: 'Obesidad', color: 'text-red-400' };
  };

  const bmiCategory = getBMICategory(mockProfileData.stats.bmi);

  return (
    <div className="space-y-8">
      {/* Header del perfil */}
      <div className="fitness-card">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img 
              src={mockProfileData.profileImage} 
              alt={mockProfileData.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
            />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{mockProfileData.name}</h1>
              <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white">
                <Star className="w-3 h-3" />
                {mockProfileData.rank}
              </div>
            </div>
            <p className="text-gray-300 mb-2">{mockProfileData.bio}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Nivel {mockProfileData.level}</span>
              <span>•</span>
              <span>{mockProfileData.experience} XP</span>
              <span>•</span>
              <span>Miembro desde {new Date(mockProfileData.joinDate).toLocaleDateString('es-ES')}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Edit} variant="secondary" onClick={() => setShowEditProfile(true)}>
              Editar
            </ModernButton>
            <ModernButton icon={Settings} variant="glass" onClick={() => setShowSettings(true)}>
              Configuración
            </ModernButton>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="fitness-card">
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl mb-6">
          {[
            { id: 'overview', label: 'Resumen', icon: BarChart3 },
            { id: 'personal', label: 'Personal', icon: User },
            { id: 'health', label: 'Salud', icon: Heart },
            { id: 'test', label: 'Test', icon: Target }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido de tabs */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Estadísticas principales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <ModernCard title="Entrenamientos" icon={Activity} gradient="from-blue-500 to-cyan-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{mockProfileData.completedWorkouts}</div>
                  <p className="text-gray-300 text-sm">Completados</p>
                </div>
              </ModernCard>
              
              <ModernCard title="Tiempo Total" icon={Clock} gradient="from-green-500 to-emerald-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{Math.round(mockProfileData.totalTime / 60)}</div>
                  <p className="text-gray-300 text-sm">Horas</p>
                </div>
              </ModernCard>
              
              <ModernCard title="Racha Actual" icon={TrendingUp} gradient="from-purple-500 to-pink-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{mockProfileData.streak}</div>
                  <p className="text-gray-300 text-sm">Días</p>
                </div>
              </ModernCard>
              
              <ModernCard title="Logros" icon={Trophy} gradient="from-yellow-500 to-orange-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{mockProfileData.achievements}</div>
                  <p className="text-gray-300 text-sm">Desbloqueados</p>
                </div>
              </ModernCard>
            </div>

            {/* Metas actuales */}
            <div className="fitness-card">
              <h3 className="text-xl font-bold text-white mb-4">Metas Actuales</h3>
              <div className="space-y-4">
                {mockProfileData.goals.map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{goal.name}</span>
                      <span className="text-gray-400">{goal.progress}/{goal.target} {goal.unit}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logros recientes */}
            <div className="fitness-card">
              <h3 className="text-xl font-bold text-white mb-4">Logros Recientes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockProfileData.recentAchievements.map(achievement => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{achievement.name}</div>
                        <div className="text-xs text-gray-400">{achievement.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="space-y-6">
            {/* Información personal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernCard title="Información Personal" icon={User} gradient="from-blue-500 to-cyan-500" variant="fitness">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{mockProfileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{mockProfileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{mockProfileData.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-white">Miembro desde {new Date(mockProfileData.joinDate).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </ModernCard>

              <ModernCard title="Estadísticas Corporales" icon={Activity} gradient="from-green-500 to-emerald-500" variant="fitness">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Peso</span>
                    <span className="text-white">{mockProfileData.stats.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Altura</span>
                    <span className="text-white">{mockProfileData.stats.height} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">IMC</span>
                    <span className={`${bmiCategory.color}`}>{mockProfileData.stats.bmi} ({bmiCategory.category})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Grasa Corporal</span>
                    <span className="text-white">{mockProfileData.stats.bodyFat}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Masa Muscular</span>
                    <span className="text-white">{mockProfileData.stats.muscleMass} kg</span>
                  </div>
                </div>
              </ModernCard>
            </div>

            {/* Redes sociales */}
            <ModernCard title="Redes Sociales" icon={Globe} gradient="from-purple-500 to-pink-500" variant="fitness">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Instagram', icon: Instagram, handle: '@carlos.fitness' },
                  { name: 'Twitter', icon: Twitter, handle: '@carlos_rodriguez' },
                  { name: 'LinkedIn', icon: Linkedin, handle: 'carlos-rodriguez' },
                  { name: 'YouTube', icon: Youtube, handle: 'Carlos Fitness' }
                ].map(social => {
                  const Icon = social.icon;
                  return (
                    <div key={social.name} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-400">{social.name}</div>
                        <div className="text-sm text-white">{social.handle}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ModernCard>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            {/* Signos vitales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ModernCard title="Frecuencia Cardíaca" icon={Heart} gradient="from-red-500 to-pink-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{mockHealthData.vitals.heartRate.current}</div>
                  <p className="text-gray-300 text-sm">{mockHealthData.vitals.heartRate.unit}</p>
                  <p className="text-xs text-gray-400">Normal: {mockHealthData.vitals.heartRate.normal}</p>
                </div>
              </ModernCard>
              
              <ModernCard title="Presión Arterial" icon={Activity} gradient="from-blue-500 to-cyan-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{mockHealthData.vitals.bloodPressure.systolic}/{mockHealthData.vitals.bloodPressure.diastolic}</div>
                  <p className="text-gray-300 text-sm">{mockHealthData.vitals.bloodPressure.unit}</p>
                </div>
              </ModernCard>
              
              <ModernCard title="Saturación de Oxígeno" icon={Zap} gradient="from-green-500 to-emerald-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{mockHealthData.vitals.oxygenSaturation.current}</div>
                  <p className="text-gray-300 text-sm">{mockHealthData.vitals.oxygenSaturation.unit}</p>
                  <p className="text-xs text-gray-400">Normal: {mockHealthData.vitals.oxygenSaturation.normal}</p>
                </div>
              </ModernCard>
              
              <ModernCard title="Temperatura" icon={Shield} gradient="from-yellow-500 to-orange-500" variant="fitness">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{mockHealthData.vitals.temperature.current}</div>
                  <p className="text-gray-300 text-sm">{mockHealthData.vitals.temperature.unit}</p>
                  <p className="text-xs text-gray-400">Normal: {mockHealthData.vitals.temperature.normal}</p>
                </div>
              </ModernCard>
            </div>

            {/* Composición corporal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernCard title="Composición Corporal" icon={Activity} gradient="from-purple-500 to-pink-500" variant="fitness">
                <div className="space-y-3">
                  {Object.entries(mockHealthData.bodyComposition).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-white">{value.current}/{value.target} {value.unit}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(value.current / value.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>

              <ModernCard title="Nutrición Diaria" icon={Target} gradient="from-green-500 to-emerald-500" variant="fitness">
                <div className="space-y-3">
                  {Object.entries(mockHealthData.nutrition).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 capitalize">{key}</span>
                        <span className="text-white">{value.current}/{value.target} {value.unit}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(value.current / value.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* Sueño y estrés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernCard title="Calidad del Sueño" icon={Clock} gradient="from-indigo-500 to-purple-500" variant="fitness">
                <div className="space-y-3">
                  {Object.entries(mockHealthData.sleep).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-white">{value.current}/{value.target} {value.unit}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(value.current / value.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>

              <ModernCard title="Nivel de Estrés" icon={Shield} gradient="from-red-500 to-pink-500" variant="fitness">
                <div className="space-y-3">
                  {Object.entries(mockHealthData.stress).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-white">{value.current}/{value.target} {value.unit}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(value.current / value.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>
          </div>
        )}

        {activeTab === 'test' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Target className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Tests de Evaluación</h3>
              <p className="text-gray-300">Aquí aparecerán los tests de evaluación física</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
