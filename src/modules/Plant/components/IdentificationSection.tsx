import React from 'react';
import { FormData } from '../../../types/types';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface IdentificationSectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div>
      {/* Первая строка с тремя инпутами */}
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='inventorNumber'>
            Инвентарный номер
          </label>
          <input
            className={styles.input}
            type='text'
            id='inventorNumber'
            value={formData.inventorNumber || ''}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='species'>
            Вид
          </label>
          <input
            className={styles.input}
            type='text'
            id='species'
            value={formData.species || ''}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='variety'>
            Разновидность
          </label>
          <input
            className={styles.input}
            type='text'
            id='variety'
            value={formData.variety || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Вторая строка с тремя инпутами */}
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='form'>
            Форма
          </label>
          <input
            className={styles.input}
            type='text'
            id='form'
            value={formData.form || ''}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='determined'>
            Определил
          </label>
          <input
            className={styles.input}
            type='text'
            id='determined'
            value={formData.determined || ''}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='date'>
            Дата определения
          </label>
          <input
            className={styles.input}
            type='date'
            id='date'
            value={formData.date || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Третья строка с текстовой областью на всю ширину */}
      <div className={styles.inputRow}>
        <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
          <label className={styles.label} htmlFor='synonyms'>
            Синонимы
          </label>
          <textarea
            className={styles.input}
            id='synonyms'
            value={formData.synonyms || ''}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default IdentificationSection;
