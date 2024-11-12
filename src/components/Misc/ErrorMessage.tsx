// src/components/Misc/ErrorMessage.tsx

import React, { useEffect, useState } from 'react';
import styles from '../../assets/styles/components/Misc/ErrorMessage.module.css';
import classNames from 'classnames';

interface ErrorMessageProps {
  message: string;
  type?: 'general' | 'unauthorized';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000); // Сообщение исчезнет через 5 секунд

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) {
    return null;
  }

  const messageClass = classNames(styles.errorMessage, {
    [styles.visible]: visible,
    [styles.unauthorized]: type === 'unauthorized',
  });

  return (
    <div className={messageClass} aria-live='assertive'>
      {message}
    </div>
  );
};

export default ErrorMessage;
