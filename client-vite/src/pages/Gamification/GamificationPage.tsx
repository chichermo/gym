import React from 'react';
import AchievementSystem from '../../components/Gamification/AchievementSystem';

const GamificationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <AchievementSystem />
      </div>
    </div>
  );
};

export default GamificationPage; 