import React, { useState } from 'react';
import styles from './AreaPathModal.module.css';

interface AreaPathModalProps {
  onSave: (path: string) => void;
  onCancel: () => void;
}

export const AreaPathModal: React.FC<AreaPathModalProps> = ({ onSave, onCancel }) => {
  const [path, setPath] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (path.trim()) {
      onSave(path.trim());
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Введите путь области</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="Например: Зона A/Сектор 1"
            className={styles.input}
            autoFocus
          />
          <div className={styles.buttons}>
            <button type="submit" className={styles.saveButton}>
              Сохранить
            </button>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};