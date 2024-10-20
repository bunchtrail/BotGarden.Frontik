// /src/App.tsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Компонент для защищённых маршрутов
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Маршрут для страницы авторизации */}
          <Route path='/login' element={<LoginPage />} />

          {/* Защищённый маршрут для домашней страницы */}
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <HomePage />
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
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
