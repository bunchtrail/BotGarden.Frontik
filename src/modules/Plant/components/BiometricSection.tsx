import React from 'react';
import FormRow from '../../../components/Form/FormRow';
import Input from '../../../components/Form/TextInput';
import { FormData } from '../../../types/types';

interface BiometricSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BiometricSection: React.FC<BiometricSectionProps> = ({
  formData,
  handleChange,
}) => (
  <>
    <FormRow>
      <Input
        label='ID Биометрии'
        id='biometricId'
        value={formData.biometricId}
        onChange={handleChange}
        placeholder='Введите ID биометрии'
      />
      <Input
        label='Год Наблюдения'
        id='yearOfObs'
        value={formData.yearOfObs}
        onChange={handleChange}
        placeholder='Введите год наблюдения'
      />
      <Input
        label='Дата Фенофазы'
        id='phenophaseDate'
        type='date'
        value={formData.phenophaseDate}
        onChange={handleChange}
      />
    </FormRow>
    <FormRow>
      <Input
        label='Год'
        id='year'
        value={formData.year}
        onChange={handleChange}
        placeholder='Введите год'
      />
      <Input
        label='Тип Измерения'
        id='measurementType'
        value={formData.measurementType}
        onChange={handleChange}
        placeholder='Введите тип измерения'
      />
      <Input
        label='Значение'
        id='value'
        value={formData.value}
        onChange={handleChange}
        placeholder='Введите значение'
      />
    </FormRow>
  </>
);

export default BiometricSection;
