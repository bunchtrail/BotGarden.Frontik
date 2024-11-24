// src/components/Navbar/ButtonGroup.tsx
import React from 'react';
import styles from '../../assets/styles/components/Navbar/Navbar.module.css';


const ButtonGroup: React.FC = () => {
  return (
    <div className={styles.buttonGroup}>
      <button className={styles.saveButton} type='button'>
        <i className={`fas fa-save ${styles.saveIcon}`} /> Сохранить
      </button>
      <button className={styles.resetButton} type='button'>
        <i className={`fas fa-undo ${styles.resetIcon}`} /> Сбросить
      </button>
    </div>
  );
};

export default ButtonGroup;
