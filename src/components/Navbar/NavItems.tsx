// src/components/Navbar/NavItems.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import PageType, { pageConfig } from '../../configs/pageConfig';
import LinkTitle from '../Misc/LinkTitle';
import Dropdown from './Dropdown';
import styles from './Navbar.module.css';

interface NavItemsProps {
  sectorId?: number;
  pageType?: PageType;
  isMobileMenuOpen: boolean;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onAction?: (action: string, file?: File) => void;
}

const NavItems: React.FC<NavItemsProps> = ({
  sectorId,
  pageType = 'home',
  isMobileMenuOpen,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
  onAction,
}) => {
  const config = pageConfig[pageType];

  return (
    <div
      className={`${styles.navItems} ${isMobileMenuOpen ? styles.show : ''}`}
    >
      <div className={styles.navItemsContainer}>
        {config.navLinks.map((link) => (
          <Link to={link.to} className={styles.navItem} key={link.to}>
            <div className={styles.navItemContent}>
              <i className={`${link.iconClass} ${styles.navIcon}`} />
              <LinkTitle title={link.label} className={styles.navLabel} />
            </div>
          </Link>
        ))}

        {config.dropdownItems && (
          <div className={styles.dropdownWrapper}>
            <Dropdown
              sectorId={sectorId}
              pageType={pageType}
              isOpen={isDropdownOpen}
              toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
              dropdownRef={dropdownRef}
              onAction={onAction}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavItems;
