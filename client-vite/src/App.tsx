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
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';

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
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 