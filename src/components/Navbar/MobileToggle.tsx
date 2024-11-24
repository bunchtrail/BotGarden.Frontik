// src/components/Navbar/MobileToggle.tsx
import React from 'react';
import styles from '../../assets/styles/components/Navbar/Navbar.module.css';


interface MobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileToggle: React.FC<MobileToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <button
      className={styles.mobileToggle}
      onClick={onToggle}
      aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
    >
      <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`} />
    </button>
  );
};

export default MobileToggle;
