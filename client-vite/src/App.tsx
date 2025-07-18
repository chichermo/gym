import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { AIContext, AIProvider } from './contexts/AIContext';
import { SocialProvider } from './contexts/SocialContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { TrophiesProvider } from './contexts/TrophiesContext';
import { WorkoutsProvider } from './contexts/WorkoutsContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { ARProvider } from './contexts/ARContext';
import NavBar from './components/NavBar';

// Páginas
import DashboardPage from './pages/Dashboard/DashboardPage';
import WorkoutsPage from './pages/Workouts/WorkoutsPage';
import ProgressPage from './pages/Progress/ProgressPage';
import ProfilePage from './pages/Profile/ProfilePage';
import TrophiesPage from './pages/Trophies/TrophiesPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import NutritionPage from './pages/Nutrition/NutritionPage';
import CommunityPage from './pages/Community/CommunityPage';
import GamificationPage from './pages/Gamification/GamificationPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import PlanPage from './pages/Plan/PlanPage';
import ARPage from './pages/AR/ARPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

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
                          <Router>
                            <div className="min-h-screen bg-gray-50">
                              {/* Header simple */}
                              <header className="bg-white shadow-sm border-b border-gray-200 lg:pl-64">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                  <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">F</span>
                                      </div>
                                      <span className="text-xl font-bold text-gray-900">
                                        FitnessPro
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </header>

                              {/* Contenido principal */}
                              <div className="flex">
                                {/* Sidebar */}
                                <NavBar />

                                {/* Contenido de la página */}
                                <main className="flex-1 lg:pl-64 pt-16">
                                  <div className="p-4 lg:p-6">
                                    <Routes>
                                      <Route path="/" element={<DashboardPage />} />
                                      <Route path="/dashboard" element={<DashboardPage />} />
                                      <Route path="/workouts" element={<WorkoutsPage />} />
                                      <Route path="/progress" element={<ProgressPage />} />
                                      <Route path="/profile" element={<ProfilePage />} />
                                      <Route path="/trophies" element={<TrophiesPage />} />
                                      <Route path="/analytics" element={<AnalyticsPage />} />
                                      <Route path="/nutrition" element={<NutritionPage />} />
                                      <Route path="/community" element={<CommunityPage />} />
                                      <Route path="/gamification" element={<GamificationPage />} />
                                      <Route path="/calendar" element={<CalendarPage />} />
                                      <Route path="/plan" element={<PlanPage />} />
                                      <Route path="/ar" element={<ARPage />} />
                                      <Route path="/login" element={<LoginPage />} />
                                      <Route path="/register" element={<RegisterPage />} />
                                      <Route path="*" element={<NotFoundPage />} />
                                    </Routes>
                                  </div>
                                </main>
                              </div>
                            </div>
                          </Router>
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