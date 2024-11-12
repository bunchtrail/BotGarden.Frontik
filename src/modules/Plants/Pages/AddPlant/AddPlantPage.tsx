// src/modules/Plants/pages/AddPlantPage/AddPlantPage.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlantForm from '../../components/PlantForm/PlantForm';
import './AddPlantPage.css';

const AddPlantPage: React.FC = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const navigate = useNavigate();

  if (!sectorId) {
    return <div>Сектор не указан.</div>;
  }

  const handleSuccess = () => {
    // Перенаправление на страницу сектора или другую страницу после успешного добавления
    navigate(`/sectors/${sectorId}`);
  };

  return (
    <div className='add-plant-page'>
      <h1>Добавить растение в сектор: {sectorId}</h1>
      <PlantForm sectorId={parseInt(sectorId, 10)} onSuccess={handleSuccess} />
    </div>
  );
};

export default AddPlantPage;
