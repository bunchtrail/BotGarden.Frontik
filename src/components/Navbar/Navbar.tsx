// src/components/Navbar/Navbar.tsx

import React, { useEffect, useMemo, useRef, useState } from 'react';
import useIsMobile from '../../hooks/useInMobile';
import useNavbarVisibility from '../../hooks/useNavbarVisibility';
import ButtonGroup from './ButtonGroup';
import MobileActions from './MobileActions';
import MobileToggle from './MobileToggle';
import styles from './Navbar.module.css';
import NavItems from './NavItems';
import SearchInput from './SearchInput';

interface NavbarProps {
  sectorId?: number;
  pageType?: 'home' | 'add-plant' | 'all-plants';
  onSearch?: (query: string, selectedColumns: string[]) => void; // Обновлён тип функции onSearch
  isEditing?: boolean;
  toggleEditing?: () => void;
  handleSave?: () => void;
  searchableColumns?: string[]; // Добавлено свойство для передачи доступных столбцов
}

const Navbar: React.FC<NavbarProps> = ({
  sectorId,
  pageType,
  onSearch,
  isEditing,
  toggleEditing,
  handleSave,
  searchableColumns = [], // Значение по умолчанию
}) => {
  const [isDropdownOpen, setIsColumnsDropdownOpen] = useState(false); // Renamed for columns
  const [isNavItemsDropdownOpen, setIsNavItemsDropdownOpen] = useState(false); // New state for NavItems
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navItemsDropdownRef = useRef<HTMLDivElement>(null); // New ref for NavItems
  const isVisible = useNavbarVisibility();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query, selectedColumns);
    }
  };

  const handleColumnSelection = (column: string) => {
    setSelectedColumns((prevSelected) => {
      if (prevSelected.includes(column)) {
        const updated = prevSelected.filter((col) => col !== column);
        if (onSearch) {
          onSearch(searchQuery, updated);
        }
        return updated;
      } else {
        const updated = [...prevSelected, column];
        if (onSearch) {
          onSearch(searchQuery, updated);
        }
        return updated;
      }
    });
  };

  // Обработка кликов вне выпадающего меню для его закрытия
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsColumnsDropdownOpen(false);
      }
      if (
        navItemsDropdownRef.current &&
        !navItemsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsNavItemsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Обработка нажатия клавиши Escape для закрытия выпадающего меню
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsColumnsDropdownOpen(false); // Updated setter
    }
  };

  const navbarClass = `${styles.navbarContainer} ${
    !isVisible ? styles.hidden : ''
  } 
  `;

  // Меморизация доступных столбцов для отображения
  const availableColumns = useMemo(() => {
    return searchableColumns;
  }, [searchableColumns]);

  return (
    <div className={navbarClass} onKeyDown={handleKeyDown}>
      {/* Кнопка открытия мобильного меню */}
      {isMobile && (
        <MobileToggle
          isOpen={isMobileMenuOpen}
          onToggle={handleMobileMenuToggle}
        />
      )}

      {/* Навигационные ссылки */}
      <NavItems
        sectorId={sectorId}
        pageType={pageType}
        isMobileMenuOpen={isMobileMenuOpen}
        isDropdownOpen={isNavItemsDropdownOpen} // Updated prop
        setIsDropdownOpen={setIsNavItemsDropdownOpen} // Updated setter
        dropdownRef={navItemsDropdownRef} // Updated ref
      />

      {/* Search Input и выбор столбцов для поиска */}
      {pageType === 'all-plants' && (
        <div className={styles.searchColumnsContainer}>
          <SearchInput
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <div className={styles.columnsSelector}>
            <button
              className={styles.columnsButton}
              onClick={() => setIsColumnsDropdownOpen((prev) => !prev)}
              title='Выбрать столбцы для поиска'
            >
              Выбрать столбцы
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdown} ref={dropdownRef}>
                {availableColumns.map((column) => (
                  <label key={column} className={styles.dropdownItem}>
                    <input
                      type='checkbox'
                      checked={selectedColumns.includes(column)}
                      onChange={() => handleColumnSelection(column)}
                    />
                    {column}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pass props to ButtonGroup */}
      {sectorId && !isMobile && (
        <ButtonGroup
          pageType={pageType}
          isEditing={isEditing}
          toggleEditing={toggleEditing}
          handleSave={handleSave}
        />
      )}

      {/* Кнопки действия для мобильных устройств */}
      {sectorId && isMobile && <MobileActions isOpen={isMobileMenuOpen} />}
    </div>
  );
};

export default Navbar;
