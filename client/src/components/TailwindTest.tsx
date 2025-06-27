import React from 'react';

const TailwindTest: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            🎉 ¡Tailwind CSS está funcionando!
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Colores</h3>
              <p className="text-blue-700">Los colores de Tailwind se están aplicando correctamente.</p>
            </div>
            
            <div className="bg-green-100 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Espaciado</h3>
              <p className="text-green-700">El sistema de espaciado de Tailwind funciona perfectamente.</p>
            </div>
            
            <div className="bg-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Responsive</h3>
              <p className="text-purple-700">El diseño responsive está funcionando como se esperaba.</p>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Botón de Prueba
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest; 