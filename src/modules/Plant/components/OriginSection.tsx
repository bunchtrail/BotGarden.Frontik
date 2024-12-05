import React from 'react';
import Input from '../../../components/Form/TextInput';
import FormRow from '../../../components/Form/FormRow';
import { FormData } from '../../../types/types';


interface OriginSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OriginSection: React.FC<OriginSectionProps> = ({
  formData,
  handleChange,
}) => (
  <>
    <FormRow>
      <Input
        label='Происхождение Растения'
        id='plantOrigin'
        value={formData.plantOrigin}
        onChange={handleChange}
        placeholder='Введите происхождение растения'
      />
      <Input
        label='Естественная Среда Обитания'
        id='naturalHabitat'
        value={formData.naturalHabitat}
        onChange={handleChange}
        placeholder='Введите естественную среду обитания'
      />
      <Input
        label='Экология и Биология'
        id='ecologyBiology'
        value={formData.ecologyBiology}
        onChange={handleChange}
        placeholder='Введите экологию и биологию'
      />
    </FormRow>
    <FormRow>
      <Input
        label='Определено'
        id='determined'
        value={formData.determined}
        onChange={handleChange}
        placeholder='Введите информацию об определении'
      />
    </FormRow>
  </>
);

export default OriginSection;
