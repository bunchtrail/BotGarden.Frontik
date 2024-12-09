// src/components/Navbar/ButtonGroup.tsx
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  FaBackward,
  FaColumns,
  FaHome,
  FaPencilAlt,
  FaSave,
  FaUndo,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

interface ButtonGroupProps {
  pageType?: 'home' | 'add-plant' | 'all-plants';
  isEditing?: boolean;
  toggleEditing?: () => void;
  handleSave?: () => void;
  isMobile: boolean;
  availableColumns: { field: string; label: string }[];
  selectedColumns: string[];
  setSelectedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  onSearch?: (query: string, selectedColumns: string[]) => void;
  searchQuery: string;
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  pageType,
  isEditing,
  toggleEditing,
  handleSave,
  isMobile,
  availableColumns,
  selectedColumns,
  setSelectedColumns,
  onSearch,
  searchQuery,
}) => {
  const navigate = useNavigate();
  const [isColumnsDropdownOpen, setIsColumnsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleColumnSelection = (column: string) => {
    setSelectedColumns((prevSelected) => {
      let updated: string[];
      if (prevSelected.includes(column)) {
        updated = prevSelected.filter((col) => col !== column);
      } else {
        updated = [...prevSelected, column];
      }
      if (onSearch) {
        onSearch(searchQuery, updated);
      }
      return updated;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsColumnsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Отдельные кнопки для лучшей читаемости и переиспользования
  const ColumnsButton = () => (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.columnsButton}
        onClick={() => setIsColumnsDropdownOpen((prev) => !prev)}
        title='Выбрать столбцы для поиска'
        aria-haspopup='true'
        aria-expanded={isColumnsDropdownOpen}
      >
        <FaColumns />
        {!isMobile && <span style={{ marginLeft: '8px' }}>Столбцы</span>}
      </button>
      {isColumnsDropdownOpen && (
        <div
          className={`${styles.columnsDropdown} ${
            isColumnsDropdownOpen ? 'show' : ''
          }`}
          role='menu'
        >
          {availableColumns.map((column) => (
            <div
              key={column.field}
              className={`${styles.columnItem} ${
                selectedColumns.includes(column.field) ? styles.selected : ''
              }`}
              onClick={() => handleColumnSelection(column.field)}
              role='menuitem'
              aria-checked={selectedColumns.includes(column.field)}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleColumnSelection(column.field);
                }
              }}
            >
              {column.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const EditButton = () => (
    <button
      className={styles.button}
      onClick={toggleEditing}
      title='Режим редактирования'
      aria-pressed={isEditing}
    >
      <FaPencilAlt />
      {!isMobile && <span style={{ marginLeft: '5px' }}>Редактировать</span>}
    </button>
  );

  const SaveButton = () => (
    <button
      className={styles.button}
      type='button'
      onClick={handleSave}
      title='Сохранить'
    >
      <FaSave />
      {!isMobile && <span style={{ marginLeft: '5px' }}>Сохранить</span>}
    </button>
  );

  const ResetButton = () => (
    <button
      className={styles.button}
      type='button'
      title='Сбросить'
      onClick={() => {
        // Логика сброса
      }}
    >
      <FaUndo />
      {!isMobile && <span style={{ marginLeft: '5px' }}>Сбросить</span>}
    </button>
  );

  const BackButton = () => (
    <button
      className={styles.button}
      type='button'
      onClick={() => navigate(-1)}
      title='Назад'
    >
      <FaBackward />
      {!isMobile && <span style={{ marginLeft: '5px' }}>Назад</span>}
    </button>
  );

  const HomeButton = () => (
    <button
      className={styles.button}
      type='button'
      onClick={() => navigate('/home')}
      title='Домой'
    >
      <FaHome />
      {!isMobile && <span style={{ marginLeft: '5px' }}>Домой</span>}
    </button>
  );

  return (
    <div className={styles.buttonGroup}>
      {pageType === 'all-plants' && (
        <>
          <ColumnsButton />
          <EditButton />
          {isEditing && <SaveButton />}
          <ResetButton />
          <BackButton />
          <HomeButton />
        </>
      )}
      {pageType === 'add-plant' && (
        <>
          <BackButton />
          <HomeButton />
          <SaveButton />
        </>
      )}
      {!pageType && <HomeButton />}
    </div>
  );
};

export default ButtonGroup;
