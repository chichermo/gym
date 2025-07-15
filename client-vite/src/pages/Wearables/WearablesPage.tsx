import React from 'react';
import Wearables from '../../components/Wearables';
import { Watch, Activity, Zap } from 'lucide-react';

const WearablesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col lg:pl-64">
      {/* Banner Demo Mejorado */}
      <div className="w-full bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 border-b border-amber-300 py-3 px-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-700" />
          <span className="text-amber-800 text-sm font-semibold">Modo DEMO: Datos simulados de wearables</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header Mejorado */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Watch className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Wearables
              </h1>
              <p className="text-slate-600 mt-1">Conecta tus dispositivos fitness</p>
            </div>
          </div>
        </div>

        {/* Componente Wearables */}
        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
          <Wearables />
        </div>
      </main>
    </div>
  );
};

export default WearablesPage; 