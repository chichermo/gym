import React, { useState } from 'react';
import { useSocial } from '../../contexts/SocialContext';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share, 
  Bookmark,
  Trophy,
  Target,
  Calendar,
  Star,
  Plus
} from 'lucide-react';

const CommunityPage: React.FC = () => {
  const { posts, mentors, challenges, createPost, likePost, joinChallenge, bookMentor } = useSocial();
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      createPost(newPostContent);
      setNewPostContent('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Comunidad Fitness
          </h1>
          <p className="text-lg text-gray-600">
            Conecta con otros atletas, comparte logros y encuentra inspiración
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feed de la comunidad */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">T</span>
                </div>
                <input
                  type="text"
                  placeholder="¿Qué quieres compartir con la comunidad?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreatePost()}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{post.user.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {post.user.level}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button 
                          onClick={() => likePost(post.id)}
                          className={`flex items-center gap-1 transition-colors duration-200 ${
                            post.liked ? 'text-red-500' : 'hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500 transition-colors duration-200">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-500 transition-colors duration-200">
                          <Share className="w-4 h-4" />
                        </button>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mentores */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Mentores Disponibles
              </h3>
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{mentor.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{mentor.name}</h4>
                        <p className="text-sm text-gray-500">{mentor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-500">{mentor.experience}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{mentor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">${mentor.price}/sesión</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        mentor.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {mentor.available ? 'Disponible' : 'No disponible'}
                      </span>
                    </div>
                    <button 
                      onClick={() => bookMentor(mentor.id)}
                      disabled={!mentor.available}
                      className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        mentor.available 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {mentor.available ? 'Reservar Sesión' : 'No Disponible'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Desafíos */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Desafíos Activos
              </h3>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{challenge.participants} participantes</span>
                      <span>{challenge.daysLeft} días</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      Recompensa: {challenge.reward}
                    </div>
                    <button 
                      onClick={() => joinChallenge(challenge.id)}
                      className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        challenge.joined
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {challenge.joined ? 'Participando' : 'Unirse'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 