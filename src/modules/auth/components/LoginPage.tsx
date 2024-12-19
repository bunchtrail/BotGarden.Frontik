// src/modules/Auth/pages/LoginPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AuthenticationError } from '../../../utils/errors';
import LoginContainer from '../components/LoginContainer';
import LoginForm from '../components/LoginForm';
import './login.css';

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
      return { error: false };
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        const safeMessage = error.type === 'unauthorized' 
          ? 'Неверный email или пароль'
          : 'Произошла ошибка при входе в систему. Пожалуйста, попробуйте позже';

        return {
          error: true,
          message: safeMessage,
          type: (error.type || 'unauthorized') as 'unauthorized' | 'general',
        };
      }
      return {
        error: true,
        message: 'Произошла ошибка при входе в систему. Пожалуйста, попробуйте позже',
        type: 'general' as const,
      };
    }
  };

  return (
    <LoginContainer>
      <h1>Добро пожаловать</h1>
      <LoginForm onSuccess={handleLoginSuccess} />
    </LoginContainer>
  );
}

export default Login;
