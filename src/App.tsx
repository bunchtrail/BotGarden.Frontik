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
import './assets/styles/global.css'; // Импорт глобальных стилей

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <div className='app-container'>
        <Routes>
          {/* Маршрут для страницы авторизации */}
          <Route path='/login' element={<LoginPage />} />

          {/* Защищённые маршруты */}
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/flora'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/flowers'
            element={
              <ProtectedRoute>
                <HomePage />
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
          <Route
            path='/add-plant'
            element={
              <ProtectedRoute>
                <AddPlantPage sectorId={0} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-plant/dendrology'
            element={
              <ProtectedRoute>
                <AddPlantPage sectorId={1} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-plant/flora'
            element={
              <ProtectedRoute>
                <AddPlantPage sectorId={2} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-plant/flowers'
            element={
              <ProtectedRoute>
                <AddPlantPage sectorId={3} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-plant/map'
            element={
              <ProtectedRoute>
                <AddPlantPage sectorId={4} />
              </ProtectedRoute>
            }
          />

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