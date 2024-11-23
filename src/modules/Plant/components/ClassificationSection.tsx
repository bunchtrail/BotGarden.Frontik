
import React from 'react';
import Input from '../../../components/Form/TextInput';
import FormRow from '../../../components/Form/FormRow';
import { FormData } from '../../../context/FormContext';

interface ClassificationSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClassificationSection: React.FC<ClassificationSectionProps> = ({
  formData,
  handleChange,
}) => (
  <FormRow>
    <Input
      label='Species'
      id='species'
      value={formData.species}
      onChange={handleChange}
      placeholder='Введите вид'
    />
    <Input
      label='Synonyms'
      id='synonyms'
      value={formData.synonyms}
      onChange={handleChange}
      placeholder='Введите синонимы'
    />
    <Input
      label='Variety'
      id='variety'
      value={formData.variety}
      onChange={handleChange}
      placeholder='Введите разновидность'
    />
  </FormRow>
);

export default ClassificationSection;