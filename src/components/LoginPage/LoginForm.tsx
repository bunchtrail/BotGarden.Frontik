// src/components/LoginPage/LoginForm.tsx
import { useState } from 'react';
import ErrorMessage from '../Misc/ErrorMessage';
import Button from '../Misc/Button';
import '../../assets/styles/login.css'; // Импорт стилей

interface LoginFormProps {
  onSuccess: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSuccess(email, password);
    } catch (error) {
      setError('Ошибка авторизации');
    }
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}
      <div className='form-group'>
        <label htmlFor='email'>Почта</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Пароль</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type='submit' className='login-button'>
        Вход
      </Button>
    </form>
  );
};

export default LoginForm;
