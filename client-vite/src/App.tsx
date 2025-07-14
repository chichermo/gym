import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import DashboardPage from './pages/Dashboard/DashboardPage';
import WorkoutsPage from './pages/Workouts/WorkoutsPage';
import ProgressPage from './pages/Progress/ProgressPage';
import ProfilePage from './pages/Profile/ProfilePage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import NutritionPage from './pages/Nutrition/NutritionPage';
import WearablesPage from './pages/Wearables/WearablesPage';
import CommunityPage from './pages/Community/CommunityPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import GamificationPage from './pages/Gamification/GamificationPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import CustomToaster from './components/Toast';
import Particles from './components/Particles';
import PlanPage from './pages/Plan/PlanPage';
import TrofeosPage from './pages/Trofeos/TrofeosPage';
import TrophyPage from './pages/Gamification/TrophyPage';
import EntrenamientoPage from './pages/Entrenamiento/EntrenamientoPage';
import EntrenamientosHistPage from './pages/Entrenamientos/EntrenamientosHistPage';
import RegistrosPage from './pages/Registros/RegistrosPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
            <NavBar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/workouts" element={<WorkoutsPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/nutrition" element={<NutritionPage />} />
                <Route path="/wearables" element={<WearablesPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/gamification" element={<GamificationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/plan" element={<PlanPage />} />
                <Route path="/trofeos" element={<TrofeosPage />} />
                <Route path="/trophies" element={<TrophyPage />} />
                <Route path="/entrenamiento" element={<EntrenamientoPage />} />
                <Route path="/entrenamientos" element={<EntrenamientosHistPage />} />
                <Route path="/registros" element={<RegistrosPage />} />
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
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 