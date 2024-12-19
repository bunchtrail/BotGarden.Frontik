import React from 'react';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface ClassificationSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ClassificationSection: React.FC<ClassificationSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className={styles.formRow}>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="speciesName">
          Название вида
        </label>
        <input
          className={styles.inputField}
          id="speciesName"
          value={formData.speciesName || ''}
          onChange={handleChange}
          placeholder="Введите название вида"
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="subspeciesName">
          Подвид
        </label>
        <input
          className={styles.inputField}
          id="subspeciesName"
          value={formData.subspeciesName || ''}
          onChange={handleChange}
          placeholder="Введите подвид"
        />
      </div>
    </div>
  );
};

export default ClassificationSection;
