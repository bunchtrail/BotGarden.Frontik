// src/components/LoginForm.tsx
import { useState } from 'react';
import ErrorMessage from '../Misc/ErrorMessage';
import Button from '../Misc/Button';
import '../../assets/styles/login.css';

interface LoginFormProps {
  onSuccess: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = 'Пожалуйста, введите почту';
    }

    if (!password) {
      errors.password = 'Пожалуйста, введите пароль';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setError(null);
    setLoading(true);
    try {
      await onSuccess(email, password);
    } catch (error) {
      setError('Ошибка авторизации');
    } finally {
      setLoading(false);
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
          className={`input-field ${fieldErrors.email ? 'input-error' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        {fieldErrors.email && (
          <div className='field-error'>{fieldErrors.email}</div>
        )}
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Пароль</label>
        <input
          type='password'
          id='password'
          className={`input-field ${fieldErrors.password ? 'input-error' : ''}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        {fieldErrors.password && (
          <div className='field-error'>{fieldErrors.password}</div>
        )}
      </div>
      <Button type='submit' className='login-button' disabled={loading}>
        {loading ? <div className='spinner'></div> : 'Вход'}
      </Button>
    </form>
  );
};

export default LoginForm;
