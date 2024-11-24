// src/components/Navbar/Dropdown.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/styles/components/Navbar/Navbar.module.css';

import { getSectorById } from '../../utils/data';

interface DropdownProps {
  sectorId: number;
  isOpen: boolean;
  toggleDropdown: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  sectorId,
  isOpen,
  toggleDropdown,
}) => {
  return (
    <div className={styles.dropdownContainer}>
      <button
        className={styles.dropdownButton}
        onClick={toggleDropdown}
        aria-haspopup='true'
        aria-expanded={isOpen}
      >
        <div className={styles.dropdownLabel}>
          <i className={`fas fa-plus ${styles.icon}`} />
          {getSectorById(sectorId)?.name}
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
        <Link to={`/add-plant/1`} className={styles.dropdownItem}>
          <i className={`fas fa-tree ${styles.icon}`} />
          Дендрология
        </Link>
        <Link to={`/add-plant/2`} className={styles.dropdownItem}>
          <i className={`fas fa-leaf ${styles.icon}`} />
          Флора
        </Link>
        <Link to={`/add-plant/3`} className={styles.dropdownItem}>
          <i className={`fas fa-seedling ${styles.icon}`} />
          Цветоводство
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
