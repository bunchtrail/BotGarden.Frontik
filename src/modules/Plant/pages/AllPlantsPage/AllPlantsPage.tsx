// src/components/AllPlantsPage/AllPlantsPage.tsx

import React, { useEffect, useState } from 'react';
import { getPlantsBySector } from '../../../../api/plantService'; // Updated import path if needed
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
  const [plants, setPlants] = useState<Plant[]>([]); // Updated type
  const [isEditing, setIsEditing] = useState(false); // Новое состояние

  useEffect(() => {
    const fetchPlants = async () => {
      const fetchedPlants = await getPlantsBySector(sectorId);
      console.log('Fetched Plants:', fetchedPlants); // Log the entire array
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
      <PlantsTable
        plants={plants}
        onPlantUpdate={handlePlantUpdate}
        isEditing={isEditing}
      />{' '}
      {/* Передаём состояние */}
    </div>
  );
};

export default AllPlantsPage;
