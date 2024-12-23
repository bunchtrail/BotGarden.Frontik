import React from 'react';
import { FormData } from '../../../types/types';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface UsageSectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const UsageSection: React.FC<UsageSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div>
      <div className={styles.inputRow}>
        <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
          <label className={styles.label} htmlFor='economicUse'>
            Хозяйственное использование
          </label>
          <textarea
            className={styles.input}
            id='economicUse'
            value={formData.economicUse || ''}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
          <label className={styles.label} htmlFor='protectionStatus'>
            Статус защиты
          </label>
          <textarea
            className={styles.input}
            id='protectionStatus'
            value={formData.protectionStatus || ''}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>

      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='herbariumPresence'>
            Наличие в гербарии
          </label>
          <div className={styles.checkboxWrapper}>
            <input
              className={styles.checkbox}
              type='checkbox'
              id='herbariumPresence'
              checked={formData.herbariumPresence}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='herbariumDuplicate'>
            Дубликат гербария
          </label>
          <input
            className={styles.input}
            type='text'
            id='herbariumDuplicate'
            value={formData.herbariumDuplicate || ''}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          {/* Пустой элемент для сохранения сетки */}
        </div>
      </div>
    </div>
  );
};

export default UsageSection;
