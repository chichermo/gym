import React from 'react';
import SocialFeed from '../../components/Social/SocialFeed';

const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 lg:pl-64">
      <div className="container mx-auto px-4 py-8">
        <SocialFeed />
      </div>
    </div>
  );
};

export default CommunityPage; 