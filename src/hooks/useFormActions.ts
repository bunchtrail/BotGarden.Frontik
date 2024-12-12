// src/hooks/useFormActions.ts

import { useContext, useState } from 'react';
import { savePlant } from '../api/plantService';
import { FormContext } from '../context/FormContext';
import { initialFormData, Plant } from '../types/types';

export const useFormActions = () => {
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error('useFormActions must be used within a FormProvider');
  }

  const { formData, setFormData } = formContext;
  const [loading, setLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const handleSave = async () => {
    // Валидация обязательных полей
    console.log(123)
    if (formData.genusId == null || isNaN(formData.genusId)) {
      setSaveError('Род не выбран.');
      return;
    }
    if (formData.familyId == null || isNaN(formData.familyId)) {
      setSaveError('Семейство не выбрано.');
      return;
    }

    setLoading(true);
    setSaveError(null);
    setSaveSuccess(null);

    try {
      const response = await savePlant(formData);
      if (response.success && response.data) {
        const savedPlant: Plant = response.data;
        setSaveSuccess(`Растение успешно сохранено! ID: ${savedPlant.id}`);
        setFormData(initialFormData); // Сброс формы после успешного сохранения
      } else {
        const errorMessage = response.message || 'Произошла ошибка при сохранении растения.';
        setSaveError(`Ошибка при сохранении растения: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('Ошибка при сохранении растения:', error);
      const errorMessage = error.response?.data?.message || 'Произошла ошибка при сохранении растения.';
      setSaveError(`Ошибка при сохранении растения: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSaveError(null);
    setSaveSuccess(null);
  };

  return { handleSave, handleReset, loading, saveError, saveSuccess };
};
