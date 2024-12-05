// src/components/AllPlantsPage/AllPlantsPage.tsx

import React, { useEffect, useState } from 'react';
import { getPlantsBySector } from '../../../../api/plantService'; // Updated import path if needed
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

  return (
    <div className={styles.plantsAllContainer}>
      <PlantsTable plants={plants} onPlantUpdate={handlePlantUpdate} />
    </div>
  );
};

export default AllPlantsPage;
