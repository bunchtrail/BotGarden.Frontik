
import React from 'react';
import Input from '../../../components/Form/TextInput';
import FormRow from '../../../components/Form/FormRow';
import { FormData } from '../../../context/FormContext';

interface AdditionalSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdditionalSection: React.FC<AdditionalSectionProps> = ({
  formData,
  handleChange,
}) => (
  <>
    <FormRow>
      <Input
        label='Date Of Planting'
        id='dateOfPlanting'
        type='date'
        value={formData.dateOfPlanting}
        onChange={handleChange}
      />
      <Input
        label='Date'
        id='date'
        type='date'
        value={formData.date}
        onChange={handleChange}
      />
      <Input
        label='Originator'
        id='originator'
        value={formData.originator}
        onChange={handleChange}
        placeholder='Введите инициатора'
      />
    </FormRow>
    <FormRow>
      <Input
        label='Herbarium Presence'
        id='herbariumPresence'
        value={formData.herbariumPresence}
        onChange={handleChange}
        placeholder='Введите наличие гербария'
      />
      <Input
        label='Herbarium Duplicate'
        id='herbariumDuplicate'
        value={formData.herbariumDuplicate}
        onChange={handleChange}
        placeholder='Введите дубликат гербария'
      />
      <Input
        label='Filled Out'
        id='filledOut'
        value={formData.filledOut}
        onChange={handleChange}
        placeholder='Введите заполнено'
      />
    </FormRow>
    <FormRow>
      <Input
        label='Image Path'
        id='imagePath'
        value={formData.imagePath}
        onChange={handleChange}
        placeholder='Введите путь к изображению'
      />
      <Input
        label='Note'
        id='note'
        value={formData.note}
        onChange={handleChange}
        placeholder='Введите заметку'
      />
    </FormRow>
  </>
);

export default AdditionalSection;