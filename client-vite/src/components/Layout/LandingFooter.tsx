import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">BRO FIT</h3>
                <p className="text-sm text-gray-400">Transforma tu vida</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Tu compañero de entrenamiento personalizado. Llega a tu máximo potencial con tecnología avanzada y entrenadores expertos.
            </p>
            
            {/* Redes sociales */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook className="w-5 h-5 text-red-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500/30 rounded-full flex items-center justify-center transition-colors duration-200">
                <Twitter className="w-5 h-5 text-blue-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-500/20 hover:bg-pink-500/30 rounded-full flex items-center justify-center transition-colors duration-200">
                <Instagram className="w-5 h-5 text-pink-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600/20 hover:bg-red-600/30 rounded-full flex items-center justify-center transition-colors duration-200">
                <Youtube className="w-5 h-5 text-red-500" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/30 rounded-full flex items-center justify-center transition-colors duration-200">
                <Linkedin className="w-5 h-5 text-blue-500" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/entrenamiento-programa" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Entrenamiento
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Progreso
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Analíticas
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Comunidad
                </Link>
              </li>
              <li>
                <Link to="/coach-cesar-lugo" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Coach Cesar
                </Link>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Servicios</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/entrenamiento-programa" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Entrenamiento Personalizado
                </Link>
              </li>
              <li>
                <Link to="/nutrition" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Plan Nutricional
                </Link>
              </li>
              <li>
                <Link to="/ar" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Entrenamiento AR
                </Link>
              </li>
              <li>
                <Link to="/trophies" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Sistema de Logros
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Programación
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Analíticas Avanzadas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-400" />
                <span className="text-gray-400">info@brofit.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-green-400" />
                <span className="text-gray-400">123 Fitness Street, Ciudad</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 BRO FIT. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Política de Privacidad
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Términos de Servicio
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter; 