// src/components/Navbar/ButtonGroup.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  FaBackward,
  FaColumns,
  FaPencilAlt,
  FaSave,
  FaUndo,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PageType, { pageConfig } from '../../configs/pageConfig';
import styles from './Navbar.module.css';

interface ButtonGroupProps {
  pageType?: PageType;
  isEditing?: boolean;
  toggleEditing?: () => void;
  handleSave?: () => void;
  isMobile: boolean;
  availableColumns?: { field: string; label: string }[];
  selectedColumns?: string[];
  setSelectedColumns?: React.Dispatch<React.SetStateAction<string[]>>;
  onSearch?: (query: string, selectedColumns: string[]) => void;
  searchQuery?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  pageType = 'home',
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
  const config = pageConfig[pageType];
  const navigate = useNavigate();
  const [isColumnsDropdownOpen, setIsColumnsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleColumnSelection = (column: string) => {
    if (!setSelectedColumns) return;
    setSelectedColumns((prevSelected) => {
      let updated: string[];
      if (prevSelected.includes(column)) {
        updated = prevSelected.filter((col) => col !== column);
      } else {
        updated = [...prevSelected, column];
      }
      if (onSearch && searchQuery !== undefined) {
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

  return (
    <div className={styles.buttonGroup}>
      {config.showColumnsDropdown &&
        availableColumns &&
        selectedColumns &&
        setSelectedColumns && (
          <>
            <div className={styles.dropdownContainer} ref={dropdownRef}>
              <button
                className={styles.columnsButton}
                onClick={() => setIsColumnsDropdownOpen((prev) => !prev)}
                title='Выбрать столбцы для поиска'
                aria-haspopup='true'
                aria-expanded={isColumnsDropdownOpen}
              >
                <FaColumns />
                {!isMobile && (
                  <span style={{ marginLeft: '8px' }}>Столбцы</span>
                )}
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
                        selectedColumns.includes(column.field)
                          ? styles.selected
                          : ''
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

            <button
              className={styles.button}
              onClick={toggleEditing}
              title='Режим редактирования'
              aria-pressed={isEditing}
            >
              <FaPencilAlt />
              {!isMobile && (
                <span style={{ marginLeft: '5px' }}>Редактировать</span>
              )}
            </button>

            {isEditing && handleSave && (
              <button
                className={styles.button}
                type='button'
                onClick={handleSave}
                title='Сохранить'
              >
                <FaSave />
                {!isMobile && (
                  <span style={{ marginLeft: '5px' }}>Сохранить</span>
                )}
              </button>
            )}

            <button
              className={styles.button}
              type='button'
              title='Сбросить'
              onClick={() => {
                if (handleSave) handleSave();
              }}
            >
              <FaUndo />
              {!isMobile && <span style={{ marginLeft: '5px' }}>Сбросить</span>}
            </button>

            <button
              className={styles.button}
              type='button'
              onClick={() => navigate(-1)}
              title='Назад'
            >
              <FaBackward />
              {!isMobile && <span style={{ marginLeft: '5px' }}>Назад</span>}
            </button>
          </>
        )}

      {pageType === 'add-plant' && !config.showColumnsDropdown && (
        <>
          {handleSave && (
            <button
              className={styles.button}
              type='button'
              onClick={handleSave}
              title='Сохранить'
            >
              <FaSave />
              {!isMobile && (
                <span style={{ marginLeft: '5px' }}>Сохранить</span>
              )}
            </button>
          )}

          <button
            className={styles.button}
            type='button'
            onClick={() => navigate(-1)}
            title='Назад'
          >
            <FaBackward />
            {!isMobile && <span style={{ marginLeft: '5px' }}>Назад</span>}
          </button>
        </>
      )}
    </div>
  );
};

export default ButtonGroup;
