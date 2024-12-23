// src/hooks/useFormActions.ts

import { useContext, useState } from 'react';
import { savePlant } from '../api/plantService';
import { FormContext } from '../context/FormContext';
import { initialFormData } from '../types/types';

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
    console.group('🌿 Сохранение растения');
    console.log('📝 Исходные данные формы:', formData);

    // Валидация обязательных полей
    if (!formData.genusId) {
      console.error('❌ Ошибка: Род не выбран');
      console.groupEnd();
      setSaveError('Род не выбран.');
      return;
    }
    if (!formData.familyId) {
      console.error('❌ Ошибка: Семейство не выбрано');
      console.groupEnd();
      setSaveError('Семейство не выбрано.');
      return;
    }
    if (!formData.sectorId) {
      console.error('❌ Ошибка: Сектор не выбран');
      console.groupEnd();
      setSaveError('Сектор не выбран.');
      return;
    }

    // Преобразование данных перед отправкой
    const dataToSend = {
      ...formData,
      // Убедимся, что числовые поля имеют правильный тип
      familyId: formData.familyId || null,
      biometricId: formData.biometricId || null,
      sectorId: formData.sectorId || null,
      genusId: formData.genusId || null,
      // Координаты должны быть числами, не null
      latitude: formData.latitude || 0,
      longitude: formData.longitude || 0,
      // Строковые поля
      inventorNumber: formData.inventorNumber,
      species: formData.species,
      variety: formData.variety,
      form: formData.form,
      determined: formData.determined,
      yearOfObs: formData.yearOfObs,
      phenophaseDate: formData.phenophaseDate,
      year: formData.year,
      measurementType: formData.measurementType,
      value: formData.value,
      dateOfPlanting: formData.dateOfPlanting,
      protectionStatus: formData.protectionStatus,
      filledOut: formData.filledOut,
      herbariumDuplicate: formData.herbariumDuplicate,
      synonyms: formData.synonyms,
      plantOrigin: formData.plantOrigin,
      naturalHabitat: formData.naturalHabitat,
      ecologyBiology: formData.ecologyBiology,
      economicUse: formData.economicUse,
      originator: formData.originator,
      date: formData.date,
      country: formData.country,
      imagePath: formData.imagePath,
      note: formData.note,
      // Булево значение
      herbariumPresence: formData.herbariumPresence
    };

    console.log('📦 Подготовленные данные для отправки:', {
      ...dataToSend,
      _transformations: {
        familyId: `${formData.familyId} -> ${dataToSend.familyId}`,
        biometricId: `${formData.biometricId} -> ${dataToSend.biometricId}`,
        sectorId: `${formData.sectorId} -> ${dataToSend.sectorId}`,
        genusId: `${formData.genusId} -> ${dataToSend.genusId}`,
        latitude: `${formData.latitude} -> ${dataToSend.latitude}`,
        longitude: `${formData.longitude} -> ${dataToSend.longitude}`,
        herbariumPresence: `${formData.herbariumPresence} -> ${dataToSend.herbariumPresence}`
      }
    });

    setLoading(true);
    setSaveError(null);
    setSaveSuccess(null);

    try {
      console.log('🚀 Отправка запроса на сервер...');
      const response = await savePlant(dataToSend);
      console.log('✅ Ответ сервера:', response);

      if (response.success && response.data) {
        const savedPlant = response.data;
        console.log('💾 Сохраненное растение:', savedPlant);
        console.log('🔄 Сравнение отправленных и сохраненных данных:', {
          sent: dataToSend,
          saved: savedPlant,
          differences: Object.keys(dataToSend).reduce((acc, key) => {
            if (dataToSend[key] !== savedPlant[key]) {
              acc[key] = {
                sent: dataToSend[key],
                saved: savedPlant[key]
              };
            }
            return acc;
          }, {})
        });

        setSaveSuccess(`Растение успешно сохранено! ID: ${savedPlant.id}`);
        setFormData(initialFormData); // Сброс формы после успешного сохранения
      } else {
        const errorMessage = response.message || 'Произошла ошибка при сохранении растения.';
        console.error('❌ Ошибка при сохранении:', errorMessage);
        setSaveError(`Ошибка при сохранении растения: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('❌ Ошибка при отправке запроса:', error);
      console.error('Детали ошибки:', {
        message: error.message,
        response: error.response,
        stack: error.stack
      });
      const errorMessage = error.response?.data?.message || 'Произошла ошибка при сохранении растения.';
      setSaveError(`Ошибка при сохранении растения: ${errorMessage}`);
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSaveError(null);
    setSaveSuccess(null);
  };

  return { handleSave, handleReset, loading, saveError, saveSuccess };
};
