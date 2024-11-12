// src/components/Button/ButtonGroup_Main.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import styles from '../../assets/styles/components/Button/Button.module.css';

const ButtonGroup_Main: React.FC = () => {
  const navigate = useNavigate();

  const sectors = [
    { name: 'Дендрология', id: 1 },
    { name: 'Флора', id: 2 },
    { name: 'Цветоводство', id: 3 },
  ];

  return (
    <div className={styles.btnMain}>
      {sectors.map((sector) => (
        <Button
          key={sector.id}
          variant='primary'
          onClick={() => navigate(`/add-plant/${sector.id}`)}
        >
          {sector.name}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup_Main;
