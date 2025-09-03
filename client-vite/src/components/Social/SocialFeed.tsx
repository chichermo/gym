import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Trophy,
  Target,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  Activity
} from 'lucide-react';

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userLevel: number;
  type: 'workout' | 'achievement' | 'milestone' | 'motivation';
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  workoutData?: {
    duration: number;
    calories: number;
    exercises: string[];
  };
  achievementData?: {
    title: string;
    description: string;
    xpReward: number;
  };
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  likes: number;
}

const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'María García',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      userLevel: 8,
      type: 'workout',
      content: '¡Acabo de completar mi entrenamiento de fuerza! 💪 Me siento increíble después de esta sesión.',
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      workoutData: {
        duration: 45,
        calories: 320,
        exercises: ['Press de banca', 'Sentadillas', 'Peso muerto', 'Press militar']
      }
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Carlos Rodríguez',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      userLevel: 12,
      type: 'achievement',
      content: '¡Desbloqueé el logro "Maestro de la Consistencia"! 🏆 30 días consecutivos entrenando.',
      likes: 42,
      comments: 15,
      shares: 7,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
      achievementData: {
        title: 'Maestro de la Consistencia',
        description: 'Entrena 30 días consecutivos',
        xpReward: 500
      }
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Ana Martínez',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      userLevel: 5,
      type: 'motivation',
      content: 'Recordatorio diario: El progreso no es lineal, pero cada entrenamiento te acerca a tus metas. ¡Mantén la consistencia! 💫',
      likes: 18,
      comments: 5,
      shares: 12,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
    }
  ]);

  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showComments, setShowComments] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
    
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
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
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours === 1) return 'Hace 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Hace 1 día';
    return `Hace ${diffInDays} días`;
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'workout': return Activity;
      case 'achievement': return Trophy;
      case 'milestone': return Target;
      case 'motivation': return TrendingUp;
      default: return Activity;
    }
  };

  const getPostColor = (type: string) => {
    switch (type) {
      case 'workout': return 'from-blue-500 to-indigo-600';
      case 'achievement': return 'from-yellow-500 to-orange-600';
      case 'milestone': return 'from-purple-500 to-pink-600';
      case 'motivation': return 'from-emerald-500 to-teal-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-700/50"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Comunidad Fitness
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Conecta con otros entusiastas del fitness
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Users className="w-5 h-5" />
              <span className="font-semibold">1,247</span>
              <span>miembros</span>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
              Crear Post
            </button>
          </div>
        </div>
      </motion.div>

      {/* Feed de posts */}
      <div className="space-y-6">
        <AnimatePresence>
          {posts.map((post, index) => {
            const PostIcon = getPostIcon(post.type);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-700/50"
              >
                {/* Header del post */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={post.userAvatar} 
                        alt={post.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        {post.userLevel}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">
                        {post.userName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <PostIcon className="w-4 h-4" />
                        <span className="capitalize">{post.type}</span>
                        <span>•</span>
                        <span>{getTimeAgo(post.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>

                {/* Contenido del post */}
                <div className="mb-4">
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    {post.content}
                  </p>
                  
                  {/* Datos específicos del tipo de post */}
                  {post.workoutData && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4 mb-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {post.workoutData.duration}min
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Duración
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {post.workoutData.calories}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Calorías
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {post.workoutData.exercises.length}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Ejercicios
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          Ejercicios realizados:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {post.workoutData.exercises.map((exercise, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-white/60 dark:bg-slate-700/60 rounded-full text-xs text-slate-700 dark:text-slate-300"
                            >
                              {exercise}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {post.achievementData && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-white">
                            {post.achievementData.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {post.achievementData.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                              +{post.achievementData.xpReward} XP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post content"
                      className="w-full h-64 object-cover rounded-2xl mb-4"
                    />
                  )}
                </div>

                {/* Acciones del post */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        likedPosts.has(post.id)
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      <span className="font-semibold">{post.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-semibold">{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-all duration-300">
                      <Share2 className="w-5 h-5" />
                      <span className="font-semibold">{post.shares}</span>
                    </button>
                  </div>
                </div>

                {/* Comentarios */}
                <AnimatePresence>
                  {showComments.has(post.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                            alt="User"
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Escribe un comentario..."
                              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                            />
                          </div>
                        </div>
                        
                        {/* Comentarios existentes */}
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <img 
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                              alt="User"
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm text-slate-800 dark:text-white">
                                    Carlos Rodríguez
                                  </span>
                                  <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Hace 1 hora
                                  </span>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                  ¡Increíble trabajo! 💪 Me inspiras a seguir entrenando.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialFeed; 