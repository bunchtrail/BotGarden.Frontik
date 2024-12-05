// src/components/AllPlantsPage/AllPlantsPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlantsBySector } from '../../../../api/plantService'; // Updated import path if needed
import Button from '../../../../components/Button/Button';
import Navbar from '../../../../components/Navbar/Navbar';
import { Plant } from '../../../../types/types'; // Import Plant type
import styles from './AllPlantsPage.module.css';
import PlantsTable from './PlantsTable';
interface AllPlantPageProp {
  sectorId: number;
  searchTerm: string;
}
const AllPlantsPage: React.FC<AllPlantPageProp> = ({
  sectorId,
  searchTerm,
}) => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState<Plant[]>([]); // Updated type
  const [isEditing, setIsEditing] = useState(false); // Новое состояние

  useEffect(() => {
    const fetchPlants = async () => {
      const fetchedPlants = await getPlantsBySector(sectorId);
      setPlants(fetchedPlants);
    };
    fetchPlants();
  }, [sectorId]);

  const handlePlantUpdate = (updatedPlant: Plant) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  function handleSearchChange(query: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={styles.plantsAllContainer}>
      <Navbar
        sectorId={sectorId}
        pageType='all-plants'
        onSearch={handleSearchChange}
        isEditing={isEditing} // Передаём состояние
        toggleEditing={toggleEditing} // Передаём функцию переключения
      />
      {plants.length === 0 ? (
        <>
          <h1>Растения в данном разделе отсутствуют</h1>
          <Button
            key={sectorId}
            onClick={() => navigate(`/add-plant/${sectorId}`)}
            
          >Добавить растение </Button>
        </>
      ) : (
        <PlantsTable
          plants={plants}
          onPlantUpdate={handlePlantUpdate}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default AllPlantsPage;
