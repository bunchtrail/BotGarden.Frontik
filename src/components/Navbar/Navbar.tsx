// src/components/Navbar/Navbar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/styles/components/Navbar/Navbar.module.css';
import LinkTitle from '../Misc/LinkTitle';
import { getSectorById } from '../../utils/data';

interface NavbarProps {
  sectorId?: number;
}

const Navbar: React.FC<NavbarProps> = ({ sectorId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768) {
        // Только для десктопа
        const currentScrollY = window.scrollY;
        const scrollingUp = currentScrollY < lastScrollY.current;

        if (currentScrollY < 100) {
          setIsVisible(true);
        } else {
          setIsVisible(scrollingUp);
        }

        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <button className={styles.mobileToggle} onClick={handleMobileMenuToggle}>
        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
      </button>

      {/* Навигационные ссылки */}
      <div
        className={`${styles.navItems} ${isMobileMenuOpen ? styles.show : ''}`}
      >
        {sectorId ? (
          <>
            <Link to='/home' className={styles.navItem}>
              <i className={`fas fa-home ${styles.icon}`} /> Вернуться на
              главный экран
            </Link>

            <div className={styles.dropdownContainer} ref={dropdownRef}>
              <button
                className={styles.dropdownButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className={styles.dropdownLabel}>
                  <i className={`fas fa-plus ${styles.icon}`} />
                  {getSectorById(sectorId)?.name}
                </div>
                <i
                  className={`fas fa-chevron-down ${styles.dropdownIcon} ${
                    isDropdownOpen ? styles.rotate : ''
                  }`}
                />
              </button>
              <div
                className={`${styles.dropdownContent} ${
                  isDropdownOpen ? styles.show : ''
                } ${isDropdownOpen ? styles.animate : ''}`}
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
          </>
        ) : (
          <>
            {/* Ссылки без сектора */}
            <Link to='/dendrology-all' className={styles.navItem}>
              <i className={`fas fa-tree ${styles.icon}`} />
              <LinkTitle title='Дендрология - все записи' />
            </Link>
            <Link to='/flora-all' className={styles.navItem}>
              <i className={`fas fa-leaf ${styles.icon}`} />
              <LinkTitle title='Флора - все записи' />
            </Link>
            <Link to='/floriculture-all' className={styles.navItem}>
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

      {/* Кнопки действия для десктопа */}
      {sectorId && !isMobile && (
        <div className={styles.buttonGroup}>
          <button className={styles.saveButton} type='button'>
            <i className={`fas fa-save ${styles.saveIcon}`} /> Сохранить
          </button>
          <button className={styles.resetButton} type='button'>
            <i className={`fas fa-undo ${styles.resetIcon}`} /> Сбросить
          </button>
        </div>
      )}

      {/* Кнопки действия для мобильных устройств */}
      {sectorId && isMobile && (
        <div
          className={`${styles.mobileActions} ${
            isMobileMenuOpen ? styles.showActions : ''
          }`}
        >
          <button className={styles.mobileSaveButton} type='button'>
            <i className={`fas fa-save ${styles.saveIcon}`} /> Сохранить
          </button>
          <button className={styles.mobileResetButton} type='button'>
            <i className={`fas fa-undo ${styles.resetIcon}`} /> Сбросить
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
