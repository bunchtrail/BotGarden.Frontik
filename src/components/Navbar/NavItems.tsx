// src/components/Navbar/NavItems.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

import LinkTitle from '../Misc/LinkTitle';
import Dropdown from './Dropdown';

interface NavItemsProps {
  sectorId?: number;
  pageType?: 'home' | 'add-plant' | 'all-plants'; // Добавляем 'home' сюда
  isMobileMenuOpen: boolean;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const NavItems: React.FC<NavItemsProps> = ({
  sectorId,
  pageType,
  isMobileMenuOpen,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
}) => {
  return (
    <div
      className={`${styles.navItems} ${isMobileMenuOpen ? styles.show : ''}`}
    >
      {sectorId ? (
        <>
          <Link to='/home' className={styles.navItem}>
            <i className={`fas fa-home ${styles.icon}`} /> Вернуться на главный
            экран
          </Link>

          <Dropdown
            sectorId={sectorId}
            pageType={pageType !== 'home' ? pageType : undefined}
            isOpen={isDropdownOpen}
            toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
            dropdownRef={dropdownRef}
          />
        </>
      ) : (
        <>
          {/* Ссылки без сектора */}
          <Link to='/all-plants/1' className={styles.navItem}>
            <i className={`fas fa-tree ${styles.icon}`} />
            <LinkTitle title='Дендрология - все записи' />
          </Link>
          <Link to='/all-plants/2' className={styles.navItem}>
            <i className={`fas fa-leaf ${styles.icon}`} />
            <LinkTitle title='Флора - все записи' />
          </Link>
          <Link to='/all-plants/3' className={styles.navItem}>
            <i className={`fas fa-seedling ${styles.icon}`} />
            <LinkTitle title='Цветоводство - все записи' />
          </Link>
          <Link to='/map' className={styles.navItem}>
            <i className={`fas fa-map ${styles.icon}`} />
            <LinkTitle title='Карта' />
          </Link>
        </>
      )}
    </div>
  );
};

export default NavItems;
