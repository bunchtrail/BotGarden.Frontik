import React, { useEffect, useState } from 'react';
import styles from './MapPopup.module.css';
import { createPortal } from 'react-dom';

export interface MapPopupProps {
  title: string;
  message?: string;
  content?: React.ReactNode;
  position: L.Point;
  actions?: {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }[];
  type?: 'info' | 'warning' | 'danger';
  onClose?: () => void;
  className?: string;
}

export const MapPopup: React.FC<MapPopupProps> = ({
  title,
  message,
  content,
  position,
  actions = [],
  type = 'info',
  onClose,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.popup}`)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const handleAction = (action: typeof actions[0]) => {
    setIsVisible(false);
    setTimeout(() => action.onClick(), 300);
  };

  return createPortal(
    <div
      className={`${styles.customPopupContainer} ${className || ''}`}
      style={{ left: position.x, top: position.y }}
    >
      <div
        className={`${styles.popup} ${styles.customPopup} ${styles[type]} ${
          isVisible ? styles.visible : ''
        }`}
      >
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            {onClose && (
              <button
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Закрыть"
              >
                ×
              </button>
            )}
          </div>
          
          {message && <p className={styles.message}>{message}</p>}
          {content && <div className={styles.customContent}>{content}</div>}
          
          {actions.length > 0 && (
            <div className={styles.actions}>
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={`${styles.button} ${
                    styles[`button-${action.variant || 'secondary'}`]
                  }`}
                  onClick={() => handleAction(action)}
                >
                  {action.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}; 