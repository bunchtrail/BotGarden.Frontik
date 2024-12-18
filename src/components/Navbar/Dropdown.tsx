// src/components/Navbar/Dropdown.tsx
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageType, { pageConfig } from '../../configs/pageConfig';
import { getSectorById } from '../../utils/data';
import styles from './Navbar.module.css';

interface DropdownProps {
  sectorId?: number;
  pageType?: PageType;
  isOpen: boolean;
  toggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onAction?: (action: string, file?: File) => void; // Добавляем onAction
}

const Dropdown: React.FC<DropdownProps> = ({
  sectorId,
  pageType = 'home',
  isOpen,
  toggleDropdown,
  dropdownRef,
  onAction,
}) => {
  const navigate = useNavigate();

  const config = pageConfig[pageType];
  const sectorName =
    sectorId !== undefined ? getSectorById(sectorId)?.name : 'Настройки';

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={toggleDropdown}
        aria-haspopup='true'
        aria-expanded={isOpen}
      >
        <div className={styles.dropdownLabel}>
          <i className={`fas fa-cog ${styles.icon}`} />
          {sectorName}
        </div>
        <i
          className={`fas fa-chevron-down ${styles.dropdownIcon} ${
            isOpen ? styles.rotate : ''
          }`}
        />
      </button>
      {isOpen && (
        <div
          className={`${styles.dropdownContent} ${styles.show} ${styles.animate}`}
        >
          {config.dropdownItems?.map((item) => (
            <div
              key={item.pathSuffix}
              className={styles.dropdownItem}
              onClick={() => {
                if (item.pathSuffix === '/upload-image' && onAction) {
                  onAction('upload-image');
                } else {
                  const basePath = config.dropdownBasePath || '';
                  navigate(basePath + item.pathSuffix);
                }
                toggleDropdown();
              }}
            >
              <i className={`${item.iconClass} ${styles.icon}`} />
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
