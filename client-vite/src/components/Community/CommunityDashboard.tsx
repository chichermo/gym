import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Camera, 
  Video, 
  MapPin, 
  Calendar,
  Trophy,
  TrendingUp,
  UserPlus,
  Settings,
  Search,
  Filter,
  MoreHorizontal,
  Send,
  Image,
  Smile,
  Hash,
  AtSign,
  Globe,
  Lock,
  Star,
  Flag,
  Bookmark,
  Eye,
  EyeOff,
  Zap,
  Sparkles,
  BarChart3,
  ArrowRight,
  Plus,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  ArrowLeft,
  Target,
  Award,
  Users2,
  MessageSquare
} from 'lucide-react';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../Animations/MicroInteractions';
import CommunityOnboarding from './CommunityOnboarding';
import CommunitySummary from './CommunitySummary';

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userLevel: string;
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  workoutData?: {
    type: string;
    duration: number;
    calories: number;
    exercises: string[];
  };
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  timestamp: Date;
  location?: string;
  tags: string[];
  privacy: 'public' | 'friends' | 'private';
}

interface User {
  id: string;
  name: string;
  avatar: string;
  level: string;
  followers: number;
  following: number;
  posts: number;
  achievements: number;
  isFollowing: boolean;
  isOnline: boolean;
  lastActive: Date;
  bio: string;
  location: string;
  interests: string[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'workout' | 'photo' | 'video' | 'streak';
  participants: number;
  daysLeft: number;
  reward: string;
  isJoined: boolean;
  isCompleted: boolean;
  progress: number;
}

const CommunityDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'feed' | 'discover' | 'challenges' | 'friends'>('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPrivacy, setSelectedPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'workouts' | 'photos' | 'videos'>('all');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);

  useEffect(() => {
    initializeData();
    // Mostrar onboarding si es la primera vez
    const hasSeenOnboarding = localStorage.getItem('community-onboarding-completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('community-onboarding-completed', 'true');
    showNotification('¡Comunidad configurada exitosamente!', 'success');
  };

  const handleViewDetails = () => {
    setShowDetailedView(true);
  };

  const handleBackToSummary = () => {
    setShowDetailedView(false);
  };

  const initializeData = () => {
    // Mock data for posts
    const mockPosts: Post[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Carlos Fitness',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        userLevel: 'Nivel 15',
        content: '¡Completé mi rutina de hoy! 💪 45 minutos de entrenamiento de fuerza. ¿Quién más está entrenando hoy?',
        workoutData: {
          type: 'Entrenamiento de Fuerza',
          duration: 45,
          calories: 320,
          exercises: ['Press de Banca', 'Sentadillas', 'Peso Muerto']
        },
        likes: 24,
        comments: 8,
        shares: 3,
        isLiked: false,
        isBookmarked: false,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        location: 'Gimnasio Central',
        tags: ['#fitness', '#fuerza', '#motivación'],
        privacy: 'public'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Ana Runner',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        userLevel: 'Nivel 8',
        content: '¡Nuevo récord personal! 🏃‍♀️ 10km en 45 minutos. La constancia es la clave del éxito.',
        workoutData: {
          type: 'Carrera',
          duration: 45,
          calories: 450,
          exercises: ['Carrera continua']
        },
        likes: 31,
        comments: 12,
        shares: 5,
        isLiked: true,
        isBookmarked: true,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        location: 'Parque Central',
        tags: ['#running', '#récord', '#motivación'],
        privacy: 'public'
      },
      {
        id: '3',
        userId: 'user3',
        userName: 'Miguel Yoga',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        userLevel: 'Nivel 12',
        content: 'Sesión de yoga matutina completa. 🧘‍♂️ Flexibilidad y paz mental. ¿Alguien más practica yoga?',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
        },
        likes: 18,
        comments: 6,
        shares: 2,
        isLiked: false,
        isBookmarked: false,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        location: 'Casa',
        tags: ['#yoga', '#flexibilidad', '#paz'],
        privacy: 'public'
      }
    ];

    // Mock data for users
    const mockUsers: User[] = [
      {
        id: 'user1',
        name: 'Carlos Fitness',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        level: 'Nivel 15',
        followers: 1240,
        following: 890,
        posts: 156,
        achievements: 23,
        isFollowing: true,
        isOnline: true,
        lastActive: new Date(),
        bio: 'Entrenador personal certificado. Pasión por el fitness y la motivación.',
        location: 'Madrid, España',
        interests: ['Fuerza', 'Cardio', 'Nutrición']
      },
      {
        id: 'user2',
        name: 'Ana Runner',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        level: 'Nivel 8',
        followers: 890,
        following: 567,
        posts: 89,
        achievements: 15,
        isFollowing: false,
        isOnline: false,
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        bio: 'Corredora amateur. Amo los retos y superar mis límites.',
        location: 'Barcelona, España',
        interests: ['Running', 'Triatlón', 'Trail']
      }
    ];

    // Mock data for challenges
    const mockChallenges: Challenge[] = [
      {
        id: 'challenge1',
        title: 'Desafío de 30 Días',
        description: 'Entrena 30 días consecutivos y gana puntos extra',
        type: 'streak',
        participants: 1240,
        daysLeft: 15,
        reward: '500 puntos + Insignia Especial',
        isJoined: true,
        isCompleted: false,
        progress: 50
      },
      {
        id: 'challenge2',
        title: 'Foto del Progreso',
        description: 'Comparte tu progreso físico con la comunidad',
        type: 'photo',
        participants: 890,
        daysLeft: 7,
        reward: '300 puntos + Insignia de Progreso',
        isJoined: false,
        isCompleted: false,
        progress: 0
      }
    ];

    setPosts(mockPosts);
    setUsers(mockUsers);
    setChallenges(mockChallenges);
    setCurrentUser(mockUsers[0]);
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
    showNotification('Post actualizado', 'success');
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        userId: currentUser?.id || 'user1',
        userName: currentUser?.name || 'Usuario',
        userAvatar: currentUser?.avatar || '',
        userLevel: currentUser?.level || 'Nivel 1',
        content: newPostContent,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
        timestamp: new Date(),
        tags: [],
        privacy: selectedPrivacy
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setShowCreatePost(false);
      showNotification('Post creado exitosamente', 'success');
    }
  };

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, isJoined: !challenge.isJoined }
        : challenge
    ));
    showNotification('Desafío actualizado', 'success');
  };

  const handleFollowUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: !user.isFollowing, followers: user.isFollowing ? user.followers - 1 : user.followers + 1 }
        : user
    ));
    showNotification('Usuario actualizado', 'success');
  };

  // Vista simplificada (por defecto)
  if (!showDetailedView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 p-6">
        {/* Header */}
        <AnimatedText delay={0.1}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
                <Users className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Comunidad</h1>
                <p className="text-gray-300">Conecta con otros fitness lovers</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <AnimatedButton delay={0.2} asButton={false}>
                <PulseButton
                  onClick={() => setShowOnboarding(true)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <Info className="w-4 h-4 text-white" />
                </PulseButton>
              </AnimatedButton>
              
              <AnimatedButton delay={0.3} asButton={false}>
                <PulseButton
                  onClick={() => setShowCreatePost(true)}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Crear Post
                  </div>
                </PulseButton>
              </AnimatedButton>
            </div>
          </div>
        </AnimatedText>

        {/* Vista Resumida */}
        <CommunitySummary
          posts={posts}
          users={users}
          challenges={challenges}
          onViewDetails={handleViewDetails}
          onCreatePost={() => setShowCreatePost(true)}
        />

        {/* Toast Notifications */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50">
            <Toast
              message={toastMessage}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          </div>
        )}

        {/* Onboarding */}
        <CommunityOnboarding
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={handleOnboardingComplete}
        />

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 rounded-3xl p-6 max-w-2xl w-full border border-white/20 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Crear Post</h2>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="¿Qué quieres compartir con la comunidad?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 resize-none h-32 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />

                <div className="flex items-center gap-4">
                  <select
                    value={selectedPrivacy}
                    onChange={(e) => setSelectedPrivacy(e.target.value as any)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="public">🌍 Público</option>
                    <option value="friends">👥 Amigos</option>
                    <option value="private">🔒 Privado</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <PulseButton
                    onClick={() => setShowCreatePost(false)}
                    className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    Cancelar
                  </PulseButton>
                  <PulseButton
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
                  >
                    Publicar
                  </PulseButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  // Vista detallada (cuando el usuario hace clic en "Ver Detalles")
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 p-6">
      {/* Header con botón de regreso */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <PulseButton
              onClick={handleBackToSummary}
              className="p-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5 text-white rotate-180" />
            </PulseButton>
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <Users className="w-8 h-8 text-pink-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Comunidad Completa</h1>
              <p className="text-gray-300">Todas las funcionalidades sociales</p>
            </div>
          </div>
        </div>
      </AnimatedText>

      {/* Tabs de Navegación */}
      <AnimatedCard delay={0.2}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 mb-6">
          <div className="flex gap-2">
            {[
              { id: 'feed', label: 'Feed', icon: MessageSquare },
              { id: 'discover', label: 'Descubrir', icon: Users2 },
              { id: 'challenges', label: 'Desafíos', icon: Trophy },
              { id: 'friends', label: 'Amigos', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-pink-500/20 border border-pink-500/30 text-pink-300'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Contenido según tab activo */}
      <div className="space-y-6">
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <AnimatedCard key={post.id} delay={0.3 + index * 0.1}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                  {/* Header del post */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.userAvatar}
                        alt={post.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-white">{post.userName}</h3>
                        <p className="text-sm text-gray-300">{post.userLevel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {post.timestamp.toLocaleDateString()}
                      </span>
                      <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Contenido del post */}
                  <p className="text-white mb-4">{post.content}</p>

                  {/* Media del post */}
                  {post.media && (
                    <div className="mb-4">
                      <img
                        src={post.media.url}
                        alt="Post media"
                        className="w-full rounded-2xl object-cover"
                      />
                    </div>
                  )}

                  {/* Datos del workout */}
                  {post.workoutData && (
                    <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-pink-400" />
                        <span className="font-semibold text-white">{post.workoutData.type}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-300">Duración:</span>
                          <p className="text-white">{post.workoutData.duration} min</p>
                        </div>
                        <div>
                          <span className="text-gray-300">Calorías:</span>
                          <p className="text-white">{post.workoutData.calories}</p>
                        </div>
                        <div>
                          <span className="text-gray-300">Ejercicios:</span>
                          <p className="text-white">{post.workoutData.exercises.length}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Acciones del post */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          post.isLiked ? 'text-pink-400' : 'text-gray-400 hover:text-pink-400'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <AnimatedCard key={user.id} delay={0.3 + index * 0.1}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto"
                      />
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <h3 className="font-semibold text-white mb-1">{user.name}</h3>
                    <p className="text-sm text-gray-300 mb-3">{user.level}</p>
                    <p className="text-sm text-gray-400 mb-4">{user.bio}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-white font-semibold">{user.followers}</p>
                        <p className="text-gray-400">Seguidores</p>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{user.posts}</p>
                        <p className="text-gray-400">Posts</p>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{user.achievements}</p>
                        <p className="text-gray-400">Logros</p>
                      </div>
                    </div>

                    <PulseButton
                      onClick={() => handleFollowUser(user.id)}
                      className={`w-full px-4 py-2 rounded-xl transition-all duration-300 ${
                        user.isFollowing
                          ? 'bg-gray-500/20 text-gray-300'
                          : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
                      }`}
                    >
                      {user.isFollowing ? 'Siguiendo' : 'Seguir'}
                    </PulseButton>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <AnimatedCard key={challenge.id} delay={0.3 + index * 0.1}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-white">{challenge.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{challenge.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Participantes:</span>
                      <span className="text-white">{challenge.participants}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Días restantes:</span>
                      <span className="text-white">{challenge.daysLeft}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Recompensa:</span>
                      <span className="text-yellow-400 text-sm">{challenge.reward}</span>
                    </div>
                  </div>

                  {challenge.isJoined && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progreso:</span>
                        <span className="text-white">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <PulseButton
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                      challenge.isJoined
                        ? 'bg-gray-500/20 text-gray-300'
                        : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
                    }`}
                  >
                    {challenge.isJoined ? 'Abandonar' : 'Unirse'}
                  </PulseButton>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="text-center py-12">
            <Users2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Gestionar Amigos</h3>
            <p className="text-gray-300">Próximamente: Funcionalidades avanzadas de gestión de amigos</p>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}

      {/* Onboarding */}
      <CommunityOnboarding
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default CommunityDashboard;
