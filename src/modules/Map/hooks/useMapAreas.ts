// src/hooks/useMapAreas.ts

import { useEffect, useState } from 'react';
import { addAreaToServer, AreaData, deleteAreaOnServer, fetchAreas, updateAreaOnServer } from '../services/mapService';

const useMapAreas = () => {
  const [areas, setAreas] = useState<AreaData[]>([]);

  const loadAreas = async () => {
    const data = await fetchAreas();
    setAreas(data);
  };

  useEffect(() => {
    loadAreas();
  }, []);

  const addArea = async (area: AreaData) => {
    const res = await addAreaToServer(area);
    if (res) {
      await loadAreas(); // Перезагружает области после добавления
    }
  };

  const updateArea = async (updatedArea: AreaData) => {
    const res = await updateAreaOnServer(updatedArea);
    if (res) {
      await loadAreas(); // Перезагружает области после обновления
    }
  };

  const deleteArea = async (id: number) => {
    const res = await deleteAreaOnServer(id);
    if (res) {
      await loadAreas(); // Перезагружает области после удаления
    }
  };

  const reloadAreas = async () => {
    await loadAreas(); // Позволяет вручную перезагрузить области
  };

  return {
    areas,
    addArea,
    updateArea,
    deleteArea,
    reloadAreas,
  };
};

export default useMapAreas;
