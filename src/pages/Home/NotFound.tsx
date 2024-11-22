// src/components/NotFound/NotFound.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/components/not-found.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <div className='not-found-container'>
      <h1>404</h1>
      <h2>Ой! Что-то пошло не так.</h2>
      <p>
        Страница, которую вы ищете, не существует. Возможно, она была перемещена
        или удалена.
      </p>
      <button onClick={handleGoBack}>Вернуться домой</button>
    </div>
  );
};

export default NotFound;
