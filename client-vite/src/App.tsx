import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
    '/coach-cesar-lugo'
  ];

  const isInternalPage = internalPages.includes(location.pathname);
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header siempre visible */}
      <LandingHeader />
      
      {/* Contenido principal */}
      <main>
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