// src/modules/Map/pages/MapPage.tsx
import { Layer, Polygon } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import { AreaPathModal } from '../components/AreaPathModal/AreaPathModal';
import { MapView } from '../components/MapView/MapView';
import {
  addAreaToServer,
  AreaData,
  deleteAreaOnServer,
  fetchAreas,
  fetchMapImage,
  updateAreaOnServer,
} from '../services/mapService';
import { MapMode } from '../types/mapControls';
import { uploadMapFile } from '../utils/mapUploader';
import styles from './MapPage.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7076';

const MapPage: React.FC = () => {
  const [mapImageURL, setMapImageURL] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<MapMode>(MapMode.VIEW);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingArea, setPendingArea] = useState<Layer | null>(null);
  const [areas, setAreas] = useState<AreaData[]>([]);

  // Загрузка областей и карты при монтировании
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedAreas = await fetchAreas();
        setAreas(fetchedAreas);

        const mapPath = await fetchMapImage();
        console.log('Fetched map path:', mapPath); // Для отладки
        console.log('API_BASE_URL:', API_BASE_URL); // Для отладки

        if (mapPath) {
          const normalizedPath = mapPath.replace(/\\/g, '/');
          const fullURL = `${API_BASE_URL}/${normalizedPath}`;
          console.log('Full image URL:', fullURL); // Для отладки
          setMapImageURL(fullURL);
        } else {
          console.log('No map path received from server'); // Для отладки
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const handleAction = (action: string) => {
    switch (action) {
      case 'upload-image':
        fileInputRef.current?.click();
        break;
      case 'add-plant':
        setCurrentMode(MapMode.ADD_PLANT);
        break;
      case 'add-area':
        setCurrentMode(MapMode.ADD_AREA);
        break;
      case 'edit-area':
        setCurrentMode(MapMode.EDIT_AREA);
        break;
      case 'edit-plant':
        setCurrentMode(MapMode.EDIT_PLANT);
        break;
      case 'remove-plant':
        setCurrentMode(MapMode.REMOVE_PLANT);
        break;
      default:
        console.warn(`Нет обработчика для действия: ${action}`);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const path = await uploadMapFile(file);
      if (path) {
        // Нормализуем путь и убираем лишние кавычки
        const normalizedPath = path.replace(/\\/g, '/').replace(/"/g, '');
        const fullURL = `${API_BASE_URL}/${normalizedPath}`;
        console.log('Full image URL after upload:', fullURL); // Для отладки
        setMapImageURL(fullURL);
      }
      event.target.value = '';
    }
  };

  const handleAreaCreated = (area: Layer) => {
    setPendingArea(area);
  };

  const handlePathSave = async (path: string) => {
    if (pendingArea && pendingArea instanceof Polygon) {
      try {
        const latLngs = pendingArea.getLatLngs()[0] as L.LatLng[];
        const coordinates = latLngs.map(
          (ll) => [ll.lat, ll.lng] as [number, number]
        );

        const areaData: AreaData = {
          id: 0,
          positions: coordinates,
          title: path,
          description: '',
        };

        const result = await addAreaToServer(areaData);
        if (result) {
          setAreas((prev) => [
            ...prev,
            {
              ...areaData,
              id: result.LocationId,
            },
          ]);
          setPendingArea(null);
          setCurrentMode(MapMode.VIEW);
        }
      } catch (error) {
        console.error('Не удалось сохранить область:', error);
      }
    }
  };

  const handlePathCancel = () => {
    if (pendingArea) {
      // Удаляем нарисованную область
      const map = (pendingArea as any)._map;
      if (map) {
        map.removeLayer(pendingArea);
      }
    }
    setPendingArea(null);
    setCurrentMode(MapMode.VIEW);
  };

  const handleAreaEdited = async (
    areaId: number,
    newPositions: [number, number][]
  ) => {
    const areaToUpdate = areas.find((a) => a.id === areaId);
    if (!areaToUpdate) return;

    const updatedArea: AreaData = {
      ...areaToUpdate,
      positions: newPositions,
    };

    const result = await updateAreaOnServer(updatedArea);
    if (result) {
      setAreas((prev) =>
        prev.map((area) =>
          area.id === areaId ? { ...area, positions: newPositions } : area
        )
      );
      setCurrentMode(MapMode.VIEW);
    }
  };

  const handleAreaDeleted = async (areaId: number) => {
    const confirmed = window.confirm(
      'Вы уверены, что хотите удалить эту область?'
    );
    if (!confirmed) return;

    const success = await deleteAreaOnServer(areaId);
    if (success) {
      setAreas((prev) => prev.filter((area) => area.id !== areaId));
      setCurrentMode(MapMode.VIEW);
    }
  };

  return (
    <>
      <Navbar pageType='map' onAction={handleAction} />

      <div className={styles.mapPageContainer}>
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept='image/*'
          onChange={handleFileChange}
        />
        <div className={styles.mapWrapper}>
          <MapView
            mapImageURL={mapImageURL}
            mode={currentMode}
            areas={areas}
            onAreaCreated={handleAreaCreated}
            onAreaEdited={handleAreaEdited}
            onAreaDeleted={handleAreaDeleted}
          />
          {pendingArea && (
            <AreaPathModal
              onSave={handlePathSave}
              onCancel={handlePathCancel}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MapPage;
