import React from 'react';
import { useExperience } from '../../contexts/ExperienceContext';
import { 
  Flame, 
  Trophy, 
  Target, 
  Camera, 
  User, 
  FileText,
  Activity,
  Clock,
  Plus
} from 'lucide-react';

const RecentActivities: React.FC = () => {
  const { getRecentActivities } = useExperience();
  const recentActivities = getRecentActivities(5);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'workout':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'cardio':
        return <Flame className="w-4 h-4 text-red-500" />;
      case 'class':
        return <Target className="w-4 h-4 text-green-500" />;
      case 'test':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'trophy':
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'perimeter':
        return <Target className="w-4 h-4 text-indigo-500" />;
      case 'photo':
        return <Camera className="w-4 h-4 text-pink-500" />;
      case 'form':
        return <FileText className="w-4 h-4 text-orange-500" />;
      case 'profile':
        return <User className="w-4 h-4 text-gray-500" />;
      default:
        return <Plus className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    return `Hace ${Math.floor(diffInMinutes / 1440)}d`;
  };

  if (recentActivities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          Actividad Reciente
        </h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">No hay actividad reciente</p>
          <p className="text-sm text-gray-400">¡Comienza a entrenar para ganar XP!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-gray-600" />
        Actividad Reciente
      </h3>
      
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.name}
              </p>
              {activity.description && (
                <p className="text-xs text-gray-500 truncate">
                  {activity.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                <Plus className="w-3 h-3" />
                <span className="text-xs font-medium">+{activity.xp} XP</span>
              </div>
              <span className="text-xs text-gray-400">
                {formatTimeAgo(activity.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {recentActivities.length >= 5 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Ver más actividad
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivities; 