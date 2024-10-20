import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/helpers';
import LoginContainer from '../../components/LoginPage/LoginContainer';
import LoginForm from '../../components/LoginPage/LoginForm';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    window.location.href = '/home';
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
