import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { AIProvider } from './contexts/AIContext';
import { SocialProvider } from './contexts/SocialContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { TrophiesProvider } from './contexts/TrophiesContext';
import { WorkoutsProvider } from './contexts/WorkoutsContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { ARProvider } from './contexts/ARContext';
import { ExperienceProvider } from './contexts/ExperienceContext';
import { NutritionProvider } from './contexts/NutritionContext';
import NavBar from './components/NavBar';

// Páginas
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProgressPage from './pages/Progress/ProgressPage';
import ProfilePage from './pages/Profile/ProfilePage';
import TrophiesPage from './pages/Trophies/TrophiesPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import NutritionPage from './pages/Nutrition/NutritionPage';
import CommunityPage from './pages/Community/CommunityPage';
import GamificationPage from './pages/Gamification/GamificationPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import PlanPage from './pages/Plan/PlanPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import EntrenamientoYProgramaPage from './pages/EntrenamientoYPrograma/EntrenamientoYProgramaPage';
import EntrenamientosHistPage from './pages/Entrenamientos/EntrenamientosHistPage';
import { ARWorkoutGuide } from './components/AR/ARWorkoutGuide';
import CoachCesarLugoPage from './pages/CoachCesarLugoPage';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <GamificationProvider>
          <AIProvider>
            <SocialProvider>
              <AnalyticsProvider>
                <ProfileProvider>
                  <TrophiesProvider>
                    <WorkoutsProvider>
                      <ProgressProvider>
                        <ARProvider>
                          <ExperienceProvider>
                            <NutritionProvider>
                              <Router>
                              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                                {/* Fondo animado con partículas */}
                                <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                                </div>

                                {/* Header moderno con glassmorphism */}
                                <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 lg:pl-64 transition-all duration-300">
                                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex items-center justify-between h-16 lg:h-20">
                                      <div className="flex items-center gap-4">
                                        <div className="relative">
                                          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                            <span className="text-white font-bold text-xl lg:text-2xl">F</span>
                                          </div>
                                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                                        </div>
                                        <div className="hidden sm:block">
                                          <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                            FitnessPro
                                          </h1>
                                          <p className="text-xs text-gray-400">Tu compañero de entrenamiento</p>
                                        </div>
                                      </div>
                                      
                                      {/* Indicadores de estado */}
                                      <div className="flex items-center gap-3">
                                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
                                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                          <span className="text-xs text-green-300 font-medium">Online</span>
                                        </div>
                                        
                                        {/* Notificaciones */}
                                        <button className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200">
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 17H9l-4.5 4.5V17z" />
                                          </svg>
                                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </header>

                                {/* Layout principal */}
                                <div className="flex min-h-screen pt-16 lg:pt-20">
                                  {/* Sidebar moderno */}
                                  <NavBar />

                                  {/* Contenido principal con glassmorphism */}
                                  <main className="flex-1 lg:pl-64">
                                    <div className="p-4 lg:p-6 lg:p-8">
                                      <div className="glass-strong rounded-3xl p-6 lg:p-8 min-h-[calc(100vh-8rem)]">
                                        <Routes>
                                          <Route path="/" element={<DashboardPage />} />
                                          <Route path="/dashboard" element={<DashboardPage />} />
                                          <Route path="/entrenamiento-programa" element={<EntrenamientoYProgramaPage />} />
                                          <Route path="/entrenamiento-programa/historial" element={<EntrenamientosHistPage />} />
                                          <Route path="/progress" element={<ProgressPage />} />
                                          <Route path="/profile" element={<ProfilePage />} />
                                          <Route path="/trophies" element={<TrophiesPage />} />
                                          <Route path="/analytics" element={<AnalyticsPage />} />
                                          <Route path="/nutrition" element={<NutritionPage />} />
                                          <Route path="/community" element={<CommunityPage />} />
                                          <Route path="/gamification" element={<GamificationPage />} />
                                          <Route path="/calendar" element={<CalendarPage />} />
                                          <Route path="/plan" element={<PlanPage />} />
                                          <Route path="/ar" element={<ARWorkoutGuide exerciseName="Sentadilla" />} />
                                          <Route path="/coach-cesar-lugo" element={<CoachCesarLugoPage />} />
                                          <Route path="/login" element={<LoginPage />} />
                                          <Route path="/register" element={<RegisterPage />} />
                                          <Route path="*" element={<NotFoundPage />} />
                                        </Routes>
                                      </div>
                                    </div>
                                  </main>
                                </div>

                                {/* Efectos de partículas flotantes */}
                                <div className="fixed inset-0 pointer-events-none">
                                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
                                  <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-ping"></div>
                                  <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-bounce"></div>
                                </div>
                              </div>
                            </Router>
                            </NutritionProvider>
                          </ExperienceProvider>
                        </ARProvider>
                      </ProgressProvider>
                    </WorkoutsProvider>
                  </TrophiesProvider>
                </ProfileProvider>
              </AnalyticsProvider>
            </SocialProvider>
          </AIProvider>
        </GamificationProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App; 