import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '../../assets/styles/components/Misc/Message.module.css';

interface MessageProps {
  message: string;
  type?: 'success' | 'error' | 'unauthorized';
  onDismiss?: () => void;
}

const Message: React.FC<MessageProps> = ({
  message,
  type = 'error',
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

  const messageClass = classNames(styles.message, {
    [styles.visible]: visible,
    [styles.leaving]: isLeaving,
    [styles.error]: type === 'error',
    [styles.success]: type === 'success',
    [styles.unauthorized]: type === 'unauthorized',
  });

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'unauthorized':
        return '🔐';
      default:
        return '!';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Успешно';
      case 'unauthorized':
        return 'Ошибка входа';
      default:
        return 'Внимание';
    }
  };

  const messageElement = (
    <div className={styles.messageContainer}>
      <div className={messageClass} role='alert' aria-live='polite'>
        <div className={styles.content}>
          <span className={styles.icon}>{getIcon()}</span>
          <div className={styles.details}>
            <strong className={styles.title}>{getTitle()}</strong>
            <span className={styles.text}>{message}</span>
          </div>
        </div>
        <div className={styles.progressBar} />
      </div>
    </div>
  );

  return createPortal(messageElement, document.body);
};

export default Message;
