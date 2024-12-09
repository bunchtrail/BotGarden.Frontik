// src/components/Navbar/Navbar.tsx
import { FC, useEffect, useRef, useState } from 'react';
import { NavbarElement } from '../../configs/navbarConfig';
import useIsMobile from '../../hooks/useInMobile';
import { useNavbarConfig } from '../../hooks/useNavbarConfig';
import useNavbarVisibility from '../../hooks/useNavbarVisibility';
import ButtonGroup from './ButtonGroup';
import MobileActions from './MobileActions';
import MobileToggle from './MobileToggle';
import styles from './Navbar.module.css';
import NavItems from './NavItems';
import SearchInput from './SearchInput';

interface NavbarProps {
  onSearch?: (query: string, selectedColumns: string[]) => void;
  isEditing?: boolean;
  toggleEditing?: () => void;
  handleSave?: () => void;
  searchableColumns?: { field: string; label: string }[];
}

const Navbar: FC<NavbarProps> = ({
  onSearch,
  isEditing,
  toggleEditing,
  handleSave,
  searchableColumns = [],
}) => {
  const isMobile = useIsMobile();
  const isVisible = useNavbarVisibility();
  const { config, pageType, sectorId } = useNavbarConfig();

  // Если страница исключена
  if (config.exclude) {
    return null;
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavItemsDropdownOpen, setIsNavItemsDropdownOpen] = useState(false);
  const navItemsDropdownRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

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

  const navbarClass = `${styles.navbarContainer} ${
    !isVisible ? styles.hidden : ''
  }`;

  // Маппинг типов элементов на компоненты
  const renderElement = (el: NavbarElement, idx: number) => {
    switch (el.type) {
      case 'links':
        return (
          <NavItems
            key={idx}
            sectorId={sectorId}
            pageType={pageType}
            isMobileMenuOpen={isMobileMenuOpen}
            isDropdownOpen={isNavItemsDropdownOpen}
            setIsDropdownOpen={setIsNavItemsDropdownOpen}
            dropdownRef={navItemsDropdownRef}
            customLinks={el.links}
          />
        );
      case 'search':
        if (pageType === 'all-plants') {
          return (
            <div className={styles.searchContainer} key={idx}>
              <SearchInput
                searchQuery={searchQuery}
                onSearchChange={(e) => {
                  const query = e.target.value;
                  setSearchQuery(query);
                  onSearch?.(query, selectedColumns);
                }}
              />
            </div>
          );
        }
        return null;
      case 'buttonGroup':
        return (
          <ButtonGroup
            key={idx}
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
          />
        );
      case 'mobileActions':
        if (sectorId && isMobile) {
          return <MobileActions key={idx} isOpen={isMobileMenuOpen} />;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={navbarClass}>
      {isMobile && (
        <MobileToggle
          isOpen={isMobileMenuOpen}
          onToggle={handleMobileMenuToggle}
        />
      )}

      {config.elements?.map((el, idx) => renderElement(el, idx))}
    </div>
  );
};

export default Navbar;
