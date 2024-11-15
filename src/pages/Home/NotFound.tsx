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
      <p>Страница не найдена</p>
      <button onClick={handleGoBack}>Назад</button>
    </div>
  );
};

export default NotFound;
