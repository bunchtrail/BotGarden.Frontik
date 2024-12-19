// src/components/Misc/ErrorMessage.tsx

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from '../../assets/styles/components/Misc/ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  type?: 'general' | 'unauthorized';
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'general',
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setIsLeaving(false);

      const timer = setTimeout(() => {
        setIsLeaving(true);
        setTimeout(() => {
          setVisible(false);
          if (onDismiss) {
            onDismiss();
          }
        }, 300);
      }, 4700);

      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  if (!visible) return null;

  const messageClass = classNames(styles.errorMessage, {
    [styles.visible]: visible,
    [styles.unauthorized]: type === 'unauthorized',
    [styles.leaving]: isLeaving,
  });

  const getErrorIcon = () => {
    switch (type) {
      case 'unauthorized':
        return '🔒';
      default:
        return '⚠️';
    }
  };

  const getErrorTitle = () => {
    switch (type) {
      case 'unauthorized':
        return 'Ошибка входа';
      default:
        return 'Внимание';
    }
  };

  return (
    <div className={messageClass} role="alert" aria-live="polite">
      <div className={styles.errorContent}>
        <span className={styles.errorIcon}>{getErrorIcon()}</span>
        <div className={styles.errorDetails}>
          <strong className={styles.errorTitle}>{getErrorTitle()}</strong>
          <span className={styles.errorText}>{message}</span>
        </div>
      </div>
      <div className={styles.progressBar} />
    </div>
  );
};

export default ErrorMessage;
