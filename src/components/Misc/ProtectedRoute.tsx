// /src/components/Misc/ProtectedRoute.tsx
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>; // Можно вернуть лоадер или пустую страницу
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
