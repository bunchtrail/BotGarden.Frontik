import React, { createContext, useState, ReactNode } from 'react';

// Определяем интерфейс для данных формы и экспортируем его
export interface FormData {
  inventorNumber: string;
  familyId: string;
  genusId: string;
  species: string;
  synonyms: string;
  variety: string;
  plantOrigin: string;
  naturalHabitat: string;
  ecologyBiology: string;
  economicUse: string;
  protectionStatus: string;
  latitude: string;
  longitude: string;
  country: string;
  dateOfPlanting: string;
  date: string;
  originator: string;
  herbariumPresence: string;
  herbariumDuplicate: string;
  filledOut: string;
  imagePath: string;
  note: string;
  // ...другие поля...
}

// Определяем тип для контекста формы
interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

// Создаём и экспортируем контекст
export const FormContext = createContext<FormContextType | undefined>(undefined);

// Определяем тип для пропсов FormProvider
interface FormProviderProps {
  children: ReactNode;
}

// Создаём и экспортируем провайдер контекста с правильной типизацией
export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    inventorNumber: '',
    familyId: '',
    genusId: '',
    species: '',
    synonyms: '',
    variety: '',
    plantOrigin: '',
    naturalHabitat: '',
    ecologyBiology: '',
    economicUse: '',
    protectionStatus: '',
    latitude: '',
    longitude: '',
    country: '',
    dateOfPlanting: '',
    date: '',
    originator: '',
    herbariumPresence: '',
    herbariumDuplicate: '',
    filledOut: '',
    imagePath: '',
    note: '',
    // ...инициализация других полей...
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
