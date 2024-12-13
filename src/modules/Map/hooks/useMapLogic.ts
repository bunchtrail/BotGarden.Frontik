// src/modules/Map/hooks/useMapLogic.ts
import { useState } from 'react';

type Mode = 'view' | 'add-plant' | 'add-area' | 'edit-area' | 'edit-plant' | 'remove-plant';

export interface Plant {
  id: number;
  name: string;
  coordinates: [number, number];
  areaId?: number;
}

export interface Area {
  id: number;
  name: string;
  coordinates: [number, number][];
}

export function useMapLogic() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [mode, setMode] = useState<Mode>('view');

  const handleAddPlantMode = () => setMode('add-plant');
  const handleAddAreaMode = () => setMode('add-area');
  const handleEditAreaMode = () => setMode('edit-area');
  const handleEditPlantMode = () => setMode('edit-plant');
  const handleRemovePlantMode = () => setMode('remove-plant');

  const handleMapClick = (e: any) => {
    if (mode === 'add-plant') {
      const coords = e.get('coords');
      const newPlant: Plant = {
        id: Date.now(),
        name: 'Новое растение',
        coordinates: coords,
      };
      setPlants((prev) => [...prev, newPlant]);
      setMode('view');
    }

    if (mode === 'add-area') {
      const coords = e.get('coords');
      const newArea: Area = {
        id: Date.now(),
        name: 'Новая область',
        coordinates: [
          coords,
          [coords[0] + 0.01, coords[1]],
          [coords[0], coords[1] + 0.01],
        ],
      };
      setAreas((prev) => [...prev, newArea]);
      setMode('view');
    }
  };

  const handlePlacemarkClick = (plantId: number) => {
    if (mode === 'edit-plant') {
      // Открыть модалку для редактирования
      setMode('view');
    } else if (mode === 'remove-plant') {
      setPlants((prev) => prev.filter((p) => p.id !== plantId));
      setMode('view');
    }
  };

  const handlePolygonClick = (areaId: number) => {
    if (mode === 'edit-area') {
      // Открыть модалку для редактирования
      setMode('view');
    }
  };

  return {
    areas,
    plants,
    mode,
    handleAddPlantMode,
    handleAddAreaMode,
    handleEditAreaMode,
    handleEditPlantMode,
    handleRemovePlantMode,
    handleMapClick,
    handlePlacemarkClick,
    handlePolygonClick,
  };
}
