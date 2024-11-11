// src/components/Misc/ErrorMessage.tsx
import { useEffect, useState } from 'react';
import '../../assets/styles/errorMessage.css';

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
    return null; // Не рендерить элемент, если сообщения нет
  }

  return (
    <div
      className={`error-message ${visible ? 'visible' : ''} ${
        type === 'unauthorized' ? 'unauthorized' : ''
      }`}
      aria-live='assertive'
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
