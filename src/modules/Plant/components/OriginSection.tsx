import React from 'react';
import { FormData } from '../../../types/types';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface OriginSectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const OriginSection: React.FC<OriginSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div>
      <div className={styles.inputRow}>
        <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
          <label className={styles.label} htmlFor='plantOrigin'>
            Происхождение растения
          </label>
          <textarea
            className={styles.input}
            id='plantOrigin'
            value={formData.plantOrigin || ''}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
          <label className={styles.label} htmlFor='naturalHabitat'>
            Естественная среда обитания
          </label>
          <textarea
            className={styles.input}
            id='naturalHabitat'
            value={formData.naturalHabitat || ''}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>
      <div className={styles.inputRow}>
        <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
          <label className={styles.label} htmlFor='ecologyBiology'>
            Экология и биология
          </label>
          <textarea
            className={styles.input}
            id='ecologyBiology'
            value={formData.ecologyBiology || ''}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='country'>
            Страна происхождения
          </label>
          <input
            className={styles.input}
            type='text'
            id='country'
            value={formData.country || ''}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='originator'>
            Автор
          </label>
          <input
            className={styles.input}
            type='text'
            id='originator'
            value={formData.originator || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OriginSection;
