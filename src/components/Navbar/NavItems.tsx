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
}

const NavItems: React.FC<NavItemsProps> = ({
  sectorId,
  pageType = 'home',
  isMobileMenuOpen,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
}) => {
  const config = pageConfig[pageType];

  return (
    <div
      className={`${styles.navItems} ${isMobileMenuOpen ? styles.show : ''}`}
    >
      {sectorId ? (
        <>
          {config.navLinks.map((link) => (
            <Link to={link.to} className={styles.navItem} key={link.to}>
              <i className={`${link.iconClass} ${styles.icon}`} />
              <LinkTitle title={link.label} />
            </Link>
          ))}

          {/* Показываем Dropdown, если это не home, но в данном примере логика может остаться прежней */}
          {pageType !== 'home' && (
            <Dropdown
              sectorId={sectorId}
              pageType={pageType}
              isOpen={isDropdownOpen}
              toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
              dropdownRef={dropdownRef}
            />
          )}
        </>
      ) : (
        <>
          {config.navLinks.map((link) => (
            <Link to={link.to} className={styles.navItem} key={link.to}>
              <i className={`${link.iconClass} ${styles.icon}`} />
              <LinkTitle title={link.label} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default NavItems;
