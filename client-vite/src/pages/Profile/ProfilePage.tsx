import React, { useState } from 'react';
import { Edit, Save, Camera, Settings, Activity, Trophy, Calendar, Target, Heart, Weight, Ruler, Mail, MapPin, Bell, Shield, LogOut, Zap, TrendingUp, Award, User, Info, BarChart3, Plus } from "lucide-react";
import ProfileSetup from '../../components/ProfileSetup';
import MeasurementTracker from '../../components/MeasurementTracker';
import WeightTracker from '../../components/WeightTracker';
import { ExperienceLevel, BodyType, PhysicalInfo, Measurement, BodyComposition, WeightRecord } from '../../types';
import { experienceLevels, bodyTypes, mockBodyComposition } from '../../data/mockData';

// Datos simulados del usuario actualizado
const mockUser = {
  _id: 'user123',
  name: 'Carlos Rodríguez',
  email: 'carlos@example.com',
  phone: '+34 612 345 678',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  age: 28,
  height: 175,
  weight: 75,
  goal: 'Ganar masa muscular',
  experience: 'Intermedio',
  joinDate: '2024-01-15',
  location: 'Madrid, España',
  bio: 'Entusiasta del fitness con 3 años de experiencia. Me enfoco en entrenamiento de fuerza y hipertrofia.',
  stats: {
    totalWorkouts: 45,
    totalTime: 67.5,
    currentStreak: 7,
    longestStreak: 21,
    totalCalories: 12500,
    achievements: 8
  },
  preferences: {
    notifications: true,
    emailUpdates: true,
    privacy: 'public',
    theme: 'light'
  },
  // Nuevas propiedades
  experienceLevel: 'Intermedio II' as ExperienceLevel,
  bodyType: 'Mesomorfo' as BodyType,
  physicalInfo: {
    weight: 75,
    height: 175,
    age: 28,
    bodyType: 'Mesomorfo' as BodyType
  },
  bodyComposition: mockBodyComposition
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'measurements' | 'weight' | 'composition'>('info');
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
    location: user.location
  });

  const handleSave = () => {
    setUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      location: user.location
    });
    setIsEditing(false);
  };

  const handleProfileSetupComplete = (data: {
    experienceLevel: ExperienceLevel;
    bodyType: BodyType;
    physicalInfo: PhysicalInfo;
  }) => {
    setUser({
      ...user,
      experienceLevel: data.experienceLevel,
      bodyType: data.bodyType,
      physicalInfo: data.physicalInfo
    });
    setShowProfileSetup(false);
  };

  const tabs = [
    { id: 'info', label: 'Información Personal', icon: User },
    { id: 'measurements', label: 'Medición de Perímetros', icon: Ruler },
    { id: 'weight', label: 'Seguimiento de Peso', icon: Weight },
    { id: 'composition', label: 'Composición Corporal', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col lg:pl-64">
      {/* Banner Demo Mejorado */}
      <div className="w-full bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 border-b border-amber-300 py-3 px-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-700" />
          <span className="text-amber-800 text-sm font-semibold">Modo DEMO: Datos simulados del perfil</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header del perfil mejorado */}
        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Avatar mejorado */}
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-400 via-indigo-500 to-purple-600 p-1 shadow-2xl">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Información principal mejorada */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:scale-110"
                >
                  <Edit className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-6 text-slate-600 mb-6">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{user.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span className="font-medium">Miembro desde {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Nueva información del perfil */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">Nivel</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">{user.experienceLevel}</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-slate-700">Tipo de Cuerpo</span>
                  </div>
                  <div className="text-lg font-bold text-emerald-600">{user.bodyType}</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Weight className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-slate-700">Peso</span>
                  </div>
                  <div className="text-lg font-bold text-purple-600">{user.physicalInfo.weight}kg</div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-semibold text-slate-700">Altura</span>
                  </div>
                  <div className="text-lg font-bold text-amber-600">{user.physicalInfo.height}cm</div>
                </div>
              </div>

              <p className="text-slate-700 text-lg leading-relaxed bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                {user.bio}
              </p>
            </div>

            {/* Botones de acción mejorados */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowProfileSetup(true)}
                className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Settings className="w-5 h-5" />
                Configurar Perfil
              </button>
              <button className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Settings className="w-5 h-5" />
                Configuración
              </button>
              <button className="flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="bg-white rounded-3xl shadow-xl border border-white/30 mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido de las tabs */}
        <div className="bg-white rounded-3xl shadow-xl border border-white/30 p-8">
          {activeTab === 'info' && (
            <div className="space-y-8">
              {/* Formulario de edición mejorado */}
              {isEditing && (
                <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                      <Edit className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Editar Perfil</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Nombre</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Teléfono</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Ubicación</label>
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Biografía</label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
                    />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Save className="w-5 h-5" />
                      Guardar Cambios
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 transform hover:scale-105"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Estadísticas de entrenamiento mejoradas */}
              <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Estadísticas de Entrenamiento</h2>
                    <p className="text-slate-600">Tu progreso en números</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                      {user.stats.totalWorkouts}
                    </div>
                    <div className="text-slate-600 font-medium">Entrenamientos</div>
                  </div>
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                      {user.stats.totalTime}h
                    </div>
                    <div className="text-slate-600 font-medium">Horas totales</div>
                  </div>
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                      {user.stats.currentStreak}
                    </div>
                    <div className="text-slate-600 font-medium">Días seguidos</div>
                  </div>
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {user.stats.achievements}
                    </div>
                    <div className="text-slate-600 font-medium">Logros</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'measurements' && (
            <MeasurementTracker />
          )}

          {activeTab === 'weight' && (
            <WeightTracker />
          )}

          {activeTab === 'composition' && (
            <div className="space-y-8">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Composición Corporal</h3>
                <p className="text-slate-600 mb-4">Esta funcionalidad estará disponible próximamente</p>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {user.bodyComposition?.grasaCorporal || 'N/A'}%
                      </div>
                      <div className="text-sm text-slate-600">Grasa Corporal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">
                        {user.bodyComposition?.musculatura || 'N/A'}%
                      </div>
                      <div className="text-sm text-slate-600">Musculatura</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {user.bodyComposition ? 'Medido' : 'No informado'}
                      </div>
                      <div className="text-sm text-slate-600">Pliegues</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal de configuración de perfil */}
      {showProfileSetup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <ProfileSetup onComplete={handleProfileSetupComplete} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
