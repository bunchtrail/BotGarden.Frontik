// src/components/Navbar/ButtonGroup.tsx

import React, { useEffect, useRef, useState } from 'react';
import { FaBackward, FaColumns, FaPencilAlt, FaSave, FaUndo } from 'react-icons/fa';
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
  onAction?: (action: string, file?: File) => void;
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
  onAction,
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
      {/* Рендерим статические кнопки */}
      {config.staticButtons?.map((btn) => (
        <button
          key={btn.action}
          className={styles.button}
          onClick={() => {
            if (btn.action === 'back') {
              navigate(-1);
            } else if (btn.action === 'toggleEditing') {
              toggleEditing?.();
            } else if (btn.action === 'save') {
              handleSave?.();
            } else {
              onAction?.(btn.action);
            }
          }}
          title={btn.label}
        >
          <i className={`fas fa-${btn.icon} ${styles.icon}`} />
          {!isMobile && <span style={{ marginLeft: '5px' }}>{btn.label}</span>}
        </button>
      ))}

      {/* Рендерим динамические кнопки */}
      {config.dynamicButtons?.map((btn) => {
        const shouldRender =
          btn.condition === 'isEditing' ? isEditing : true;

        if (!shouldRender) return null;

        return (
          <button
            key={btn.action}
            className={styles.button}
            onClick={() => {
              if (btn.action === 'save') {
                handleSave?.();
              } else if (btn.action === 'reset') {
                // Реализуйте функцию сброса при необходимости
                console.log('Сбросить изменения');
              } else {
                onAction?.(btn.action);
              }
            }}
            title={btn.label}
          >
            <i className={`fas fa-${btn.icon} ${styles.icon}`} />
            {!isMobile && <span style={{ marginLeft: '5px' }}>{btn.label}</span>}
          </button>
        );
      })}

      {/* Рендерим кнопку выбора столбцов */}
      {config.showColumnsDropdown &&
        availableColumns &&
        selectedColumns &&
        setSelectedColumns && (
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
        )}
    </div>
  );
};

export default ButtonGroup;
