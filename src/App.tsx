// /src/App.tsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import AddPlantPage from './pages/AddPlant/AddPlant';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Misc/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
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
            path='/add-plant'
            element={
              <ProtectedRoute>
                <AddPlantPage sectorId={0} />
              </ProtectedRoute>
            }
          />
          {/* Защищённый маршрут для корневой страницы */}
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* 404 Страница (опционально) */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
