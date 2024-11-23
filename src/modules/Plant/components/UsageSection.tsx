// src/types/FormData.ts
export interface PlantFormData {
  economicUse?: string;
  protectionStatus?: string;
  // Add other form fields as needed
}

// src/modules/Plant/components/UsageSection.tsx
import React, { useContext } from 'react';
import Input from '../../../components/Form/TextInput';
import FormRow from '../../../components/Form/FormRow';

interface UsageSectionProps {
  formData: PlantFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsageSection: React.FC<UsageSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <FormRow>
      <Input
        label='Economic Use'
        id='economicUse'
        value={formData.economicUse || ''}
        onChange={handleChange}
        placeholder='Введите экономическое использование'
      />
      <Input
        label='Protection Status'
        id='protectionStatus'
        value={formData.protectionStatus || ''}
        onChange={handleChange}
        placeholder='Введите статус защиты'
      />
    </FormRow>
  );
};

export default UsageSection;
