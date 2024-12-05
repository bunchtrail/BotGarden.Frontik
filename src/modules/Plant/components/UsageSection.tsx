import React from 'react';
import Input from '../../../components/Form/TextInput';
import FormRow from '../../../components/Form/FormRow';
import { FormData } from '../../../types/types';


interface UsageSectionProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsageSection: React.FC<UsageSectionProps> = ({
  formData,
  handleChange,
}) => (
  <FormRow>
    <Input
      label='Экономическое Использование'
      id='economicUse'
      value={formData.economicUse}
      onChange={handleChange}
      placeholder='Введите экономическое использование'
    />
    <Input
      label='Статус Защиты'
      id='protectionStatus'
      value={formData.protectionStatus}
      onChange={handleChange}
      placeholder='Введите статус защиты'
    />
  </FormRow>
);

export default UsageSection;
