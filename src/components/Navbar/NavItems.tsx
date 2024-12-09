// src/components/Navbar/NavItems.tsx
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { NavbarLink } from '../../configs/navbarConfig';
import LinkTitle from '../Misc/LinkTitle';
import Dropdown from './Dropdown';
import styles from './Navbar.module.css';

interface NavItemsProps {
  sectorId?: number;
  pageType?: 'home' | 'add-plant' | 'all-plants';
  isMobileMenuOpen: boolean;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  customLinks?: NavbarLink[];
}

const NavItems: FC<NavItemsProps> = ({
  sectorId,
  pageType,
  isMobileMenuOpen,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
  customLinks,
}) => {
  return (
    <div
      className={`${styles.navItems} ${isMobileMenuOpen ? styles.show : ''}`}
    >
      {customLinks && customLinks.length > 0 ? (
        customLinks.map((link, idx) => (
          <Link to={link.to} className={styles.navItem} key={idx}>
            {link.icon && <i className={`${link.icon} ${styles.icon}`} />}
            <LinkTitle title={link.label} />
          </Link>
        ))
      ) : (
        <>
          {sectorId ? (
            <>
              <Link to='/home' className={styles.navItem}>
                <i className={`fas fa-home ${styles.icon}`} /> Вернуться на
                главный экран
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
        </>
      )}
    </div>
  );
};

export default NavItems;
