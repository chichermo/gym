import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share, Users, Trophy, Target, 
  Calendar, MapPin, Star, Plus, Search, Filter
} from 'lucide-react';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos simulados
  const posts = [
    {
      id: 1,
      user: {
        name: 'María García',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        level: 'Avanzado',
        verified: true
      },
      content: '¡Completé mi primer maratón! 🏃‍♀️ 42km en 3:45. Gracias a todos por el apoyo durante el entrenamiento.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      likes: 124,
      comments: 23,
      shares: 8,
      timeAgo: '2h',
      tags: ['maratón', 'running', 'logro']
    },
    {
      id: 2,
      user: {
        name: 'Carlos Rodríguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        level: 'Intermedio',
        verified: false
      },
      content: 'Nueva rutina de fuerza para principiantes. 3 series de 12 repeticiones cada ejercicio. ¡Comenten si la prueban! 💪',
      image: null,
      likes: 89,
      comments: 15,
      shares: 12,
      timeAgo: '5h',
      tags: ['fuerza', 'principiantes', 'rutina']
    },
    {
      id: 3,
      user: {
        name: 'Ana Martínez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        level: 'Experto',
        verified: true
      },
      content: 'Consejo del día: La hidratación es clave. Bebe agua antes, durante y después del entrenamiento. Tu cuerpo te lo agradecerá! 💧',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop',
      likes: 256,
      comments: 34,
      shares: 45,
      timeAgo: '1d',
      tags: ['hidratación', 'consejos', 'salud']
    }
  ];

  const challenges = [
    {
      id: 1,
      title: 'Desafío 30 Días de Yoga',
      description: 'Practica yoga todos los días durante 30 días',
      participants: 1247,
      daysLeft: 15,
      difficulty: 'Fácil',
      category: 'Flexibilidad',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Reto de Fuerza',
      description: 'Aumenta tu peso máximo en press de banca en 4 semanas',
      participants: 892,
      daysLeft: 28,
      difficulty: 'Difícil',
      category: 'Fuerza',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Carrera 5K',
      description: 'Completa una carrera de 5km en menos de 25 minutos',
      participants: 2156,
      daysLeft: 7,
      difficulty: 'Intermedio',
      category: 'Cardio',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    }
  ];

  const groups = [
    {
      id: 1,
      name: 'Runners México',
      members: 15420,
      description: 'Comunidad de corredores en México',
      category: 'Running',
      isPrivate: false,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Gym Buddies CDMX',
      members: 8923,
      description: 'Encuentra tu compañero de entrenamiento',
      category: 'Fuerza',
      isPrivate: true,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Yoga para Principiantes',
      members: 12345,
      description: 'Aprende yoga desde cero',
      category: 'Flexibilidad',
      isPrivate: false,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Carrera Nocturna CDMX',
      date: '2024-02-15',
      time: '20:00',
      location: 'Bosque de Chapultepec',
      participants: 450,
      maxParticipants: 1000,
      category: 'Running',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop'
    },
    {
      id: 2,
      title: 'Clase de Yoga al Aire Libre',
      date: '2024-02-18',
      time: '07:00',
      location: 'Parque México',
      participants: 85,
      maxParticipants: 100,
      category: 'Yoga',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=150&fit=crop'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Difícil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comunidad</h1>
          <p className="text-gray-600">Conecta, comparte y motívate con otros fitness enthusiasts</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Crear Post
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'feed', label: 'Feed', icon: Users },
          { id: 'challenges', label: 'Desafíos', icon: Trophy },
          { id: 'groups', label: 'Grupos', icon: Users },
          { id: 'events', label: 'Eventos', icon: Calendar }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar en la comunidad..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Content based on active tab */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border p-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                      {post.user.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <Star className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {post.user.level}
                      </span>
                      <span>•</span>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-4">{post.content}</p>
              
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                    <Share className="w-5 h-5" />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <img
                src={challenge.image}
                alt={challenge.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">{challenge.category}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{challenge.participants} participantes</span>
                  <span>{challenge.daysLeft} días restantes</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Unirse al Desafío
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{group.name}</h3>
                    {group.isPrivate && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        Privado
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{group.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{group.members.toLocaleString()} miembros</span>
                    <span>•</span>
                    <span>{group.category}</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Unirse
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {event.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {event.participants}/{event.maxParticipants} participantes
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date} a las {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Registrarse
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community; 