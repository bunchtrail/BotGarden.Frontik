import React, { useEffect, useState } from 'react';
import styles from './DeleteConfirmationPopup.module.css';

interface DeleteConfirmationPopupProps {
  onConfirm: () => void;
  onCancel: () => void;
  position: { x: number; y: number };
}

export const DeleteConfirmationPopup: React.FC<DeleteConfirmationPopupProps> = ({
  onConfirm,
  onCancel,
  position,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Закрываем по клику вне попапа
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.popup}`)) {
        handleCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300); // Задержка для анимации
  };

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(onConfirm, 300); // Задержка для анимации
  };

  return (
    <div 
      className={styles.container} 
      style={{ 
        left: position.x, 
        top: position.y 
      }}
    >
      <div className={`${styles.popup} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.content}>
          <h3 className={styles.title}>Удаление области</h3>
          <p className={styles.message}>
            Вы уверены, что хотите удалить эту область?
          </p>
          <div className={styles.buttons}>
            <button 
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={handleCancel}
            >
              Отмена
            </button>
            <button 
              className={`${styles.button} ${styles.confirmButton}`}
              onClick={handleConfirm}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 