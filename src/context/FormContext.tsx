// src/context/FormContext.tsx
import React, { createContext, ReactNode, useState } from 'react';
import { initialFormData, FormData } from '../types/types';

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
