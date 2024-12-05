import React from 'react';
import FormRow from '../../../components/Form/FormRow';
import Input from '../../../components/Form/TextInput';
import { FormData } from '../../../types/types';

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
        label='Дата Посадки'
        id='dateOfPlanting'
        type='date'
        value={formData.dateOfPlanting}
        onChange={handleChange}
      />
      <Input
        label='Дата'
        id='date'
        type='date'
        value={formData.date}
        onChange={handleChange}
      />
      <Input
        label='Инициатор'
        id='originator'
        value={formData.originator}
        onChange={handleChange}
        placeholder='Введите инициатора'
      />
    </FormRow>
    <FormRow>
      <Input
        label='Наличие Гербария'
        id='herbariumPresence'
        value={formData.herbariumPresence.toString()}
        onChange={handleChange}
        placeholder='Введите наличие гербария'
      />
      <Input
        label='Дубликат Гербария'
        id='herbariumDuplicate'
        value={formData.herbariumDuplicate}
        onChange={handleChange}
        placeholder='Введите дубликат гербария'
      />
      <Input
        label='Заполнено'
        id='filledOut'
        value={formData.filledOut}
        onChange={handleChange}
        placeholder='Введите заполнено'
      />
    </FormRow>
    <FormRow>
      <Input
        label='Путь к Изображению'
        id='imagePath'
        value={formData.imagePath}
        onChange={handleChange}
        placeholder='Введите путь к изображению'
      />
      <Input
        label='Заметка'
        id='note'
        value={formData.note}
        onChange={handleChange}
        placeholder='Введите заметку'
      />
    </FormRow>
  </>
);

export default AdditionalSection;
