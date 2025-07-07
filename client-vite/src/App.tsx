import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import DashboardPage from './pages/Dashboard/DashboardPage';
import WorkoutsPage from './pages/Workouts/WorkoutsPage';
import ProgressPage from './pages/Progress/ProgressPage';
import ProfilePage from './pages/Profile/ProfilePage';
import PlanPage from './pages/Plan/PlanPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import NutritionPage from './pages/Nutrition/NutritionPage';
import GamificationPage from './pages/Gamification/GamificationPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import CommunityPage from './pages/Community/CommunityPage';
import WearablesPage from './pages/Wearables/WearablesPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import EntrenamientoPage from './pages/Entrenamiento/EntrenamientoPage';
import EntrenamientosHistPage from './pages/Entrenamientos/EntrenamientosHistPage';
import TrofeosPage from './pages/Trofeos/TrofeosPage';
import RegistrosPage from './pages/Registros/RegistrosPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-50">
          <NavBar />
          <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/workouts" element={<WorkoutsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/plan" element={<PlanPage />} />
              <Route path="/gamification" element={<GamificationPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/wearables" element={<WearablesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/entrenamiento" element={<EntrenamientoPage />} />
              <Route path="/entrenamientos" element={<EntrenamientosHistPage />} />
              <Route path="/trofeos" element={<TrofeosPage />} />
              <Route path="/registros" element={<RegistrosPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 