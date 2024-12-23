import React from 'react';
import { FormData } from '../../../types/types';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface AdditionalSectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const AdditionalSection: React.FC<AdditionalSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div>
      <div className={styles.inputRow}>
        <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
          <label className={styles.label} htmlFor='note'>
            Примечания
          </label>
          <textarea
            className={styles.input}
            id='note'
            value={formData.note || ''}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='filledOut'>
            Заполнил
          </label>
          <input
            className={styles.input}
            type='text'
            id='filledOut'
            value={formData.filledOut || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='imagePath'>
            Изображение растения
          </label>
          <div className={styles.fileInputWrapper}>
            <input
              className={styles.input}
              type='file'
              id='imagePath'
              onChange={handleChange}
              accept='image/*'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalSection;
