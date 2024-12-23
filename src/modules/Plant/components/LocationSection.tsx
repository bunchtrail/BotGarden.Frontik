import React, { useEffect, useState } from 'react';
import { FormData } from '../../../types/types';
import { MapView } from '../../Map/components/MapView/MapView';
import { fetchMapImage, MarkerData } from '../../Map/services/mapService';
import { MapMode } from '../../Map/types/mapControls';
import styles from '../pages/AddPlantPage/AddPlantPage.module.css';
import mapStyles from './LocationSection.module.css';

interface LocationSectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  handleChange,
}) => {
  const [mapImageURL, setMapImageURL] = useState<string | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Загрузка изображения карты
  useEffect(() => {
    const loadMapImage = async () => {
      try {
        const mapPath = await fetchMapImage();
        if (mapPath) {
          const fullURL = `${import.meta.env.VITE_API_URL}/${mapPath}`.replace(
            /([^:])(\/\/+)/g,
            '$1/'
          );
          setMapImageURL(fullURL);
        }
      } catch (error) {
        console.error('Error loading map image:', error);
      }
    };
    loadMapImage();
  }, []);

  // Обработчик добавления маркера
  const handleMarkerAdded = (marker: { position: [number, number] }) => {
    handleChange({
      target: {
        id: 'latitude',
        value: marker.position[0].toString(),
        type: 'number',
      },
    } as React.ChangeEvent<HTMLInputElement>);

    handleChange({
      target: {
        id: 'longitude',
        value: marker.position[1].toString(),
        type: 'number',
      },
    } as React.ChangeEvent<HTMLInputElement>);

    const newMarker: MarkerData = {
      id: Date.now(),
      position: marker.position,
      title: 'Новое растение',
      description: '',
    };
    setMarkers([newMarker]);
  };

  return (
    <div>
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='latitude'>
            Широта
          </label>
          <input
            className={styles.input}
            type='number'
            id='latitude'
            value={formData.latitude || ''}
            onChange={handleChange}
            step='0.000001'
            readOnly
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='longitude'>
            Долгота
          </label>
          <input
            className={styles.input}
            type='number'
            id='longitude'
            value={formData.longitude || ''}
            onChange={handleChange}
            step='0.000001'
            readOnly
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='locationDescription'>
            Описание местоположения
          </label>
          <input
            className={styles.input}
            type='text'
            id='locationDescription'
            value={formData.locationDescription || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={mapStyles.mapContainer}>
        <MapView
          mapImageURL={mapImageURL}
          mode={MapMode.ADD_PLANT}
          showAddPlantModal={false}
          onMarkerAdded={handleMarkerAdded}
          disableAreaPopup={true}
          markers={markers}
        />
      </div>
    </div>
  );
};

export default LocationSection;
