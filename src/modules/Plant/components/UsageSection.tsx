import React from 'react';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface UsageSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const UsageSection: React.FC<UsageSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className={styles.formRow}>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="usage">
          Использование
        </label>
        <textarea
          className={styles.inputField}
          id="usage"
          value={formData.usage || ''}
          onChange={handleChange}
          placeholder="Опишите использование"
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="protection">
          Защита
        </label>
        <textarea
          className={styles.inputField}
          id="protection"
          value={formData.protection || ''}
          onChange={handleChange}
          placeholder="Опишите меры защиты"
        />
      </div>
    </div>
  );
};

export default UsageSection;
