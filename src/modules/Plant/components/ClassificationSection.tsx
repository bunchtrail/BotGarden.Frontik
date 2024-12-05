import React from 'react';
import FormRow from '../../../components/Form/FormRow';
import Input from '../../../components/Form/TextInput';
import { FormData } from '../../../types/types';

interface ClassificationSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClassificationSection: React.FC<ClassificationSectionProps> = ({
  formData,
  handleChange,
}) => (
  <>
    <FormRow>
      <Input
        label='Вид'
        id='species'
        value={formData.species}
        onChange={handleChange}
        placeholder='Введите вид'
      />
      <Input
        label='Синонимы'
        id='synonyms'
        value={formData.synonyms}
        onChange={handleChange}
        placeholder='Введите синонимы'
      />
      <Input
        label='Разновидность'
        id='variety'
        value={formData.variety}
        onChange={handleChange}
        placeholder='Введите разновидность'
      />
    </FormRow>
    <FormRow>
      <Input
        label='Форма'
        id='form'
        value={formData.form}
        onChange={handleChange}
        placeholder='Введите форму'
      />
    </FormRow>
  </>
);

export default ClassificationSection;
