// /src/components/LoginPage/LoginForm.tsx
import { useState } from 'react';
import InputField from '../Field/InputField';
import ErrorMessage from '../Misc/ErrorMessage';
import Button from '../Misc/Button';

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
      <InputField
        label='Почта'
        type='email'
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
      <Button type='submit' className='login-button'>
        Вход
      </Button>
    </form>
  );
};

export default LoginForm;
