// src/pages/Login/LoginPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import LoginForm from './LoginForm';
import { useAuth } from '../contexts/AuthContext';
import './styles/login.css';
import { AuthenticationError } from '../../../utils/errors';

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
    } catch (error) {
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
