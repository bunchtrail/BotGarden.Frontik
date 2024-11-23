
import React from 'react';
import Input from '../../../components/Form/TextInput';
import FormRow from '../../../components/Form/FormRow';
import { FormData } from '../../../context/FormContext';

interface OriginSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OriginSection: React.FC<OriginSectionProps> = ({
  formData,
  handleChange,
}) => (
  <FormRow>
    <Input
      label='Plant Origin'
      id='plantOrigin'
      value={formData.plantOrigin}
      onChange={handleChange}
      placeholder='Введите происхождение растения'
    />
    <Input
      label='Natural Habitat'
      id='naturalHabitat'
      value={formData.naturalHabitat}
      onChange={handleChange}
      placeholder='Введите естественную среду обитания'
    />
    <Input
      label='Ecology Biology'
      id='ecologyBiology'
      value={formData.ecologyBiology}
      onChange={handleChange}
      placeholder='Введите экологию и биологию'
    />
  </FormRow>
);

export default OriginSection;