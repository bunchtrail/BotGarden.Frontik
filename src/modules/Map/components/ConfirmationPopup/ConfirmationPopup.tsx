import React, { useEffect, useState } from 'react';
import styles from './ConfirmationPopup.module.css';

interface ConfirmationPopupProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  position: L.Point;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title,
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  onConfirm,
  onCancel,
  position,
  type = 'danger',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.popup}`)) {
        handleCancel();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300);
  };

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(onConfirm, 300);
  };

  return (
    <div
      className={styles.container}
      style={{ left: position.x, top: position.y }}
    >
      <div
        className={`${styles.popup} ${styles[type]} ${
          isVisible ? styles.visible : ''
        }`}
      >
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <button
              className={styles.closeButton}
              onClick={handleCancel}
              aria-label='Закрыть'
            >
              ×
            </button>
          </div>
          <p className={styles.message}>{message}</p>
          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={handleCancel}
            >
              {cancelText}
            </button>
            <button
              className={`${styles.button} ${styles.confirmButton} ${
                styles[`confirm-${type}`]
              }`}
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
