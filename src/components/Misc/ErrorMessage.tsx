// src/components/Misc/ErrorMessage.tsx

import React, { useEffect, useState } from 'react';
import styles from '../../assets/styles/components/Misc/ErrorMessage.module.css';
import classNames from 'classnames';

interface ErrorMessageProps {
  message: string;
  type?: 'general' | 'unauthorized';
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onDismiss) {
          onDismiss();
        }
      }, 5000); // Message disappears after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

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