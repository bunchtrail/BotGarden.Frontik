// src/modules/Auth/components/LoginForm.tsx

import React, { useState, useEffect } from 'react';
import ErrorMessage from '../../../components/Misc/ErrorMessage';
import Button from '../../../components/Button/Button';
import './login.css'; 

interface LoginFormProps {
  onSuccess: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{
    message: string;
    type?: 'general' | 'unauthorized';
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Скрыть общую ошибку при изменении полей
    if (error) {
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

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
    } catch (err: any) {
      if (err.type === 'unauthorized') {
        setError({
          message: 'Неавторизован. Пожалуйста, проверьте свои учетные данные.',
          type: 'unauthorized',
        });
      } else {
        setError({ message: 'Ошибка авторизации', type: 'general' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <form className='login-form' onSubmit={handleSubmit} noValidate>
      {error && (
        <ErrorMessage
          message={error.message}
          type={error.type}
          onDismiss={handleDismissError}
        />
      )}
      <div className='form-group'>
        <label htmlFor='email'>Почта</label>
        <input
          type='email'
          id='email'
          className={`input-field ${fieldErrors.email ? 'input-error' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          aria-invalid={fieldErrors.email ? 'true' : 'false'}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
        />
        {fieldErrors.email && (
          <div className='field-error' id='email-error'>
            {fieldErrors.email}
          </div>
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
          required
          aria-invalid={fieldErrors.password ? 'true' : 'false'}
          aria-describedby={fieldErrors.password ? 'password-error' : undefined}
        />
        {fieldErrors.password && (
          <div className='field-error' id='password-error'>
            {fieldErrors.password}
          </div>
        )}
      </div>
      <Button type='submit' className='login-button' disabled={loading}>
        {loading ? (
          <div className='spinner' aria-label='Загрузка'></div>
        ) : (
          'Вход'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
