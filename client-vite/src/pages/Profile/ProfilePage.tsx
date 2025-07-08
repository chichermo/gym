import React, { useState } from 'react';
import { Edit, Save, Camera, Settings, Activity, Trophy, Calendar, Target, Heart, Weight, Ruler, Mail, MapPin, Bell, Shield, LogOut, Zap, TrendingUp, Award } from "lucide-react";
import NavBar from '../../components/NavBar';

// Datos simulados del usuario
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
  }
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <NavBar />
      
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

              <p className="text-slate-700 text-lg leading-relaxed bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                {user.bio}
              </p>
            </div>

            {/* Botones de acción mejorados */}
            <div className="flex flex-col gap-3">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información personal */}
          <div className="lg:col-span-2 space-y-8">
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

            {/* Información física mejorada */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Información Física</h2>
                  <p className="text-slate-600">Tus medidas y datos personales</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <Weight className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 font-medium">Peso</div>
                    <div className="text-2xl font-bold text-slate-800">{user.weight} kg</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                    <Ruler className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 font-medium">Altura</div>
                    <div className="text-2xl font-bold text-slate-800">{user.height} cm</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 font-medium">Edad</div>
                    <div className="text-2xl font-bold text-slate-800">{user.age} años</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Configuración y preferencias mejoradas */}
          <div className="space-y-8">
            {/* Objetivos y experiencia mejorados */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Objetivos y Experiencia</h2>
                  <p className="text-slate-600">Tu camino fitness</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-sm text-slate-600 font-medium mb-1">Objetivo principal</div>
                  <div className="font-bold text-slate-800">{user.goal}</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-sm text-slate-600 font-medium mb-1">Nivel de experiencia</div>
                  <div className="font-bold text-slate-800">{user.experience}</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-sm text-slate-600 font-medium mb-1">Racha actual</div>
                  <div className="font-bold text-slate-800">{user.stats.currentStreak} días</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-sm text-slate-600 font-medium mb-1">Mejor racha</div>
                  <div className="font-bold text-slate-800">{user.stats.longestStreak} días</div>
                </div>
              </div>
            </div>

            {/* Configuración de notificaciones mejorada */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Configuración</h2>
                  <p className="text-slate-600">Personaliza tu experiencia</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700 font-medium">Notificaciones push</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={user.preferences.notifications} 
                      onChange={(e) => {
                        console.log('Notificaciones:', e.target.checked);
                      }}
                      className="sr-only peer" 
                    />
                    <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700 font-medium">Actualizaciones por email</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={user.preferences.emailUpdates} 
                      onChange={(e) => {
                        console.log('Email updates:', e.target.checked);
                      }}
                      className="sr-only peer" 
                    />
                    <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="text-slate-700 font-medium">Perfil público</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={user.preferences.privacy === 'public'} 
                      onChange={(e) => {
                        console.log('Privacy:', e.target.checked);
                      }}
                      className="sr-only peer" 
                    />
                    <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Acciones rápidas mejoradas */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Acciones Rápidas</h2>
                  <p className="text-slate-600">Accede a funciones importantes</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-4 p-4 text-left bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700 font-medium">Ver historial de entrenamientos</span>
                </button>
                <button className="w-full flex items-center gap-4 p-4 text-left bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                  <Trophy className="w-5 h-5 text-amber-600" />
                  <span className="text-slate-700 font-medium">Mis logros</span>
                </button>
                <button className="w-full flex items-center gap-4 p-4 text-left bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span className="text-slate-700 font-medium">Establecer nuevos objetivos</span>
                </button>
                <button className="w-full flex items-center gap-4 p-4 text-left bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                  <Settings className="w-5 h-5 text-slate-600" />
                  <span className="text-slate-700 font-medium">Configuración avanzada</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
