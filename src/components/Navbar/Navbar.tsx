// src/components/Navbar/Navbar.tsx

import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
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
  pageType?: 'add-plant' | 'all-plants';
  onSearch?: (query: string) => void;
  isEditing: boolean; // Новое свойство
  toggleEditing: () => void; // Функция переключения
}

const Navbar: React.FC<NavbarProps> = ({ sectorId, pageType, onSearch, isEditing, toggleEditing }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const isVisible = useNavbarVisibility();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  // Обработка кликов вне выпадающего меню для его закрытия
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Обработка нажатия клавиши Escape для закрытия выпадающего меню
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  const navbarClass = `${styles.navbarContainer} ${
    !isVisible ? styles.hidden : ''
  }`;

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
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        dropdownRef={dropdownRef}
      />

      {/* Search Input */}
      {pageType === 'all-plants' && (
        <SearchInput
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      )}

      {/* Переключатель режима редактирования */}
      <div className={styles.editToggle}>
        <label className={styles.switch}>
          <input type="checkbox" checked={isEditing} onChange={toggleEditing} />
          <span className={styles.slider}></span>
        </label>
        <span>Режим редактирования</span>
      </div>

      {/* Кнопки действия для десктопа */}
      {sectorId && !isMobile && <ButtonGroup />}

      {/* Кнопки действия для мобильных устройств */}
      {sectorId && isMobile && <MobileActions isOpen={isMobileMenuOpen} />}
    </div>
  );
};

export default Navbar;
