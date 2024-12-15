// src/modules/Map/pages/MapPage.tsx
import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import MapView from '../components/MapView';
import { useCustomMap } from '../hooks/useCustomMap';
import { getMarkers } from '../services/mapService';
import styles from './MapPage.module.css';

const MapPage: React.FC = () => {
  const markers = getMarkers();
  const { url: customMapUrl, bounds, setCustomMap } = useCustomMap();

  const handleAction = (action: string, file?: File) => {
    if (action === 'upload-image' && file) {
      setCustomMap(file);
    }
  };

  return (
    <div className={styles.mapPageContainer}>
      <Navbar pageType='map' onAction={handleAction} />
      <div className={styles.mapWrapper}>
        {bounds ? (
          <MapView
            markers={markers}
            customMapUrl={customMapUrl}
            bounds={bounds}
          />
        ) : (
          <div>Загрузка карты...</div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
