import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { AIProvider } from './contexts/AIContext';
import { SocialProvider } from './contexts/SocialContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { TrophiesProvider } from './contexts/TrophiesContext';
import { WorkoutsProvider } from './contexts/WorkoutsContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { ARProvider } from './contexts/ARContext';
import { ExperienceProvider } from './contexts/ExperienceContext';
import { NutritionProvider } from './contexts/NutritionContext';

// Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProfilePage from './pages/Profile/ProfilePage';
import ProgressPage from './pages/Progress/ProgressPage';
import WorkoutsPage from './pages/Workouts/WorkoutsPage';
import EntrenamientoYProgramaPage from './pages/EntrenamientoYPrograma/EntrenamientoYProgramaPage';
import ARPage from './pages/AR/ARPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import NutritionPage from './pages/Nutrition/NutritionPage';
import TrophiesPage from './pages/Trophies/TrophiesPage';
import CommunityPage from './pages/Community/CommunityPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import ProgramPage from './pages/Program/ProgramPage';
import PlanPage from './pages/Plan/PlanPage';
import EntrenamientosHistPage from './pages/Entrenamientos/EntrenamientosHistPage';
import RutinasPage from './pages/Rutinas/RutinasPage';
import CoachCesarLugoPage from './pages/CoachCesarLugoPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import LandingHeader from './components/Layout/LandingHeader';
import LandingHero from './components/Layout/LandingHero';
import LandingServices from './components/Layout/LandingServices';
import LandingTrainers from './components/Layout/LandingTrainers';
import LandingGallery from './components/Layout/LandingGallery';
import LandingContact from './components/Layout/LandingContact';
import LandingFooter from './components/Layout/LandingFooter';
import AIDashboard from './components/AI/AIDashboard';
import MobileSettings from './components/Mobile/MobileSettings';
import WearableDashboard from './components/Wearables/WearableDashboard';
import GamificationDashboard from './components/Gamification/GamificationDashboard';
import MainDashboard from './components/Dashboard/MainDashboard';
import ARDashboard from './components/AR/ARDashboard';
import CommunityDashboard from './components/Community/CommunityDashboard';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';

// Componente para manejar la lógica de mostrar/ocultar landing
const AppContent: React.FC = () => {
  const location = useLocation();

  // Rutas que son páginas internas (no landing)
  const internalPages = [
    '/login',
    '/register',
    '/profile',
    '/progress',
    '/workouts',
    '/entrenamiento-programa',
    '/ar',
    '/analytics',
    '/nutrition',
    '/trophies',
    '/community',
    '/calendar',
    '/program',
    '/plan',
    '/entrenamientos-hist',
    '/rutinas',
    '/coach-cesar-lugo',
    '/ai-dashboard',
    '/mobile-settings',
    '/wearables',
    '/gamification',
    '/dashboard',
    '/ar-dashboard',
    '/community-dashboard',
    '/analytics-dashboard'
  ];

  const isInternalPage = internalPages.includes(location.pathname);
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Efectos de fondo Glassmorphism */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Círculos de luz flotantes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Líneas de energía */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full opacity-10">
            <defs>
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 Q25,25 50,50 T100,50"
              stroke="url(#energyGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      {/* Header siempre visible */}
      <LandingHeader />
      
      {/* Contenido principal */}
      <main className="relative z-10">
        {/* Landing Page - Solo visible en la página principal */}
        {isHomePage && (
          <>
            <LandingHero />
            <LandingServices />
            <LandingTrainers />
            <LandingGallery />
            <LandingContact />
            <LandingFooter />
          </>
        )}

        {/* Páginas internas - Solo visible cuando se navega a rutas específicas */}
        {isInternalPage && (
          <div className="pt-20">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/workouts" element={<WorkoutsPage />} />
              <Route path="/entrenamiento-programa" element={<EntrenamientoYProgramaPage />} />
              <Route path="/ar" element={<ARPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/trophies" element={<TrophiesPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/program" element={<ProgramPage />} />
              <Route path="/plan" element={<PlanPage />} />
              <Route path="/entrenamientos-hist" element={<EntrenamientosHistPage />} />
              <Route path="/rutinas" element={<RutinasPage />} />
                              <Route path="/coach-cesar-lugo" element={<CoachCesarLugoPage />} />
              <Route path="/ai-dashboard" element={<AIDashboard />} />
              <Route path="/mobile-settings" element={<MobileSettings />} />
              <Route path="/wearables" element={<WearableDashboard />} />
              <Route path="/gamification" element={<GamificationDashboard />} />
              <Route path="/dashboard" element={<MainDashboard />} />
              <Route path="/ar-dashboard" element={<ARDashboard />} />
              <Route path="/community-dashboard" element={<CommunityDashboard />} />
              <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
            </Routes>
          </div>
        )}

        {/* Dashboard - Solo visible en la página principal */}
        {isHomePage && (
          <div className="dashboard-section">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        )}
      </main>
    </div>
  );
};

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
                                <AppContent />
                                <Toaster 
                                  position="top-right"
                                  toastOptions={{
                                    duration: 4000,
                                    style: {
                                      background: 'rgba(255, 255, 255, 0.95)',
                                      backdropFilter: 'blur(10px)',
                                      border: '1px solid rgba(0, 0, 0, 0.1)',
                                      borderRadius: '12px',
                                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                                    }
                                  }}
                                />
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