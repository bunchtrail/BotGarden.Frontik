import { useState } from 'react';
import InputField from '../Field/InputField';
import ErrorMessage from '../Misc/ErrorMessage';

interface LoginFormProps {
  onSucces: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSucces }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      onSucces();
    } catch (error) {
      setError('Ошибка авторизации');
    }
  };
  return (
    <form className='login-form' onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}
      <InputField
        label='Почта'
        type='text'
        id='email'
        value={email}
        onChange={setEmail}
      />
      <InputField
        label='Пароль'
        type='password'
        id='password'
        value={password}
        onChange={setPassword}
      />
      <button type='submit' className='login-button'>
        Вход
      </button>
    </form>
  );
};
