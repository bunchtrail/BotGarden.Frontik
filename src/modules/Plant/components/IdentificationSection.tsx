import React, { useEffect, useState } from 'react';
import { fetchFamilies, fetchGenera } from '../../../api/plantService';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface OptionType {
  id: number;
  name: string;
}

interface IdentificationSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  formData,
  handleChange,
}) => {
  const [families, setFamilies] = useState<OptionType[]>([]);
  const [genera, setGenera] = useState<OptionType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const familiesData = await fetchFamilies();
        setFamilies(familiesData);
        
        const generaData = await fetchGenera();
        setGenera(generaData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className={styles.formRow}>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="inventorNumber">
          Инвентарный Номер
        </label>
        <input
          className={styles.inputField}
          id="inventorNumber"
          value={formData.inventorNumber || ''}
          onChange={handleChange}
          placeholder="Введите инвентарный номер"
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="familyId">
          Семейство
        </label>
        <select
          className={styles.inputField}
          id="familyId"
          value={formData.familyId || ''}
          onChange={handleChange}
        >
          <option value="" disabled>
            Выберите семейство
          </option>
          {families.map((family) => (
            <option key={family.id} value={family.id}>
              {family.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor="genusId">
          Род
        </label>
        <select
          className={styles.inputField}
          id="genusId"
          value={formData.genusId || ''}
          onChange={handleChange}
        >
          <option value="" disabled>
            Выберите род
          </option>
          {genera.map((genus) => (
            <option key={genus.id} value={genus.id}>
              {genus.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default IdentificationSection;
