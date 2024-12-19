import React from 'react';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface BiometricSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const BiometricSection: React.FC<BiometricSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className={styles.formRow}>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="height">
          Высота (м)
        </label>
        <input
          className={styles.inputField}
          type="number"
          id="height"
          value={formData.height || ''}
          onChange={handleChange}
          placeholder="Введите высоту"
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="diameter">
          Диаметр ствола (см)
        </label>
        <input
          className={styles.inputField}
          type="number"
          id="diameter"
          value={formData.diameter || ''}
          onChange={handleChange}
          placeholder="Введите диаметр"
        />
      </div>
    </div>
  );
};

export default BiometricSection;
