// src/components/Navbar/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/styles/components/Navbar/Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faTree,
  faLeaf,
  faSeedling,
  faMap,
} from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  onToggleTheme?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleTheme }) => {
  return (
    <nav className={styles.navbar}>
      <Link to='/home' className={styles.navLink}>
        <FontAwesomeIcon icon={faHome} className={styles.icon} /> Главная
      </Link>
      <Link to='/dendrology-all' className={styles.navLink}>
        <FontAwesomeIcon icon={faTree} className={styles.icon} /> Дендрология
      </Link>
      <Link to='/flora-all' className={styles.navLink}>
        <FontAwesomeIcon icon={faLeaf} className={styles.icon} /> Флора
      </Link>
      <Link to='/floriculture-all' className={styles.navLink}>
        <FontAwesomeIcon icon={faSeedling} className={styles.icon} />{' '}
        Цветоводство
      </Link>
      <Link to='/map' className={styles.navLink}>
        <FontAwesomeIcon icon={faMap} className={styles.icon} /> Карта
      </Link>
      {/* Пример кнопки для переключения темы */}
      {onToggleTheme && (
        <button onClick={onToggleTheme} className={styles.navLink}>
          Сменить тему
        </button>
      )}
    </nav>
  );
};

export default Navbar;
