// src/components/Navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/styles/components/Navbar/Navbar.module.css';
import LinkTitle from '../Misc/LinkTitle';

interface NavbarProps {
  sectorId?: number;
}

const Navbar: React.FC<NavbarProps> = ({ sectorId }) => {
  const saveData = (formState: any, sectorId: number) => {
    console.log('Сохранение данных для сектора:', sectorId);
    // Добавьте вашу логику сохранения здесь
  };

  if (sectorId) {
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.navItems}>
          <Link to='/' className={styles.navItem}>
            <i className={`fas fa-home ${styles.icon}`} /> Вернуться на главный
            экран
          </Link>
        </div>
        <button
          className={styles.saveButton}
          type='button'
          onClick={() => saveData({}, sectorId)}
        >
          <i className={`fas fa-save ${styles.saveIcon}`} /> Сохранить
        </button>
      </div>
    );
  }

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navItems}>
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
      </div>
    </div>
  );
};

export default Navbar;
