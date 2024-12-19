import React, { useEffect, useState } from 'react';
import { MapView } from '../../Map/components/MapView/MapView';
import {
  AreaData,
  fetchAreas,
  fetchMapImage,
  MarkerData,
} from '../../Map/services/mapService';
import { MapMode } from '../../Map/types/mapControls';
import styles from './LocationSection.module.css';

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface LocationSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  handleChange,
}) => {
  const [mapImageURL, setMapImageURL] = useState<string | null>(null);
  const [currentMarker, setCurrentMarker] = useState<MarkerData | null>(null);
  const [areas, setAreas] = useState<AreaData[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Загрузка изображения карты
        const mapPath = await fetchMapImage();
        if (mapPath) {
          const normalizedPath = mapPath.replace(/\\/g, '/');
          const fullURL = `${VITE_API_URL}/${normalizedPath}`;
          setMapImageURL(fullURL);
        }

        // Загрузка областей
        const areasData = await fetchAreas();
        setAreas(areasData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  const handleMarkerAdded = (marker: MarkerData) => {
    setCurrentMarker(marker);

    const createChangeEvent = (
      id: string,
      value: number
    ): React.ChangeEvent<HTMLInputElement> => {
      return {
        target: {
          id,
          value: value.toFixed(6),
          type: 'text',
        } as HTMLInputElement,
        currentTarget: {} as HTMLInputElement,
        nativeEvent: {} as Event,
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        preventDefault: () => {},
        isDefaultPrevented: () => false,
        stopPropagation: () => {},
        isPropagationStopped: () => false,
        persist: () => {},
        timeStamp: Date.now(),
        type: 'change',
      } as React.ChangeEvent<HTMLInputElement>;
    };

    handleChange(createChangeEvent('latitude', marker.position[0]));
    handleChange(createChangeEvent('longitude', marker.position[1]));
  };

  return (
    <div className={styles.locationSection}>
      <div className={styles.coordinates}>
        <input
          type='number'
          id='latitude'
          value={formData.latitude ?? ''}
          onChange={handleChange}
          placeholder='Широта'
          step='any'
          readOnly
        />
        <input
          type='number'
          id='longitude'
          value={formData.longitude ?? ''}
          onChange={handleChange}
          placeholder='Долгота'
          step='any'
          readOnly
        />
      </div>

      <div className={styles.mapContainer}>
        <MapView
          mapImageURL={mapImageURL}
          mode={MapMode.ADD_PLANT}
          showAddPlantModal={false}
          markers={currentMarker ? [currentMarker] : []}
          areas={areas}
          onMarkerAdded={handleMarkerAdded}
          disableAreaPopup={true}
        />
      </div>
    </div>
  );
};

export default LocationSection;
