import React, { useState } from 'react';
import { User, Users, MessageCircle, Heart, Send, TrendingUp, Star, Plus, Search, Award } from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';

const mockPosts = [
  {
    id: 1,
    user: 'AnaFit',
    avatar: <User className="w-8 h-8 text-blue-400" />,
    date: '2024-06-01',
    content: '¡Hoy logré un nuevo récord en sentadillas! 💪 #progreso',
    likes: 24,
    comments: [
      { user: 'Carlos', text: '¡Felicidades Ana! 🔥' },
      { user: 'Laura', text: '¡Increíble avance!' }
    ]
  },
  {
    id: 2,
    user: 'CarlosGym',
    avatar: <User className="w-8 h-8 text-green-400" />,
    date: '2024-06-02',
    content: '¿Alguien tiene tips para mejorar la resistencia en carrera?',
    likes: 12,
    comments: [
      { user: 'AnaFit', text: '¡Intervalos y constancia!' }
    ]
  },
  {
    id: 3,
    user: 'LauraYoga',
    avatar: <User className="w-8 h-8 text-pink-400" />,
    date: '2024-06-03',
    content: 'Hoy probé una nueva rutina de yoga y me encantó 🧘‍♀️',
    likes: 18,
    comments: []
  }
];

const mockTrending = [
  { tag: '#progreso', count: 32 },
  { tag: '#motivacion', count: 28 },
  { tag: '#salud', count: 21 },
  { tag: '#reto', count: 17 }
];

const mockUsers = [
  { name: 'AnaFit', avatar: <User className="w-8 h-8 text-blue-400" />, points: 1200 },
  { name: 'CarlosGym', avatar: <User className="w-8 h-8 text-green-400" />, points: 950 },
  { name: 'LauraYoga', avatar: <User className="w-8 h-8 text-pink-400" />, points: 1100 }
];

const CommunityPage: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(mockPosts);
  const [search, setSearch] = useState('');

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          user: 'Tú',
          avatar: <User className="w-8 h-8 text-indigo-400" />,
          date: new Date().toISOString().split('T')[0],
          content: newPost,
          likes: 0,
          comments: []
        },
        ...posts
      ]);
      setNewPost('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header y acciones rápidas */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Comunidad</h1>
            <p className="text-gray-300">Comparte tus logros, dudas y motívate con otros usuarios</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Plus} onClick={handlePost}>
              Publicar
            </ModernButton>
            <ModernButton icon={Search} variant="glass">
              Buscar
            </ModernButton>
          </div>
        </div>
        {/* Crear nueva publicación */}
        <div className="flex items-center gap-4 mb-2">
          <User className="w-10 h-10 text-indigo-400" />
          <input
            type="text"
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="¿Qué quieres compartir hoy?"
            className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
          />
          <ModernButton icon={Send} onClick={handlePost}>
            Enviar
          </ModernButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed principal */}
        <div className="lg:col-span-2 space-y-6">
          {posts.map(post => (
            <ModernCard
              key={post.id}
              title={post.user}
              icon={() => post.avatar}
              description={post.date}
              gradient="from-blue-500 to-cyan-500"
              variant="fitness"
            >
              <p className="text-white mb-4">{post.content}</p>
              <div className="flex items-center gap-4 mb-2">
                <ModernButton icon={Heart} variant="glass">
                  {post.likes}
                </ModernButton>
                <ModernButton icon={MessageCircle} variant="glass">
                  {post.comments.length}
                </ModernButton>
              </div>
              {/* Comentarios */}
              {post.comments.length > 0 && (
                <div className="bg-white/5 rounded-xl p-3 mt-2">
                  <p className="text-xs text-gray-300 mb-1">Comentarios:</p>
                  {post.comments.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-white font-medium">{c.user}:</span>
                      <span className="text-sm text-gray-200">{c.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </ModernCard>
          ))}
        </div>

        {/* Panel lateral: tendencias y usuarios destacados */}
        <div className="space-y-6">
          <ModernCard title="Tendencias" icon={TrendingUp} gradient="from-purple-500 to-pink-500" variant="stats">
            <div className="space-y-2">
              {mockTrending.map((trend, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-white font-medium">{trend.tag}</span>
                  <span className="text-xs text-gray-300">{trend.count} menciones</span>
                </div>
              ))}
            </div>
          </ModernCard>

          <ModernCard title="Usuarios Destacados" icon={Star} gradient="from-yellow-500 to-orange-500" variant="stats">
            <div className="space-y-2">
              {mockUsers.map((user, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {user.avatar}
                  <span className="text-white font-medium">{user.name}</span>
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-gray-300">{user.points} pts</span>
                </div>
              ))}
            </div>
          </ModernCard>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 