import React from 'react';
import { FaBackward, FaPencilAlt, FaSave, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFormActions } from '../../hooks/useFormActions';
import styles from './Navbar.module.css';

interface ButtonGroupProps {
  pageType?: 'home' | 'add-plant' | 'all-plants';
  isEditing?: boolean;
  toggleEditing?: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  pageType,
  isEditing,
  toggleEditing,
}) => {
  const navigate = useNavigate();
  const { handleSave, handleReset } = useFormActions();

  return (
    <div className={styles.buttonGroup}>
      {/* Отображать кнопку редактирования только на странице 'all-plants' */}
      {pageType === 'all-plants' && (
        <button
          className={styles.button}
          onClick={toggleEditing}
          title='Режим редактирования'
        >
          <FaPencilAlt />
        </button>
      )}
      <button
        className={styles.button}
        type='button'
        onClick={handleSave}
        title='Сохранить'
      >
        <FaSave />
      </button>


      <button
        className={styles.button}
        type='button'
        onClick={handleReset}
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
