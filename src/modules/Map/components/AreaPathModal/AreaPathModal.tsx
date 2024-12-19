import React, { useEffect, useState } from 'react';
import styles from './AreaPathModal.module.css';

interface AreaPathModalProps {
  onSave: (path: string) => void;
  onCancel: () => void;
}

export const AreaPathModal: React.FC<AreaPathModalProps> = ({
  onSave,
  onCancel,
}) => {
  const [path, setPath] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (path.trim()) {
      setIsVisible(false);
      setTimeout(() => onSave(path.trim()), 300);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`${styles.modalOverlay} ${isVisible ? styles.visible : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`${styles.modal} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>Введите путь области</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder='Например: Зона A/Сектор 1'
              className={styles.input}
              autoFocus
            />
            <div className={styles.buttons}>
              <button
                type='button'
                onClick={handleClose}
                className={styles.cancelButton}
              >
                Отмена
              </button>
              <button type='submit' className={styles.saveButton}>
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
