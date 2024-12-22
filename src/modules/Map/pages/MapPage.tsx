// src/modules/Map/pages/MapPage.tsx
import { Layer, Polygon } from 'leaflet';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import useDebounce from '../../../hooks/useDebounce';
// import { useOptimizedImage } from '../../../hooks/useOptimizedImage'; // Удалено
import { SearchableColumn } from '../../../types/types';
import { AreaPathModal } from '../components/AreaPathModal/AreaPathModal';
import { MapView } from '../components/MapView/MapView';
import {
  addAreaToServer,
  AreaData,
  deleteAreaOnServer,
  fetchAreas,
  fetchMapImage,
  fetchMarkers,
  MarkerData,
  updateAreaOnServer,
  uploadMapImage,
} from '../services/mapService';
import { MapMode } from '../types/mapControls';
import styles from './MapPage.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const MapPage: React.FC = () => {
  const [mapImageURL, setMapImageURL] = useState<string | null>(null);
  // const optimizedMapImageURL = useOptimizedImage({
  //   originalUrl: mapImageURL,
  //   maxWidth: 2048,
  //   maxHeight: 2048,
  // });
  const [currentMode, setCurrentMode] = useState<MapMode>(MapMode.VIEW);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingArea, setPendingArea] = useState<Layer | null>(null);
  const [areas, setAreas] = useState<AreaData[]>([]);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // States for search
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // Доступные для поиска колонки
  const searchableColumns: SearchableColumn[] = useMemo(() => {
    return [
      { field: 'plantId', label: 'ID растения' },
      { field: 'species', label: 'Вид' },
      { field: 'variety', label: 'Разновидность' },
      { field: 'note', label: 'Примечание' },
    ];
  }, []);

  // Фильтрация маркеров
  const filteredMarkers = useMemo(() => {
    if (!debouncedSearchQuery.trim() || selectedColumns.length === 0) {
      return markers;
    }
    const lowerCaseQuery = debouncedSearchQuery.toLowerCase();
    return markers.filter((marker) => {
      return selectedColumns.some((col) => {
        const value = marker[col as keyof MarkerData];
        if (value == null) return false;
        return String(value).toLowerCase().includes(lowerCaseQuery);
      });
    });
  }, [markers, debouncedSearchQuery, selectedColumns]);

  // Загрузка областей и карты
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedAreas = await fetchAreas();
        setAreas(fetchedAreas);

        const mapPath = await fetchMapImage();
        if (mapPath) {
          // Формируем прямой URL к изображению
          const fullURL = `${API_BASE_URL}/${mapPath}`.replace(
            /([^:])(\/\/+)/g,
            '$1/'
          );
          setMapImageURL(fullURL);
        } else {
          console.log('No map path received from server');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Загрузка маркеров
  useEffect(() => {
    const loadMarkers = async () => {
      try {
        const fetchedMarkers = await fetchMarkers();
        setMarkers(fetchedMarkers);
      } catch (error) {
        console.error('Ошибка при загрузке маркеров:', error);
      }
    };
    loadMarkers();
  }, []);

  // Обработка действий с Navbar
  const handleAction = (action: string) => {
    switch (action) {
      case 'upload-image':
        fileInputRef.current?.click();
        break;
      case 'add-plant':
        setCurrentMode((prev) =>
          prev === MapMode.ADD_PLANT ? MapMode.VIEW : MapMode.ADD_PLANT
        );
        break;
      case 'add-area':
        setCurrentMode((prev) =>
          prev === MapMode.ADD_AREA ? MapMode.VIEW : MapMode.ADD_AREA
        );
        break;
      case 'edit-area':
        setCurrentMode((prev) =>
          prev === MapMode.EDIT_AREA ? MapMode.VIEW : MapMode.EDIT_AREA
        );
        break;
      case 'delete-plants-in-area':
        setCurrentMode((prev) =>
          prev === MapMode.DELETE_PLANTS_IN_AREA
            ? MapMode.VIEW
            : MapMode.DELETE_PLANTS_IN_AREA
        );
        break;
      default:
        console.warn(`Нет обработчика для действия: ${action}`);
    }
  };

  // Поиск
  const handleSearch = (query: string, columns: string[]) => {
    setSearchQuery(query);
    setSelectedColumns(columns);
  };

  // Загрузка нового файла карты
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const path = await uploadMapImage(file);
      if (path) {
        const normalizedPath = path.replace(/\\/g, '/').replace(/"/g, '');
        const fullURL = `${API_BASE_URL}/${normalizedPath}`.replace(
          /([^:])(\/\/+)/g,
          '$1/'
        );
        setMapImageURL(fullURL);
      }
      event.target.value = '';
    }
  };

  // Новая область нарисована
  const handleAreaCreated = (area: Layer) => {
    setPendingArea(area);
  };

  // Сохранение имени области
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
              id: result.locationId,
            },
          ]);
          setPendingArea(null);
        }
      } catch (error) {
        console.error('Не удалось сохранить область:', error);
      }
    }
  };

  // Отмена сохранения области
  const handlePathCancel = () => {
    if (pendingArea) {
      const map = (pendingArea as any)._map;
      if (map) {
        map.removeLayer(pendingArea);
      }
    }
    setPendingArea(null);
  };

  // Редактирование области
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
    }
  };

  // Удаление области
  const handleAreaDeleted = async (areaId: number) => {
    const success = await deleteAreaOnServer(areaId);
    if (success) {
      setAreas((prev) => prev.filter((area) => area.id !== areaId));
    }
  };

  // Обновление маркеров (после добавления/удаления)
  const handleMarkersUpdated = (updatedMarkers: MarkerData[]) => {
    setMarkers(updatedMarkers);
  };

  return (
    <>
      <Navbar
        pageType='map'
        onAction={handleAction}
        activeMode={currentMode}
        onSearch={handleSearch}
        searchableColumns={searchableColumns}
      />
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
            mapImageURL={mapImageURL} // Используем прямой URL
            // mapImageURL={optimizedMapImageURL} // Удалено
            mode={currentMode}
            areas={areas}
            markers={filteredMarkers}
            onAreaCreated={handleAreaCreated}
            onAreaEdited={handleAreaEdited}
            onAreaDeleted={handleAreaDeleted}
            onMarkersUpdated={handleMarkersUpdated}
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
