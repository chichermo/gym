import React, { useState } from 'react';
import { 
  User, 
  Edit, 
  Trophy, 
  Target, 
  Calendar, 
  MapPin, 
  Phone, 
  Briefcase, 
  Heart,
  TrendingUp,
  Activity,
  Award,
  Settings,
  Camera
} from 'lucide-react';
import { currentUser, workoutStats, mockAchievements } from '../../data/mockData';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const unlockedAchievements = mockAchievements.filter(achievement => achievement.unlocked);
  const recentAchievements = unlockedAchievements.slice(0, 3);

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'stats', label: 'Estadísticas', icon: Activity },
    { id: 'achievements', label: 'Logros', icon: Trophy },
    { id: 'measurements', label: 'Mediciones', icon: TrendingUp }
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Información básica */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Edit size={16} />
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre completo</label>
              <input
                type="text"
                defaultValue={currentUser.name}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                defaultValue={currentUser.email}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono</label>
              <input
                type="tel"
                defaultValue={currentUser.personalInfo?.phone}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ubicación</label>
              <input
                type="text"
                defaultValue={currentUser.personalInfo?.location}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Profesión</label>
              <input
                type="text"
                defaultValue={currentUser.personalInfo?.occupation}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Intereses</label>
              <input
                type="text"
                defaultValue={currentUser.personalInfo?.interests.join(', ')}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Información física */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Física</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Edad</label>
            <input
              type="number"
              defaultValue={currentUser.age}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Altura (cm)</label>
            <input
              type="number"
              defaultValue={currentUser.height}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Peso (kg)</label>
            <input
              type="number"
              defaultValue={currentUser.weight}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Objetivo</label>
            <select
              defaultValue={currentUser.goal}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="Ganar músculo y fuerza">Ganar músculo y fuerza</option>
              <option value="Perder peso">Perder peso</option>
              <option value="Mejorar resistencia">Mejorar resistencia</option>
              <option value="Mantener forma">Mantener forma</option>
            </select>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Guardar Cambios
          </button>
          <button 
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Entrenamientos</p>
              <p className="text-2xl font-bold text-gray-800">{workoutStats.totalWorkouts}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Racha Actual</p>
              <p className="text-2xl font-bold text-gray-800">{workoutStats.currentStreak} días</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Calorías Quemadas</p>
              <p className="text-2xl font-bold text-gray-800">{workoutStats.totalCalories.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nivel</p>
              <p className="text-2xl font-bold text-gray-800">{currentUser.level}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progreso de fuerza */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Progreso de Fuerza</h3>
        
        <div className="space-y-4">
          {Object.entries(workoutStats.strengthProgress).map(([exercise, data]) => (
            <div key={exercise} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800 capitalize">{exercise.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-sm text-gray-600">Objetivo: {data.goal}{data.unit}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{data.current}{data.unit}</p>
                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(data.current / data.goal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Composición corporal */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Composición Corporal</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Ganancia Muscular</p>
            <p className="text-2xl font-bold text-green-600">+{workoutStats.bodyComposition.muscleGain}kg</p>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">Pérdida de Grasa</p>
            <p className="text-2xl font-bold text-red-600">-{workoutStats.bodyComposition.fatLoss}kg</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">% Grasa Corporal</p>
            <p className="text-2xl font-bold text-blue-600">{workoutStats.bodyComposition.bodyFatPercentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      {/* Logros recientes */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Logros Recientes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <p className="font-medium text-gray-800">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 font-medium">+{achievement.xpReward} XP</span>
                <span className="text-gray-500">{achievement.unlockedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Todos los logros */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Todos los Logros</h3>
        
        <div className="space-y-3">
          {mockAchievements.map((achievement) => (
            <div key={achievement.id} className={`p-4 rounded-lg border ${
              achievement.unlocked ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200 opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-600">{achievement.progress}/{achievement.maxProgress}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      achievement.rarity === 'legendary' ? 'bg-purple-100 text-purple-800' :
                      achievement.rarity === 'epic' ? 'bg-blue-100 text-blue-800' :
                      achievement.rarity === 'rare' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  
                  {achievement.unlocked ? (
                    <div className="text-sm text-green-600 font-medium">+{achievement.xpReward} XP</div>
                  ) : (
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMeasurements = () => (
    <div className="space-y-6">
      {/* Mediciones actuales */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mediciones Actuales</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {currentUser.measurements && Object.entries(currentUser.measurements).map(([key, value]) => (
            <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 capitalize">{key}</p>
              <p className="text-xl font-bold text-gray-800">{value}cm</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historial de mediciones */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Historial de Mediciones</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Fecha</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Pecho</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Cintura</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Brazos</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Piernas</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Hombros</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-sm text-gray-600">25 Jun 2024</td>
                <td className="py-3 px-4 font-medium">105cm</td>
                <td className="py-3 px-4 font-medium">82cm</td>
                <td className="py-3 px-4 font-medium">35cm</td>
                <td className="py-3 px-4 font-medium">58cm</td>
                <td className="py-3 px-4 font-medium">120cm</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-sm text-gray-600">25 May 2024</td>
                <td className="py-3 px-4 font-medium">103cm</td>
                <td className="py-3 px-4 font-medium">83cm</td>
                <td className="py-3 px-4 font-medium">34cm</td>
                <td className="py-3 px-4 font-medium">57cm</td>
                <td className="py-3 px-4 font-medium">118cm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-gray-600 mt-2">Gestiona tu información personal y revisa tu progreso</p>
        </div>

        {/* Perfil principal */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Camera size={16} />
              </button>
            </div>

            {/* Información básica */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
              <p className="text-gray-600 mb-4">{currentUser.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  {currentUser.personalInfo?.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target size={16} />
                  {currentUser.goal}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  Miembro desde {new Date(currentUser.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{currentUser.level}</p>
                <p className="text-sm text-gray-600">Nivel</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{currentUser.streak}</p>
                <p className="text-sm text-gray-600">Racha</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{currentUser.totalWorkouts}</p>
                <p className="text-sm text-gray-600">Entrenamientos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'stats' && renderStats()}
            {activeTab === 'achievements' && renderAchievements()}
            {activeTab === 'measurements' && renderMeasurements()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 