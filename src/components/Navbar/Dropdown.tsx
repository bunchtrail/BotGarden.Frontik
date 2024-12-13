// src/components/Navbar/Dropdown.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

import PageType from '../../configs/pageConfig';
import { getSectorById } from '../../utils/data';

interface DropdownProps {
  sectorId?: number;
  pageType?: PageType;
  isOpen: boolean;
  toggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const Dropdown: React.FC<DropdownProps> = ({
  sectorId,
  pageType,
  isOpen,
  toggleDropdown,
  dropdownRef,
}) => {
  const sectorName =
    sectorId !== undefined ? getSectorById(sectorId)?.name : 'Сектор';

  const basePath = pageType === 'add-plant' ? '/add-plant' : '/all-plants';

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={toggleDropdown}
        aria-haspopup='true'
        aria-expanded={isOpen}
      >
        <div className={styles.dropdownLabel}>
          <i className={`fas fa-plus ${styles.icon}`} />
          {sectorName}
        </div>
        <i
          className={`fas fa-chevron-down ${styles.dropdownIcon} ${
            isOpen ? styles.rotate : ''
          }`}
        />
      </button>
      <div
        className={`${styles.dropdownContent} ${isOpen ? styles.show : ''} ${
          isOpen ? styles.animate : ''
        }`}
      >
        <Link to={`${basePath}/1`} className={styles.dropdownItem}>
          <i className={`fas fa-tree ${styles.icon}`} />
          Дендрология
        </Link>
        <Link to={`${basePath}/2`} className={styles.dropdownItem}>
          <i className={`fas fa-leaf ${styles.icon}`} />
          Флора
        </Link>
        <Link to={`${basePath}/3`} className={styles.dropdownItem}>
          <i className={`fas fa-seedling ${styles.icon}`} />
          Цветоводство
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
