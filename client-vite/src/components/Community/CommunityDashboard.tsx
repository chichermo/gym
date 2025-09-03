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
  X
} from 'lucide-react';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../Animations/MicroInteractions';

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

  useEffect(() => {
    initializeData();
  }, []);

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
        content: '¡Nuevo récord personal! 10km en 45 minutos 🏃‍♀️ La constancia es la clave del éxito.',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
        },
        likes: 42,
        comments: 12,
        shares: 7,
        isLiked: true,
        isBookmarked: true,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        location: 'Parque Central',
        tags: ['#running', '#récord', '#constancia'],
        privacy: 'public'
      },
      {
        id: '3',
        userId: 'user3',
        userName: 'Miguel Yoga',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        userLevel: 'Nivel 12',
        content: 'Sesión de yoga matutina completada 🧘‍♂️ Paz mental y flexibilidad física. ¿Practicas yoga?',
        media: {
          type: 'video',
          url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        },
        likes: 18,
        comments: 5,
        shares: 2,
        isLiked: false,
        isBookmarked: false,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        tags: ['#yoga', '#paz', '#flexibilidad'],
        privacy: 'friends'
      }
    ];

    // Mock data for users
    const mockUsers: User[] = [
      {
        id: 'user1',
        name: 'Carlos Fitness',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        level: 'Nivel 15',
        followers: 1247,
        following: 892,
        posts: 156,
        achievements: 23,
        isFollowing: true,
        isOnline: true,
        lastActive: new Date(),
        bio: 'Entrenador personal certificado. Amante del fitness y la vida saludable 💪',
        location: 'Madrid, España',
        interests: ['Fuerza', 'Cardio', 'Nutrición']
      },
      {
        id: 'user2',
        name: 'Ana Runner',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        level: 'Nivel 8',
        followers: 892,
        following: 445,
        posts: 89,
        achievements: 15,
        isFollowing: false,
        isOnline: false,
        lastActive: new Date(Date.now() - 30 * 60 * 1000),
        bio: 'Corredora amateur. Compitiendo en mi primera maratón este año 🏃‍♀️',
        location: 'Barcelona, España',
        interests: ['Running', 'Maratón', 'Trail']
      },
      {
        id: 'user3',
        name: 'Miguel Yoga',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        level: 'Nivel 12',
        followers: 567,
        following: 234,
        posts: 67,
        achievements: 18,
        isFollowing: true,
        isOnline: true,
        lastActive: new Date(),
        bio: 'Instructor de yoga. Enseñando paz y equilibrio desde hace 5 años 🧘‍♂️',
        location: 'Valencia, España',
        interests: ['Yoga', 'Meditación', 'Bienestar']
      }
    ];

    // Mock data for challenges
    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: 'Desafío de 30 Días',
        description: 'Entrena todos los días durante 30 días consecutivos',
        type: 'streak',
        participants: 1247,
        daysLeft: 15,
        reward: 'Insignia de Constancia',
        isJoined: true,
        isCompleted: false,
        progress: 50
      },
      {
        id: '2',
        title: 'Foto del Entrenamiento',
        description: 'Comparte una foto de tu entrenamiento de hoy',
        type: 'photo',
        participants: 892,
        daysLeft: 3,
        reward: '50 Puntos de Experiencia',
        isJoined: false,
        isCompleted: false,
        progress: 0
      },
      {
        id: '3',
        title: 'Video de Ejercicio',
        description: 'Graba un video ejecutando tu ejercicio favorito',
        type: 'video',
        participants: 445,
        daysLeft: 7,
        reward: 'Moneda Virtual x100',
        isJoined: true,
        isCompleted: true,
        progress: 100
      }
    ];

    setPosts(mockPosts);
    setUsers(mockUsers);
    setChallenges(mockChallenges);
    setCurrentUser(mockUsers[0]); // Set current user
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
    showNotification('Post actualizado', 'success');
  };

  const handleBookmarkPost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
    showNotification('Post guardado', 'success');
  };

  const handleFollowUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: !user.isFollowing, followers: user.isFollowing ? user.followers - 1 : user.followers + 1 }
        : user
    ));
    showNotification('Usuario actualizado', 'success');
  };

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, isJoined: !challenge.isJoined }
        : challenge
    ));
    showNotification('Desafío actualizado', 'success');
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      showNotification('El contenido no puede estar vacío', 'error');
      return;
    }

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

    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setShowCreatePost(false);
    showNotification('Post creado exitosamente', 'success');
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `hace ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `hace ${Math.floor(diffInMinutes / 60)}h`;
    return `hace ${Math.floor(diffInMinutes / 1440)}d`;
  };

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case 'public': return <Globe className="w-4 h-4" />;
      case 'friends': return <Users className="w-4 h-4" />;
      case 'private': return <Lock className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Zap className="w-5 h-5" />;
      case 'photo': return <Camera className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'streak': return <TrendingUp className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Comunidad BRO FIT</h1>
              <p className="text-gray-300">Conecta, comparte y motiva con otros fitness lovers</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <AnimatedButton delay={0.2} asButton={false}>
              <PulseButton
                onClick={() => setShowCreatePost(true)}
                className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Crear Post
                </div>
              </PulseButton>
            </AnimatedButton>
          </div>
        </div>
      </AnimatedText>

      {/* Search and Filter */}
      <AnimatedCard delay={0.15}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuarios, posts, desafíos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
            >
              <option value="all">Todos</option>
              <option value="workouts">Entrenamientos</option>
              <option value="photos">Fotos</option>
              <option value="videos">Videos</option>
            </select>
          </div>
        </div>
      </AnimatedCard>

      {/* Tabs */}
      <AnimatedCard delay={0.2}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 mb-6">
          <div className="flex space-x-2">
            {[
              { id: 'feed', label: 'Feed', icon: <Users className="w-4 h-4" /> },
              { id: 'discover', label: 'Descubrir', icon: <Search className="w-4 h-4" /> },
              { id: 'challenges', label: 'Desafíos', icon: <Trophy className="w-4 h-4" /> },
              { id: 'friends', label: 'Amigos', icon: <UserPlus className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Content based on active tab */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <AnimatedCard key={post.id} delay={0.3 + index * 0.1}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.userAvatar}
                      alt={post.userName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{post.userName}</h3>
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                          {post.userLevel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        {getPrivacyIcon(post.privacy)}
                        <span>{formatTimeAgo(post.timestamp)}</span>
                        {post.location && (
                          <>
                            <MapPin className="w-3 h-3" />
                            <span>{post.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-white mb-3">{post.content}</p>
                  
                  {/* Workout Data */}
                  {post.workoutData && (
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 font-semibold">{post.workoutData.type}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-white font-semibold">{post.workoutData.duration} min</div>
                          <div className="text-gray-400">Duración</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{post.workoutData.calories} cal</div>
                          <div className="text-gray-400">Calorías</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{post.workoutData.exercises.length}</div>
                          <div className="text-gray-400">Ejercicios</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Media */}
                  {post.media && (
                    <div className="mb-3">
                      {post.media.type === 'image' ? (
                        <img
                          src={post.media.url}
                          alt="Post media"
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      ) : (
                        <video
                          src={post.media.url}
                          controls
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        post.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleBookmarkPost(post.id)}
                    className={`transition-colors ${
                      post.isBookmarked ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
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
                <div className="text-center mb-4">
                  <div className="relative inline-block">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-purple-500/30"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      user.isOnline ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mt-3">{user.name}</h3>
                  <span className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                    {user.level}
                  </span>
                </div>
                
                <div className="text-center mb-4">
                  <p className="text-gray-300 text-sm mb-3">{user.bio}</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{user.location}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div>
                    <div className="text-white font-semibold">{user.followers}</div>
                    <div className="text-xs text-gray-400">Seguidores</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{user.posts}</div>
                    <div className="text-xs text-gray-400">Posts</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{user.achievements}</div>
                    <div className="text-xs text-gray-400">Logros</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {user.interests.slice(0, 3).map((interest, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                
                <AnimatedButton delay={0.4} asButton={false}>
                  <PulseButton
                    onClick={() => handleFollowUser(user.id)}
                    className={`w-full px-4 py-2 rounded-xl transition-all duration-300 ${
                      user.isFollowing
                        ? 'bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30'
                        : 'bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30'
                    }`}
                  >
                    {user.isFollowing ? 'Dejar de Seguir' : 'Seguir'}
                  </PulseButton>
                </AnimatedButton>
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <AnimatedCard key={challenge.id} delay={0.3 + index * 0.1}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-500/20 rounded-xl">
                      {getChallengeIcon(challenge.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                      <p className="text-gray-300 text-sm">{challenge.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{challenge.daysLeft} días</div>
                    <div className="text-xs text-gray-500">{challenge.participants} participantes</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-300">Progreso</span>
                    <span className="text-white font-semibold">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">{challenge.reward}</span>
                  </div>
                  
                  <AnimatedButton delay={0.4} asButton={false}>
                    <PulseButton
                      onClick={() => handleJoinChallenge(challenge.id)}
                      className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                        challenge.isJoined
                          ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                          : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/30'
                      }`}
                    >
                      {challenge.isCompleted ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Completado
                        </div>
                      ) : challenge.isJoined ? (
                        'En Progreso'
                      ) : (
                        'Unirse'
                      )}
                    </PulseButton>
                  </AnimatedButton>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.filter(user => user.isFollowing).map((user, index) => (
            <AnimatedCard key={user.id} delay={0.3 + index * 0.1}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <div className="text-center mb-4">
                  <div className="relative inline-block">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-500/30"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      user.isOnline ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                  <h3 className="text-white font-semibold mt-2">{user.name}</h3>
                  <span className="text-xs text-gray-400">
                    {user.isOnline ? 'En línea' : `Última vez ${formatTimeAgo(user.lastActive)}`}
                  </span>
                </div>
                
                <div className="flex justify-center">
                  <AnimatedButton delay={0.4} asButton={false}>
                    <PulseButton className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Mensaje
                      </div>
                    </PulseButton>
                  </AnimatedButton>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <AnimatedCard delay={0.1}>
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Crear Post</h2>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-4">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="¿Qué quieres compartir con la comunidad?"
                  className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
                />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Image className="w-5 h-5" />
                    Foto
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Video className="w-5 h-5" />
                    Video
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Smile className="w-5 h-5" />
                    Emoji
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <select
                    value={selectedPrivacy}
                    onChange={(e) => setSelectedPrivacy(e.target.value as any)}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="public">Público</option>
                    <option value="friends">Amigos</option>
                    <option value="private">Privado</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <AnimatedButton delay={0.2} asButton={false}>
                  <PulseButton
                    onClick={() => setShowCreatePost(false)}
                    className="px-4 py-2 bg-gray-500/20 border border-gray-500/30 text-gray-300 rounded-xl hover:bg-gray-500/30 transition-all duration-300"
                  >
                    Cancelar
                  </PulseButton>
                </AnimatedButton>
                
                <AnimatedButton delay={0.3} asButton={false}>
                  <PulseButton
                    onClick={handleCreatePost}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-all duration-300"
                  >
                    Publicar
                  </PulseButton>
                </AnimatedButton>
              </div>
            </div>
          </AnimatedCard>
        </div>
      )}

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
    </div>
  );
};

export default CommunityDashboard;
