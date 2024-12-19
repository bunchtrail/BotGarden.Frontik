import React from 'react';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface AdditionalSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AdditionalSection: React.FC<AdditionalSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className={styles.formRow}>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="notes">
          Примечания
        </label>
        <textarea
          className={styles.inputField}
          id="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          placeholder="Дополнительные примечания"
        />
      </div>
    </div>
  );
};

export default AdditionalSection;
