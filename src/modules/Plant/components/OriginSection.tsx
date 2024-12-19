import React from 'react';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface OriginSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const OriginSection: React.FC<OriginSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className={styles.formRow}>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="origin">
          Происхождение
        </label>
        <input
          className={styles.inputField}
          id="origin"
          value={formData.origin || ''}
          onChange={handleChange}
          placeholder="Укажите происхождение"
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="habitat">
          Среда обитания
        </label>
        <textarea
          className={styles.inputField}
          id="habitat"
          value={formData.habitat || ''}
          onChange={handleChange}
          placeholder="Опишите среду обитания"
        />
      </div>
    </div>
  );
};

export default OriginSection;
