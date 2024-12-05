// src/hooks/useFormActions.ts
import { useContext } from 'react';
import { savePlant } from '../api/plantService'; // Обновленный путь
import { FormContext } from '../context/FormContext';
import { initialFormData, Plant } from '../types/types';

export const useFormActions = () => {
  const formContext = useContext(FormContext);
  if (!formContext) {
    throw new Error('useFormActions must be used within a FormProvider');
  }

  const { formData, setFormData } = formContext;

  const handleSave = async () => {
    if (formData.genusId == null || isNaN(formData.genusId)) {
      alert('Род не выбран.');
      return;
    }
    if (formData.familyId == null || isNaN(formData.familyId)) {
      alert('Семейство не выбрано.');
      return;
    }
    try {
      const response = await savePlant(formData);
      const savedPlant: Plant = await response.json();
      alert(`Растение успешно сохранено! ID: ${savedPlant.id}`);
      setFormData(initialFormData); // Сброс формы после успешного сохранения
    } catch (error: any) {
      console.error('Ошибка:', error);
      const errorMessage = error.response?.data?.message || 'Произошла ошибка при сохранении растения.';
      alert(`Ошибка при сохранении растения: ${errorMessage}`);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return { handleSave, handleReset };
};
