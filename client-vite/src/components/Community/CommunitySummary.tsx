import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Trophy, 
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users2,
  MessageSquare,
  Target,
  Award
} from 'lucide-react';
import { AnimatedCard, AnimatedText } from '../Animations/AnimatedComponents';
import { PulseButton } from '../Animations/MicroInteractions';

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

interface CommunitySummaryProps {
  posts: Post[];
  users: User[];
  challenges: Challenge[];
  onViewDetails: () => void;
  onCreatePost: () => void;
}

const CommunitySummary: React.FC<CommunitySummaryProps> = ({
  posts,
  users,
  challenges,
  onViewDetails,
  onCreatePost
}) => {
  const recentPosts = posts.slice(0, 2);
  const topUsers = users.slice(0, 3);
  const activeChallenges = challenges.filter(c => c.isJoined).slice(0, 2);

  const communityStats = {
    totalPosts: posts.length,
    totalUsers: users.length,
    activeChallenges: challenges.filter(c => c.isJoined).length,
    totalLikes: posts.reduce((sum, post) => sum + post.likes, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header Resumido */}
      <AnimatedText delay={0.1}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Resumen de Comunidad</h2>
          <p className="text-gray-300">Conecta, comparte y motiva con otros fitness lovers</p>
        </div>
      </AnimatedText>

      {/* Estadísticas de la Comunidad */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Posts', value: communityStats.totalPosts, icon: MessageSquare, color: 'text-blue-400' },
          { label: 'Usuarios', value: communityStats.totalUsers, icon: Users, color: 'text-pink-400' },
          { label: 'Desafíos Activos', value: communityStats.activeChallenges, icon: Trophy, color: 'text-yellow-400' },
          { label: 'Likes Totales', value: communityStats.totalLikes, icon: Heart, color: 'text-red-400' }
        ].map((stat, index) => (
          <AnimatedCard key={stat.label} delay={0.2 + index * 0.1}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 text-center">
              <div className={`${stat.color} mb-2`}>
                <stat.icon className="w-6 h-6 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Posts Recientes */}
      <AnimatedCard delay={0.4}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Posts Recientes</h3>
          </div>
          
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <div key={post.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                <img
                  src={post.userAvatar}
                  alt={post.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white text-sm">{post.userName}</h4>
                    <span className="text-xs text-gray-400">{post.userLevel}</span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>📅 {post.timestamp.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <PulseButton
              onClick={onViewDetails}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
            >
              Ver Todos los Posts
            </PulseButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Usuarios Destacados */}
      <AnimatedCard delay={0.5}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users2 className="w-6 h-6 text-pink-400" />
            <h3 className="text-xl font-semibold text-white">Usuarios Destacados</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topUsers.map((user, index) => (
              <div key={user.id} className="text-center p-3 bg-white/5 rounded-xl">
                <div className="relative mb-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                  {user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{user.name}</h4>
                <p className="text-xs text-gray-300 mb-2">{user.level}</p>
                <div className="text-xs text-gray-400">
                  <div>{user.followers} seguidores</div>
                  <div>{user.achievements} logros</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <PulseButton
              onClick={onViewDetails}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
            >
              Descubrir Más Usuarios
            </PulseButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Desafíos Activos */}
      {activeChallenges.length > 0 && (
        <AnimatedCard delay={0.6}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">Tus Desafíos Activos</h3>
            </div>
            
            <div className="space-y-3">
              {activeChallenges.map((challenge, index) => (
                <div key={challenge.id} className="p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">{challenge.title}</h4>
                    <span className="text-xs text-yellow-400">{challenge.daysLeft} días</span>
                  </div>
                  <p className="text-gray-300 text-xs mb-2">{challenge.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Progreso:</span>
                      <div className="w-16 bg-white/20 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-white">{challenge.progress}%</span>
                    </div>
                    <span className="text-xs text-yellow-400">{challenge.reward}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <PulseButton
                onClick={onViewDetails}
                className="w-full px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
              >
                Ver Todos los Desafíos
              </PulseButton>
            </div>
          </div>
        </AnimatedCard>
      )}

      {/* Acciones Rápidas */}
      <AnimatedCard delay={0.7}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PulseButton
              onClick={onCreatePost}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-pink-400" />
                <span className="text-white font-medium">Crear Post</span>
              </div>
              <ArrowRight className="w-4 h-4 text-pink-400" />
            </PulseButton>
            
            <PulseButton
              onClick={onViewDetails}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Explorar Comunidad</span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </PulseButton>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default CommunitySummary;
