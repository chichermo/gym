import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import ThemeSelector from './components/ModernUI/ThemeSelector';
import MicroInteractions from './components/ModernUI/MicroInteractions';

// Páginas
import DashboardPage from './pages/Dashboard/DashboardPage';
import WorkoutsPage from './pages/Workouts/WorkoutsPage';
import ProgressPage from './pages/Progress/ProgressPage';
import ProfilePage from './pages/Profile/ProfilePage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import NutritionPage from './pages/Nutrition/NutritionPage';
import CommunityPage from './pages/Community/CommunityPage';
import GamificationPage from './pages/Gamification/GamificationPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import PlanPage from './pages/Plan/PlanPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Componentes de mejora
import ImmersiveDashboard from './components/Dashboard/ImmersiveDashboard';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
              {/* Header con selector de temas */}
              <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">F</span>
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        FitnessPro
                      </span>
                    </motion.div>

                    <div className="flex items-center gap-4">
                      <ThemeSelector />
                      <MicroInteractions
                        type="pulse"
                        size="sm"
                        color="#3b82f6"
                      />
                    </div>
                  </div>
                </div>
              </motion.header>

              {/* Contenido principal */}
              <div className="flex">
                {/* Sidebar */}
                <NavBar />

                {/* Contenido de la página */}
                <main className="flex-1 lg:pl-64">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <DashboardPage />
                        </motion.div>
                      } />
                      
                      <Route path="/dashboard" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ImmersiveDashboard
                            userData={{
                              stats: {
                                workouts: 24,
                                calories: 2840,
                                steps: 125000,
                                heartRate: 142
                              },
                              goals: {
                                weekly: 5,
                                monthly: 20,
                                progress: 75
                              },
                              activities: [
                                {
                                  id: '1',
                                  type: 'Cardio',
                                  duration: 45,
                                  calories: 320,
                                  date: '2024-01-15'
                                },
                                {
                                  id: '2',
                                  type: 'Fuerza',
                                  duration: 60,
                                  calories: 280,
                                  date: '2024-01-14'
                                }
                              ]
                            }}
                          />
                        </motion.div>
                      } />

                      <Route path="/workouts" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <WorkoutsPage />
                        </motion.div>
                      } />

                      <Route path="/progress" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ProgressPage />
                        </motion.div>
                      } />

                      <Route path="/analytics" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <AnalyticsPage />
                        </motion.div>
                      } />

                      <Route path="/nutrition" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <NutritionPage />
                        </motion.div>
                      } />

                      <Route path="/community" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CommunityPage />
                        </motion.div>
                      } />

                      <Route path="/gamification" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <GamificationPage />
                        </motion.div>
                      } />

                      <Route path="/calendar" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CalendarPage />
                        </motion.div>
                      } />

                      <Route path="/plan" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <PlanPage />
                        </motion.div>
                      } />

                      <Route path="/profile" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ProfilePage />
                        </motion.div>
                      } />

                      <Route path="/login" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <LoginPage />
                        </motion.div>
                      } />

                      <Route path="/register" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <RegisterPage />
                        </motion.div>
                      } />

                      <Route path="*" element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <NotFoundPage />
                        </motion.div>
                      } />
                    </Routes>
                  </AnimatePresence>
                </main>
              </div>

              {/* Footer mejorado */}
              <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 mt-auto"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        FitnessPro
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Tu compañero personal de fitness con tecnología avanzada.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                        Funcionalidades
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Entrenamientos Personalizados</li>
                        <li>Analytics Avanzados</li>
                        <li>Gamificación</li>
                        <li>Comunidad</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                        Soporte
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Centro de Ayuda</li>
                        <li>Contacto</li>
                        <li>FAQ</li>
                        <li>Feedback</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                        Legal
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Privacidad</li>
                        <li>Términos</li>
                        <li>Cookies</li>
                        <li>Licencias</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; 2024 FitnessPro. Todos los derechos reservados.</p>
                  </div>
                </div>
              </motion.footer>
            </div>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App; 