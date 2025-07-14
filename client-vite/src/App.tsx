import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import NavBar from './components/NavBar';
import DashboardPage from './pages/Dashboard/DashboardPage';
import WorkoutsPage from './pages/Workouts/WorkoutsPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import NutritionPage from './pages/Nutrition/NutritionPage';
import ProgressPage from './pages/Progress/ProgressPage';
import ProfilePage from './pages/Profile/ProfilePage';
import PlanPage from './pages/Plan/PlanPage';
import TrofeosPage from './pages/Trofeos/TrofeosPage';
import TrophyPage from './pages/Gamification/TrophyPage';
import NotFoundPage from './pages/NotFoundPage';
import CustomToaster from './components/Toast';
import Particles from './components/Particles';
import EntrenamientoPage from './pages/Entrenamiento/EntrenamientoPage';
import EntrenamientosHistPage from './pages/Entrenamientos/EntrenamientosHistPage';
import RegistrosPage from './pages/Registros/RegistrosPage';
import GamificationPage from './pages/Gamification/GamificationPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import CommunityPage from './pages/Community/CommunityPage';
import WearablesPage from './pages/Wearables/WearablesPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div>
            <NavBar />
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
              <main className="flex-1 lg:ml-64">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/workouts" element={<WorkoutsPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/nutrition" element={<NutritionPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/plan" element={<PlanPage />} />
                  <Route path="/trofeos" element={<TrofeosPage />} />
                  <Route path="/trophies" element={<TrophyPage />} />
                  <Route path="/entrenamiento" element={<EntrenamientoPage />} />
                  <Route path="/entrenamientos" element={<EntrenamientosHistPage />} />
                  <Route path="/registros" element={<RegistrosPage />} />
                  <Route path="/gamification" element={<GamificationPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/wearables" element={<WearablesPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <CustomToaster />
              <Particles 
                className="opacity-30"
                particleCount={30}
                color="#3b82f6"
                speed={0.5}
              />
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 