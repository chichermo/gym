import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageCircle, Heart, TrendingUp, Star, Plus, Search,
  MapPin, Trophy, Target, Activity, Zap, Share2, MoreHorizontal, Bookmark
} from 'lucide-react';
import { ModernButton } from '../../components/ModernUI';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
    verified: boolean;
    specialty?: string;
  };
  content: string;
  type: 'workout' | 'achievement' | 'motivation' | 'question' | 'milestone' | 'challenge';
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  workoutData?: {
    duration: number;
    calories: number;
    exercises: string[];
    difficulty: string;
  };
  achievementData?: {
    title: string;
    description: string;
    xpReward: number;
    badge?: string;
  };
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  timestamp: Date;
  tags: string[];
  location?: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'María García',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      level: 8,
      verified: true,
      specialty: 'Running & Cardio'
    },
    content: '¡Completé mi primer maratón! 🏃‍♀️ 42km en 3:45. Gracias a todos por el apoyo durante el entrenamiento. #maraton #running #logro',
    type: 'milestone',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
    },
    workoutData: {
      duration: 225,
      calories: 2400,
      exercises: ['Maratón 42km'],
      difficulty: 'Avanzado'
    },
    likes: 124,
    comments: 23,
    shares: 8,
    bookmarks: 15,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    tags: ['maratón', 'running', 'logro', 'cardio'],
    location: 'CDMX'
  },
  {
    id: '2',
    user: {
      name: 'Carlos Rodríguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      level: 12,
      verified: true,
      specialty: 'Powerlifting'
    },
    content: '¡Nuevo PR en press de banca! 💪 120kg x 1. Después de 6 meses de entrenamiento específico, finalmente lo logré.',
    type: 'achievement',
    achievementData: {
      title: 'Press de Banca 120kg',
      description: 'Nuevo récord personal en press de banca',
      xpReward: 500,
      badge: '🏆'
    },
    likes: 89,
    comments: 15,
    shares: 12,
    bookmarks: 8,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    tags: ['powerlifting', 'fuerza', 'PR', 'press-banca']
  },
  {
    id: '3',
    user: {
      name: 'Ana Martínez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      level: 5,
      verified: false,
      specialty: 'Yoga & Pilates'
    },
    content: '¿Alguien tiene recomendaciones para mejorar la flexibilidad? Estoy trabajando en splits y necesito consejos. 🧘‍♀️',
    type: 'question',
    likes: 18,
    comments: 25,
    shares: 3,
    bookmarks: 12,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    tags: ['yoga', 'flexibilidad', 'pilates', 'consejos']
  },
  {
    id: '4',
    user: {
      name: 'Coach Cesar Lugo',
      avatar: '/cesar.png',
      level: 15,
      verified: true,
      specialty: 'Entrenamiento Funcional'
    },
    content: 'Recordatorio diario: El progreso no es lineal, pero cada entrenamiento te acerca a tus metas. ¡Mantén la consistencia! 💫 #motivacion #consistencia',
    type: 'motivation',
    likes: 156,
    comments: 32,
    shares: 45,
    bookmarks: 67,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    tags: ['motivacion', 'consistencia', 'progreso', 'coach']
  },
  {
    id: '5',
    user: {
      name: 'Luis Hernández',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      level: 6,
      verified: false,
      specialty: 'CrossFit'
    },
    content: 'WOD de hoy completado! 💪 20 min AMRAP: 10 burpees, 15 wall balls, 20 box jumps. Me siento increíble!',
    type: 'workout',
    workoutData: {
      duration: 20,
      calories: 450,
      exercises: ['Burpees', 'Wall Balls', 'Box Jumps'],
      difficulty: 'Intermedio'
    },
    likes: 67,
    comments: 12,
    shares: 8,
    bookmarks: 9,
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    tags: ['crossfit', 'wod', 'funcional', 'cardio']
  }
];

const CommunityPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [showComments, setShowComments] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const handleBookmark = (postId: string) => {
    const newBookmarkedPosts = new Set(bookmarkedPosts);
    if (newBookmarkedPosts.has(postId)) {
      newBookmarkedPosts.delete(postId);
    } else {
      newBookmarkedPosts.add(postId);
    }
    setBookmarkedPosts(newBookmarkedPosts);
  };

  const toggleComments = (postId: string) => {
    const newShowComments = new Set(showComments);
    if (newShowComments.has(postId)) {
      newShowComments.delete(postId);
    } else {
      newShowComments.add(postId);
    }
    setShowComments(newShowComments);
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Ayer';
    return `Hace ${diffInDays}d`;
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'workout': return Activity;
      case 'achievement': return Trophy;
      case 'motivation': return TrendingUp;
      case 'question': return MessageCircle;
      case 'milestone': return Target;
      case 'challenge': return Zap;
      default: return Activity;
    }
  };

  const filteredPosts = mockPosts.filter(post => {
    const matchesFilter = activeFilter === 'all' || post.type === activeFilter;
    const matchesSearch = searchQuery === '' || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fitness-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Feed 24/7
              </h1>
              <p className="text-blue-200">
                Conecta, comparte y motívate con la comunidad fitness
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-blue-200">
                <Users className="w-5 h-5" />
                <span className="font-semibold text-white">2,847</span>
                <span>miembros activos</span>
              </div>
              <ModernButton
                onClick={() => {}}
                variant="primary"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Post
              </ModernButton>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Todo', icon: Activity },
              { id: 'workout', label: 'Entrenamientos', icon: Activity },
              { id: 'achievement', label: 'Logros', icon: Trophy },
              { id: 'motivation', label: 'Motivación', icon: TrendingUp },
              { id: 'question', label: 'Preguntas', icon: MessageCircle },
              { id: 'milestone', label: 'Hitos', icon: Target }
            ].map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'glass text-blue-200 hover:bg-blue-900/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{filter.label}</span>
                </button>
              );
            })}
          </div>

          {/* Búsqueda */}
          <div className="relative mt-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar posts, usuarios, hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-glass w-full pl-12 pr-4 py-3 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Feed de posts */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredPosts.map((post, index) => {
              const PostIcon = getPostIcon(post.type);
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="fitness-card p-6"
                >
                  {/* Header del post */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={post.user.avatar}
                          alt={post.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {post.user.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{post.user.name}</h3>
                          <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full">
                            Nivel {post.user.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-200">
                          <PostIcon className="w-4 h-4" />
                          <span>{getTimeAgo(post.timestamp)}</span>
                          {post.location && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{post.location}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-blue-200 hover:bg-blue-900/30 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Contenido del post */}
                  <div className="mb-4">
                    <p className="text-white leading-relaxed">{post.content}</p>
                    
                    {/* Datos del entrenamiento */}
                    {post.workoutData && (
                      <div className="mt-4 p-4 glass rounded-xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {Math.round(post.workoutData.duration / 60)}
                            </div>
                            <div className="text-xs text-blue-200">minutos</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {post.workoutData.calories}
                            </div>
                            <div className="text-xs text-blue-200">calorías</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {post.workoutData.exercises.length}
                            </div>
                            <div className="text-xs text-blue-200">ejercicios</div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {post.workoutData.difficulty}
                            </div>
                            <div className="text-xs text-blue-200">dificultad</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Datos del logro */}
                    {post.achievementData && (
                      <div className="mt-4 p-4 glass rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{post.achievementData.badge}</div>
                          <div>
                            <h4 className="font-semibold text-white">{post.achievementData.title}</h4>
                            <p className="text-sm text-blue-200">{post.achievementData.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Zap className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm text-yellow-400">+{post.achievementData.xpReward} XP</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Media */}
                    {post.media && (
                      <div className="mt-4">
                        <img
                          src={post.media.url}
                          alt="Post media"
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-blue-900/30 text-blue-200 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Acciones del post */}
                  <div className="flex items-center justify-between pt-4 border-t border-blue-900/30">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-blue-200 hover:text-red-400 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-2 text-blue-200 hover:text-blue-400 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-blue-200 hover:text-green-400 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className="flex items-center gap-2 text-blue-200 hover:text-yellow-400 transition-colors"
                    >
                      <Bookmark className="w-5 h-5" />
                      <span className="text-sm">{post.bookmarks}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 