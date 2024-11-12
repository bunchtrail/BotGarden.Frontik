// src/modules/Plants/components/PlantForm/PlantForm.tsx

import React, { useState } from 'react';
import FormRow from '../../../../components/Form/FormRow';
import FormGroup from '../../../../components/Form/FormGroup';
import TextInput from '../../../../components/Form/TextInput';
import SelectInput from '../../../../components/Form/SelectInput';
import { PlantFormData } from '../../types/plantTypes';
import { addPlant } from '../../services/plantService';
import './PlantForm.css';

const PlantForm: React.FC<{ sectorId: number; onSuccess?: () => void }> = ({
  sectorId,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<PlantFormData>({
    name: '',
    species: '',
    age: 0,
    description: '',
    sectorId,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await addPlant(formData);
      setLoading(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setLoading(false);
      setError('Ошибка при добавлении растения. Попробуйте снова.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='plant-form'>
      <FormRow>
        <FormGroup label='Название' htmlFor='name' colSize={6}>
          <TextInput
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup label='Вид' htmlFor='species' colSize={6}>
          <TextInput
            id='species'
            name='species'
            value={formData.species}
            onChange={handleChange}
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup label='Возраст' htmlFor='age' colSize={4}>
          <TextInput
            id='age'
            name='age'
            value={formData.age.toString()}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup label='Описание' htmlFor='description' colSize={12}>
          <textarea
            id='description'
            name='description'
            className='form-control'
            value={formData.description}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLTextAreaElement>)
            }
            rows={4}
          />
        </FormGroup>
      </FormRow>

      {error && <div className='error-message'>{error}</div>}

      <FormRow>
        <button type='submit' className='btn btn-primary' disabled={loading}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </FormRow>
    </form>
  );
};

export default PlantForm;
