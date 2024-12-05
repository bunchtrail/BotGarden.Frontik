import React from 'react';
import styles from './Navbar.module.css';
import { useFormActions } from '../../hooks/useFormActions';

const ButtonGroup: React.FC = () => {
  const { handleSave, handleReset } = useFormActions();

  return (
    <div className={styles.buttonGroup}>
      <button className={styles.saveButton} type="button" onClick={handleSave}>
        <i className={`fas fa-save ${styles.saveIcon}`} /> Сохранить
      </button>
      <button className={styles.resetButton} type="button" onClick={handleReset}>
        <i className={`fas fa-undo ${styles.resetIcon}`} /> Сбросить
      </button>
    </div>
  );
};

export default ButtonGroup;
