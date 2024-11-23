
import React from 'react';
import Input from '../../../components/Form/TextInput';
import FormRow from '../../../components/Form/FormRow';
import { FormData } from '../../../context/FormContext';

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
      label='Latitude'
      id='latitude'
      value={formData.latitude}
      onChange={handleChange}
      placeholder='Введите широту'
    />
    <Input
      label='Longitude'
      id='longitude'
      value={formData.longitude}
      onChange={handleChange}
      placeholder='Введите долготу'
    />
    <Input
      label='Country'
      id='country'
      value={formData.country}
      onChange={handleChange}
      placeholder='Введите страну'
    />
  </FormRow>
);

export default LocationSection;