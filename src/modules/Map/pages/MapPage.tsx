// src/modules/Map/pages/MapPage.tsx
import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './MapPage.module.css';

const MapPage: React.FC = () => {
  const handleAction = (action: string, file?: File) => {
    {
      console.warn(`Нет обработчика для действия: ${action}`);
    }
  };

  return (
    <div className={styles.mapPageContainer}>
      <Navbar pageType='map' onAction={handleAction} />
      <div className={styles.mapWrapper}></div>
    </div>
  );
};

export default MapPage;
