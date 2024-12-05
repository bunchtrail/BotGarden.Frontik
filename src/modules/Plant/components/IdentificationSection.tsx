import React, { useEffect, useState } from 'react';
import { fetchFamilies, fetchGenera } from '../../../api';
import FormRow from '../../../components/Form/FormRow';
import Select from '../../../components/Form/Select';
import Input from '../../../components/Form/TextInput';
import { FormData } from '../../../types/types';
import styles from './IdentificationSection.module.css';

interface IdentificationSectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

interface OptionType {
  id: number;
  name: string;
}

const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  formData,
  handleChange,
}) => {
  const [families, setFamilies] = useState<OptionType[]>([]);
  const [genera, setGenera] = useState<OptionType[]>([]);

  useEffect(() => {
    fetchFamilies().then((data) =>
      setFamilies(data.map((family) => ({ id: family.id, name: family.name })))
    );
    fetchGenera().then((data) =>
      setGenera(data.map((genus) => ({ id: genus.id, name: genus.name })))
    );
  }, []);
  return (
    <>
      <FormRow className={styles.formRow}>
        <Input
          label='Инвентарный Номер'
          id='inventorNumber'
          value={formData.inventorNumber}
          onChange={handleChange}
          placeholder='Введите инвентарный номер'
        />
        <Select
          label='Семейство'
          id='familyId'
          value={formData.familyId || ''}
          onChange={handleChange}
          options={families}
          placeholder='Выберите семейство'
        />
        {formData.familyId === undefined && (
          <span className={styles.error}>Семейство обязательно.</span>
        )}
        <Select
          label='Род'
          id='genusId'
          value={formData.genusId || ''}
          onChange={handleChange}
          options={genera}
          placeholder='Выберите род'
        />
        {formData.genusId === undefined && (
          <span className={styles.error}>Род обязателен.</span>
        )}
      </FormRow>
    </>
  );
};

export default IdentificationSection;
