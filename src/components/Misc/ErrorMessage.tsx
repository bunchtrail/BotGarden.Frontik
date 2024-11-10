// src/components/Misc/ErrorMessage.tsx
import React, { useEffect, useState } from 'react';
import '../../assets/styles/errorMessage.css';

interface ErrorMessageProps {
  message: string;
  type?: 'general' | 'unauthorized';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'general',
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`error-message ${!visible ? 'hide' : ''} ${
        type === 'unauthorized' ? 'unauthorized' : ''
      }`}
      aria-live='assertive'
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
