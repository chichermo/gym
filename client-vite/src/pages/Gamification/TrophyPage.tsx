import React from 'react';
import NavBar from '../../components/NavBar';
import TrophySystem from '../../components/TrophySystem';

const TrophyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col lg:pl-64">
      <NavBar />
      
      {/* Banner Demo */}
      <div className="w-full bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 border-b border-amber-300 py-3 px-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <span className="text-amber-800 text-sm font-semibold">Modo DEMO: Sistema de Trofeos</span>
        </div>
      </div>

      <TrophySystem />
    </div>
  );
};

export default TrophyPage; 