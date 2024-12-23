import React, { useEffect, useState } from 'react';
import { fetchFamilies, fetchGenera } from '../../../api/plantService';
import { FormData } from '../../../types/types';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';

interface OptionType {
  id: number;
  name: string;
}

interface ClassificationSectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const ClassificationSection: React.FC<ClassificationSectionProps> = ({
  formData,
  handleChange,
}) => {
  const [families, setFamilies] = useState<OptionType[]>([]);
  const [genera, setGenera] = useState<OptionType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [familiesData, generaData] = await Promise.all([
          fetchFamilies(),
          fetchGenera()
        ]);
        setFamilies(familiesData);
        setGenera(generaData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='familyId'>
            Семейство
          </label>
          <select
            className={styles.input}
            id='familyId'
            value={formData.familyId || ''}
            onChange={handleChange}
          >
            <option value=''>Выберите семейство</option>
            {families.map((family) => (
              <option key={family.id} value={family.id}>
                {family.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='genusId'>
            Род
          </label>
          <select
            className={styles.input}
            id='genusId'
            value={formData.genusId || ''}
            onChange={handleChange}
          >
            <option value=''>Выберите род</option>
            {genera.map((genus) => (
              <option key={genus.id} value={genus.id}>
                {genus.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='subGenus'>
            Подрод
          </label>
          <input
            className={styles.input}
            type='text'
            id='subGenus'
            value={formData.subGenus || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassificationSection;
