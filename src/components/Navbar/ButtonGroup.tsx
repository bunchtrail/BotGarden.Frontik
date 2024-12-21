// src/components/Navbar/ButtonGroup.tsx

import React, { useEffect, useRef, useState } from 'react';
import { FaColumns } from 'react-icons/fa';
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
  activeMode?: string;
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
  activeMode,
}) => {
  const config = pageConfig[pageType];
  const navigate = useNavigate();
  const [isColumnsDropdownOpen, setIsColumnsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onAction) {
      onAction('upload-image', file);
    }
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
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept='image/*'
        onChange={handleFileUpload}
      />
      {/* Рендерим статические кнопки */}
      {config.staticButtons?.map((btn) => {
        const isActive = activeMode === btn.action;

        return (
          <button
            key={btn.action}
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={() => {
              if (btn.action === 'upload-image') {
                fileInputRef.current?.click();
              } else if (btn.action === 'back') {
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
            {!isMobile && (
              <span style={{ marginLeft: '5px' }}>{btn.label}</span>
            )}
          </button>
        );
      })}

      {/* Рендерим динамические кнопки */}
      {config.dynamicButtons?.map((btn) => {
        const shouldRender = btn.condition === 'isEditing' ? isEditing : true;
        const isActive = activeMode === btn.action;

        if (!shouldRender) return null;

        return (
          <button
            key={btn.action}
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={() => {
              if (btn.action === 'save') {
                handleSave?.();
              } else if (btn.action === 'reset') {
                console.log('Сбросить изменения');
              } else {
                onAction?.(btn.action);
              }
            }}
            title={btn.label}
          >
            <i className={`fas fa-${btn.icon} ${styles.icon}`} />
            {!isMobile && (
              <span style={{ marginLeft: '5px' }}>{btn.label}</span>
            )}
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
              className={`${styles.columnsButton} ${selectedColumns.length > 0 ? styles.hasSelected : ''}`}
              onClick={() => setIsColumnsDropdownOpen((prev) => !prev)}
              title='Выбрать столбцы для поиска'
              aria-haspopup='true'
              aria-expanded={isColumnsDropdownOpen}
            >
              <div className={styles.columnsButtonContent}>
                <div className={styles.columnsIconWrapper}>
                  <FaColumns className={styles.columnsIcon} />
                  {selectedColumns.length > 0 && (
                    <span className={styles.columnCount}>
                      {selectedColumns.length}
                    </span>
                  )}
                </div>
                {!isMobile && (
                  <>
                    <span className={styles.columnsLabel}>Столбцы</span>
                    {selectedColumns.length > 0 && (
                      <div className={styles.selectedPreview}>
                        {availableColumns
                          .filter(col => selectedColumns.includes(col.field))
                          .slice(0, 2)
                          .map((col, idx) => (
                            <span 
                              key={col.field} 
                              className={styles.previewTag}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleColumnSelection(col.field);
                              }}
                            >
                              {col.label}
                              <span className={styles.removeTag}>×</span>
                            </span>
                          ))}
                        {selectedColumns.length > 2 && (
                          <div className={styles.moreCount} title={
                            availableColumns
                              .filter(col => selectedColumns.includes(col.field))
                              .slice(2)
                              .map(col => col.label)
                              .join(', ')
                          }>
                            +{selectedColumns.length - 2}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                <div className={`${styles.dropdownArrow} ${isColumnsDropdownOpen ? styles.open : ''}`}>
                  ▼
                </div>
              </div>
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
