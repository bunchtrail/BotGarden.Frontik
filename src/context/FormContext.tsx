
import React, { createContext, useState, ReactNode } from 'react';

interface FormData {
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
}

interface FormContextProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  saveData: () => void;
  resetForm: () => void;
}

export const FormContext = createContext<FormContextProps | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

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
  });

  const saveData = () => {
    console.log('Сохранение данных:', formData);
    // Добавьте вашу логику сохранения здесь
  };

  const resetForm = () => {
    setFormData({
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
    });
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, saveData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};