// src/hooks/usePlants.ts
import { useEffect, useState } from 'react';
import { fetchPlantsBySector } from '../services/apiService';
import { Plant } from '../types/types';

export const usePlants = (sectorId: number) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPlants = async () => {
      setLoading(true);
      try {
        const data = await fetchPlantsBySector(sectorId);
        setPlants(data);
      } catch (err) {
        setError('Ошибка при загрузке растений');
      } finally {
        setLoading(false);
      }
    };

    if (sectorId) {
      getPlants();
    }
  }, [sectorId]);

  return { plants, loading, error };
};
