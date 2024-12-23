import React from 'react';
import { FormData } from '../../../types/types';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface BiometricSectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const BiometricSection: React.FC<BiometricSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div>
      {/* Первая строка с тремя инпутами */}
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='yearOfObs'>
            Год наблюдения
          </label>
          <input
            className={styles.input}
            type='number'
            id='yearOfObs'
            value={formData.yearOfObs || ''}
            onChange={handleChange}
            min='1900'
            max='2100'
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='phenophaseDate'>
            Дата фенофазы
          </label>
          <input
            className={styles.input}
            type='date'
            id='phenophaseDate'
            value={formData.phenophaseDate || ''}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='measurementType'>
            Тип измерения
          </label>
          <select
            className={styles.input}
            id='measurementType'
            value={formData.measurementType || ''}
            onChange={handleChange}
          >
            <option value=''>Выберите тип</option>
            <option value='height'>Высота</option>
            <option value='diameter'>Диаметр</option>
            <option value='crown'>Крона</option>
            <option value='other'>Другое</option>
          </select>
        </div>
      </div>

      {/* Вторая строка с тремя инпутами */}
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='value'>
            Значение
          </label>
          <input
            className={styles.input}
            type='number'
            id='value'
            value={formData.value || ''}
            onChange={handleChange}
            step='0.01'
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='year'>
            Год
          </label>
          <input
            className={styles.input}
            type='number'
            id='year'
            value={formData.year || ''}
            onChange={handleChange}
            min='1900'
            max='2100'
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='dateOfPlanting'>
            Дата посадки
          </label>
          <input
            className={styles.input}
            type='date'
            id='dateOfPlanting'
            value={formData.dateOfPlanting || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BiometricSection;
