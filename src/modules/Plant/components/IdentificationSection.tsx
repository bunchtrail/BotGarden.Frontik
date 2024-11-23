import React from 'react';
import Input from '../../../components/Form/TextInput';
import FormRow from '../../../components/Form/FormRow';
import { FormData } from '../../../context/FormContext';

interface IdentificationSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  formData,
  handleChange,
}) => (
  <FormRow>
    <Input
      label='Inventor Number'
      id='inventorNumber'
      value={formData.inventorNumber}
      onChange={handleChange}
      placeholder='Введите номер инвентаризации'
    />
    <Input
      label='Family ID'
      id='familyId'
      value={formData.familyId}
      onChange={handleChange}
      placeholder='Введите ID семейства'
    />
    <Input
      label='Genus ID'
      id='genusId'
      value={formData.genusId}
      onChange={handleChange}
      placeholder='Введите ID рода'
    />
  </FormRow>
);

export default IdentificationSection;
