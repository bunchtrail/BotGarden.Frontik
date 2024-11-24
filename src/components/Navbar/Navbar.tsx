// src/components/Navbar/Navbar.tsx
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../assets/styles/components/Navbar/Navbar.module.css';
import useIsMobile from '../../hooks/useInMobile';
import MobileToggle from './MobileToggle';
import NavItems from './NavItems';
import ButtonGroup from './ButtonGroup';
import MobileActions from './MobileActions';

interface NavbarProps {
  sectorId?: number;
}

const Navbar: React.FC<NavbarProps> = ({ sectorId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
      if (!isMobile) {
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
  }, [isMobile]);

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
        isMobileMenuOpen={isMobileMenuOpen}
        dropdownRef={dropdownRef}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />

      {/* Кнопки действия для десктопа */}
      {sectorId && !isMobile && <ButtonGroup />}

      {/* Кнопки действия для мобильных устройств */}
      {sectorId && isMobile && <MobileActions isOpen={isMobileMenuOpen} />}
    </div>
  );
};

export default Navbar;
