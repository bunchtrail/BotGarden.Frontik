// src/modules/Auth/pages/LoginPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthenticationError } from '../../../utils/errors';
import LoginContainer from '../components/LoginContainer';
import LoginForm from '../components/LoginForm';
import './login.css'; // Обновленный путь

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        throw error; // Передаем структурированную ошибку в LoginForm
      }
      throw new AuthenticationError('Ошибка авторизации', 'general');
    }
  };

  return (
    <LoginContainer>
      <h1>Авторизация</h1>
      <LoginForm onSuccess={handleLoginSuccess} />
    </LoginContainer>
  );
}

export default Login;
