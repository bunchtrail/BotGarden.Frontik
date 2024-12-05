// src/components/Navbar/ButtonGroup.tsx

import React, { useEffect } from 'react';
import { FaBackward, FaPencilAlt, FaSave, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

interface ButtonGroupProps {
  pageType?: 'home' | 'add-plant' | 'all-plants';
  isEditing?: boolean;
  toggleEditing?: () => void;
  handleSave?: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  pageType,
  isEditing,
  toggleEditing,
  handleSave,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      if (isEditing) {
        appContainer.classList.add('full-width');
      } else {
        appContainer.classList.remove('full-width');
      }
    }
  }, [isEditing]);

  return (
    <div className={styles.buttonGroup}>
      {pageType === 'all-plants' && (
        <button
          className={styles.button}
          onClick={toggleEditing}
          title='Режим редактирования'
        >
          <FaPencilAlt />
        </button>
      )}
      {isEditing && (
        <button
          className={styles.button}
          type='button'
          onClick={handleSave} // Используем handleSave при нажатии
          title='Сохранить'
        >
          <FaSave />
        </button>
      )}
      <button
        className={styles.button}
        type='button'
        // Добавьте обработчик сброса, если необходимо
        title='Сбросить'
      >
        <FaUndo />
      </button>
      <button
        className={styles.button}
        type='button'
        onClick={() => navigate(-1)}
        title='Назад'
      >
        <FaBackward />
      </button>
    </div>
  );
};

export default ButtonGroup;
