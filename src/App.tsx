import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Login from './pages/Login';
import { isAuthenticated } from './utils/helpers';
import HomePage from './pages/homePage';
// Компонент для защищенных маршрутов
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to='/login' />; // Если пользователь не авторизован, перенаправляем на страницу входа
  }
  return children;
};
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Маршрут для страницы авторизации */}
          <Route path='/login' element={<Login />} />

          {/* Защищённый маршрут для домашней страницы */}
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
