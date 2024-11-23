// src/components/Navbar/Navbar.tsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/styles/components/Navbar/Navbar.module.css';
import LinkTitle from '../Misc/LinkTitle';
import { FormContext } from '../../context/FormContext';

interface NavbarProps {
  sectorId?: number;
}

const Navbar: React.FC<NavbarProps> = ({ sectorId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
            <i className={`fas fa-home ${styles.icon}`} /> Вернуться на главный
            экран
          </Link>

          <div className={styles.dropdownContainer}>
            <button
              className={styles.dropdownButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <i className={`fas fa-plus ${styles.icon}`} />
              Добавить растение в сектор {sectorId}
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
                <i className={`fas fa-flower ${styles.icon}`} />
                Цветоводство
              </Link>
            </div>
          </div>
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
