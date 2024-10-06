import { useState } from 'react';
import '../assets/styles/login.css';
import { login } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      window.location.href = '/home';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Ошибка авторизации');
    }
  };
  return (
    <div className='login-container'>
      <div className='login-page'>
        <h1>Авторизация</h1>
        {error && <p className='error-message'>{error}</p>}
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Почта:</label>
            <input
              type='text'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Пароль:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='login-button'>
            Вход
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
