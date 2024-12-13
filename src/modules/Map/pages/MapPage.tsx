// src/modules/Map/pages/MapPage.tsx
import React, { useState } from 'react';
import { Map, Placemark, Polygon, YMaps } from 'react-yandex-maps';
import Navbar from '../../../components/Navbar/Navbar';
import CustomImageOverlay from '../components/CustomImageOverlay/CustomImageOverlay';
import { useMapLogic } from '../hooks/useMapLogic';

// Импортируем стили
import styles from './MapPage.module.css';

const MapPage: React.FC = () => {
  const {
    areas,
    plants,
    handleMapClick,
    handlePlacemarkClick,
    handlePolygonClick,
    handleAddPlantMode,
    handleAddAreaMode,
    handleEditAreaMode,
    handleEditPlantMode,
    handleRemovePlantMode,
  } = useMapLogic();

  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);

  const defaultCenter: [number, number] = [55.751574, 37.573856]; // Москва
  const defaultZoom = 9;

  const onAction = (action: string, file?: File) => {
    switch (action) {
      case 'add-plant':
        handleAddPlantMode();
        break;
      case 'add-area':
        handleAddAreaMode();
        break;
      case 'edit-area':
        handleEditAreaMode();
        break;
      case 'edit-plant':
        handleEditPlantMode();
        break;
      case 'remove-plant':
        handleRemovePlantMode();
        break;
      case 'upload-image':
        if (file) {
          const url = URL.createObjectURL(file);
          setCustomImageUrl(url);
        }
        break;
      default:
        break;
    }
  };

  const searchableColumns = [
    { field: 'name', label: 'Название' },
    { field: 'coordinates', label: 'Координаты' },
  ];

  const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY;

  return (
    <>
      <Navbar
        pageType='map'
        onAction={onAction}
        searchableColumns={searchableColumns}
      />
      <div className={`app-container ${styles.mapContainer}`}>
        <div className={styles.mapWrapper}>
          <YMaps
            query={{
              apikey: apiKey,
              lang: 'ru_RU',
            }}
          >
            <Map
              defaultState={{ center: defaultCenter, zoom: defaultZoom }}
              width='100%'
              height='100%'
              onClick={handleMapClick}
              className={styles.map}
            >
              {areas.map((area) => (
                <Polygon
                  key={area.id}
                  geometry={[area.coordinates]}
                  options={{
                    fillColor: '#00FF0088',
                    strokeColor: '#0000FF',
                    strokeWidth: 2,
                  }}
                  onClick={() => handlePolygonClick(area.id)}
                />
              ))}

              {plants.map((plant) => (
                <Placemark
                  key={plant.id}
                  geometry={plant.coordinates}
                  properties={{ hintContent: plant.name }}
                  options={{ preset: 'islands#greenDotIcon' }}
                  onClick={() => handlePlacemarkClick(plant.id)}
                />
              ))}

              {customImageUrl && (
                <CustomImageOverlay
                  imageUrl={customImageUrl}
                  coordinates={[
                    [55.75, 37.57],
                    [55.76, 37.58],
                  ]}
                />
              )}
            </Map>
          </YMaps>
        </div>
      </div>
    </>
  );
};

export default MapPage;
