import React, { useState } from 'react';
import { User, Edit, Save, Camera, Settings, Activity, Trophy, Calendar, Target, Heart, Weight, Ruler, Mail, Phone, MapPin, Bell, Shield, LogOut } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col">
      <NavBar />
      
      {/* Banner Demo */}
      <div className="w-full bg-gradient-to-r from-yellow-200 via-yellow-50 to-yellow-100 border-b border-yellow-300 py-2 px-4 flex items-center justify-center">
        <span className="text-yellow-800 text-sm font-medium">Modo DEMO: Datos simulados del perfil</span>
      </div>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        {/* Header del perfil */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-tr from-blue-400 to-indigo-400">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Información principal */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Miembro desde {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <p className="text-gray-700">{user.bio}</p>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Settings className="w-4 h-4" />
                Configuración
              </button>
              <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información personal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Formulario de edición */}
            {isEditing && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Editar Perfil</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Estadísticas de entrenamiento */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Estadísticas de Entrenamiento</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{user.stats.totalWorkouts}</div>
                  <div className="text-gray-600 text-sm">Entrenamientos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{user.stats.totalTime}h</div>
                  <div className="text-gray-600 text-sm">Horas totales</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{user.stats.currentStreak}</div>
                  <div className="text-gray-600 text-sm">Días seguidos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{user.stats.achievements}</div>
                  <div className="text-gray-600 text-sm">Logros</div>
                </div>
              </div>
            </div>

            {/* Información física */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Información Física</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Weight className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Peso</div>
                    <div className="font-semibold text-gray-900">{user.weight} kg</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Altura</div>
                    <div className="font-semibold text-gray-900">{user.height} cm</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Edad</div>
                    <div className="font-semibold text-gray-900">{user.age} años</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Configuración y preferencias */}
          <div className="space-y-6">
            {/* Objetivos y experiencia */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Objetivos y Experiencia</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Objetivo principal</div>
                  <div className="font-semibold text-gray-900">{user.goal}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Nivel de experiencia</div>
                  <div className="font-semibold text-gray-900">{user.experience}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Racha actual</div>
                  <div className="font-semibold text-gray-900">{user.stats.currentStreak} días</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Mejor racha</div>
                  <div className="font-semibold text-gray-900">{user.stats.longestStreak} días</div>
                </div>
              </div>
            </div>

            {/* Configuración de notificaciones */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Configuración</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Notificaciones push</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={user.preferences.notifications} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Actualizaciones por email</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={user.preferences.emailUpdates} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Perfil público</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={user.preferences.privacy === 'public'} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Ver historial de entrenamientos</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700">Mis logros</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Establecer nuevos objetivos</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Configuración avanzada</span>
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
