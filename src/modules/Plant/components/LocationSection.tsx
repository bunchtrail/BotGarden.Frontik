import React from 'react';
import FormRow from '../../../components/Form/FormRow';
import Input from '../../../components/Form/TextInput';
import { FormData } from '../../../types/types';


interface LocationSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  handleChange,
}) => (
  <FormRow>
    <Input
      label='Широта'
      id='latitude'
      value={formData.latitude}
      onChange={handleChange}
      placeholder='Введите широту'
      required
    />
    <Input
      label='Долгота'
      id='longitude'
      value={formData.longitude}
      onChange={handleChange}
      placeholder='Введите долготу'
      required
    />
    <Input
      label='Страна'
      id='country'
      value={formData.country}
      onChange={handleChange}
      placeholder='Введите страну'
    />
  </FormRow>
);

export default LocationSection;
