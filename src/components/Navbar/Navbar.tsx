// src/components/Navbar/Navbar.tsx

import React, { useEffect, useRef, useState } from 'react';
import PageType, { pageConfig } from '../../configs/pageConfig';
import useIsMobile from '../../hooks/useInMobile';
import useNavbarVisibility from '../../hooks/useNavbarVisibility';
import ButtonGroup from './ButtonGroup';
import MobileActions from './MobileActions';
import MobileToggle from './MobileToggle';
import styles from './Navbar.module.css';
import NavItems from './NavItems';
import SearchInput from './SearchInput';

interface SearchableColumn {
  field: string;
  label: string;
}

interface NavbarProps {
  sectorId?: number;
  pageType?: PageType;
  onSearch?: (query: string, selectedColumns: string[]) => void;
  isEditing?: boolean;
  toggleEditing?: () => void;
  handleSave?: () => void;
  searchableColumns?: SearchableColumn[];
  onAction?: (action: string, file?: File) => void;
  activeMode?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  sectorId,
  pageType = 'home',
  onSearch,
  isEditing = false,
  toggleEditing,
  handleSave,
  searchableColumns = [],
  onAction,
  activeMode,
}) => {
  const config = pageConfig[pageType];
  const [isNavItemsDropdownOpen, setIsNavItemsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const navItemsDropdownRef = useRef<HTMLDivElement>(null);
  const isVisible = useNavbarVisibility();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navItemsDropdownRef.current &&
        !navItemsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsNavItemsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsNavItemsDropdownOpen(false);
    }
  };

  const navbarClass = `${styles.navbarContainer} ${
    !isVisible ? styles.hidden : ''
  }`;

  return (
    <div className={navbarClass} onKeyDown={handleKeyDown}>
      {isMobile && (
        <MobileToggle
          isOpen={isMobileMenuOpen}
          onToggle={handleMobileMenuToggle}
        />
      )}

      <div className={styles.navContent}>
        <NavItems
          sectorId={sectorId}
          pageType={pageType}
          isMobileMenuOpen={isMobileMenuOpen}
          isDropdownOpen={isNavItemsDropdownOpen}
          setIsDropdownOpen={setIsNavItemsDropdownOpen}
          dropdownRef={navItemsDropdownRef}
          onAction={onAction}
        />

        {config.showSearch && (
          <div className={styles.searchContainer}>
            <SearchInput
              searchQuery={searchQuery}
              onSearchChange={(e) => {
                const query = e.target.value;
                setSearchQuery(query);
                if (onSearch) {
                  onSearch(query, selectedColumns);
                }
              }}
            />
          </div>
        )}

        {config.showButtonGroup && (
          <ButtonGroup
            pageType={pageType}
            isEditing={isEditing}
            toggleEditing={toggleEditing}
            handleSave={handleSave}
            isMobile={isMobile}
            availableColumns={searchableColumns}
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
            onSearch={onSearch}
            searchQuery={searchQuery}
            onAction={onAction}
            activeMode={activeMode}
          />
        )}
      </div>

      {isMobile && <MobileActions isOpen={isMobileMenuOpen} />}
    </div>
  );
};

export default Navbar;
