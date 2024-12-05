import React from 'react';
import styles from './Navbar.module.css';
import { useFormActions } from '../../hooks/useFormActions';

interface MobileActionsProps {
  isOpen: boolean;
}

const MobileActions: React.FC<MobileActionsProps> = ({ isOpen }) => {
  const { handleSave, handleReset } = useFormActions();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.mobileActions}>
      <button className={styles.saveButton} type="button" onClick={handleSave}>
        <i className={`fas fa-save ${styles.saveIcon}`} /> Сохранить
      </button>
      <button className={styles.resetButton} type="button" onClick={handleReset}>
        <i className={`fas fa-undo ${styles.resetIcon}`} /> Сбросить
      </button>
    </div>
  );
};

export default MobileActions;
