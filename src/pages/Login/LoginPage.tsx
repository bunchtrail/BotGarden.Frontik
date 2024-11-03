// /src/pages/Login/LoginPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContainer from '../../components/LoginPage/LoginContainer';
import LoginForm from '../../components/LoginPage/LoginForm';
import { useAuth } from '../../contexts/AuthContext';
import '../../assets/styles/login.css';
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
      // Навигация происходит внутри метода login
    } catch (error) {
      // Обработка ошибок логина
    }
  };

  return (
    <LoginContainer>
      <div className='login-page'>
        <h1>Авторизация</h1>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </LoginContainer>
  );
}

export default Login;
