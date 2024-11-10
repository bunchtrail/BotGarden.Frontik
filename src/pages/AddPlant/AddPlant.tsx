// src/pages/AddPlant/AddPlant.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface AddPlantPageProps {}

const AddPlantPage: React.FC<AddPlantPageProps> = () => {
  const { sectorId } = useParams<{ sectorId: string }>();

  const numericSectorId = sectorId ? parseInt(sectorId, 10) : 0;

  const handleSave = (formState: any) => {
    // Реализация сохранения данных с использованием numericSectorId
    console.log('Сохранение данных для сектора:', numericSectorId);
    // Добавьте вашу логику сохранения здесь
  };

  return (
    <div>
      <h1>Add Plant - Sector ID: {numericSectorId}</h1>
      {/* Ваша форма для добавления растения */}
      <button onClick={() => handleSave({})}>Save</button>
    </div>
  );
};

export default AddPlantPage;
