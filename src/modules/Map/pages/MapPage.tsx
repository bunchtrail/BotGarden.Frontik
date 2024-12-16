// src/modules/Map/pages/MapPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import MapView, { MapViewRef } from '../components/MapView';
import { useCustomMap } from '../hooks/useCustomMap';
import { mapActionsConfig } from '../mapActions/mapActionsConfig';
import { fetchMarkers, MarkerData } from '../services/mapService';
import styles from './MapPage.module.css';

const MapPage: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    fetchMarkers().then(setMarkers);
  }, []);
  const { url: customMapUrl, bounds } = useCustomMap();

  const mapViewRef = useRef<MapViewRef>(null);

  const handleAction = (action: string, file?: File) => {
    const handler = mapActionsConfig[action];
    if (handler) {
      handler(mapViewRef, file);
    } else {
      console.warn(`Нет обработчика для действия: ${action}`);
    }
  };

  return (
    <div className={styles.mapPageContainer}>
      <Navbar pageType='map' onAction={handleAction} />
      <div className={styles.mapWrapper}>
        {bounds ? (
          <MapView
            ref={mapViewRef}
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
