// src/App.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import AddPlantPage from './pages/AddPlant/AddPlant';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Misc/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const sectorMatch = location.pathname.match(/\/add-plant\/(\d+)/);
  const sectorId = sectorMatch ? parseInt(sectorMatch[1], 10) : undefined;

  return (
    <>
      {!isLoginPage && <Navbar sectorId={sectorId} />}
      <div className='app-container'>
        <Routes>
          {/* Маршрут для страницы авторизации */}
          <Route path='/login' element={<LoginPage />} />

          {/* Защищённые маршруты с динамическим sectorId */}
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-plant/:sectorId'
            element={
              <ProtectedRoute>
                <AddPlantPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/map'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Другие маршруты, если необходимо */}

          {/* 404 Страница */}
          <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
