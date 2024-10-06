import { useState } from 'react';
import '../assets/styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  return (
    <div className='login-container'>
      <div className='login-page'>
        <h1>Авторизация</h1>
        <form className='login-form'>
          <div className='form-group'>
            <label htmlFor='username'>Почта:</label>
            <input type='text' id='username' name='username' required />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Пароль:</label>
            <input type='password' id='password' name='password' required />
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
