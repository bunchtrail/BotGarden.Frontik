// src/components/Navbar/MobileActions.tsx
import React from 'react';
import styles from '../../assets/styles/components/Navbar/Navbar.module.css';


interface MobileActionsProps {
  isOpen: boolean;
}

const MobileActions: React.FC<MobileActionsProps> = ({ isOpen }) => {
  return (
    <div
      className={`${styles.mobileActions} ${isOpen ? styles.showActions : ''}`}
    >
      <button className={styles.mobileSaveButton} type='button'>
        <i className={`fas fa-save ${styles.saveIcon}`} /> Сохранить
      </button>
      <button className={styles.mobileResetButton} type='button'>
        <i className={`fas fa-undo ${styles.resetIcon}`} /> Сбросить
      </button>
    </div>
  );
};

export default MobileActions;
