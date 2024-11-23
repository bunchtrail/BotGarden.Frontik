// src/components/Navbar/Navbar.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/styles/components/Navbar/Navbar.module.css';
import LinkTitle from '../Misc/LinkTitle';
import { FormContext } from '../../context/FormContext';

interface NavbarProps {
  sectorId?: number;
}

const Navbar: React.FC<NavbarProps> = ({ sectorId }) => {
  const formContext = useContext(FormContext);

  const saveData = () => {
    if (formContext) {
      formContext.saveData();
    } else {
      console.log('FormContext is not available');
    }
  };

  const resetForm = () => {
    if (formContext) {
      formContext.resetForm();
    } else {
      console.log('FormContext is not available');
    }
  };

  if (sectorId) {
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.navItems}>
          <Link to='/home' className={styles.navItem}>
            <i className={`fas fa-home ${styles.icon}`} /> Вернуться на главный экран
          </Link>
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.saveButton}
            type='button'
            onClick={saveData}
          >
            <i className={`fas fa-save ${styles.saveIcon}`} /> Сохранить
          </button>
          <button
            className={styles.resetButton}
            type='button'
            onClick={resetForm}
          >
            <i className={`fas fa-undo ${styles.resetIcon}`} /> Сбросить
          </button>
        </div>
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
