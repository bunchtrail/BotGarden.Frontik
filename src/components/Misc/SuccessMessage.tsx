// src/components/Misc/SuccessMessage.tsx

import React from 'react';
import styles from './SuccessMessage.module.css';

interface SuccessMessageProps {
  message: string;
  onDismiss?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className={styles.successMessage}>
      <span>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className={styles.dismissButton}>
          ×
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
