// src/modules/Map/components/MapViewer/MapViewer.tsx
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { getMapControls } from '../../config/mapControls';
import { MapMode } from '../../types/mapControls';
import MapControls from '../MapControls/MapControls';
import styles from './MapViewer.module.css';

interface MapViewerProps {
  mapImageURL: string | null;
  currentMode: MapMode;
}

const MapViewer: React.FC<MapViewerProps> = ({ mapImageURL, currentMode }) => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  useEffect(() => {
    if (!mapImageURL) return;

    const map = L.map('mapid', {
      center: [0, 0],
      zoom: 1,
      crs: L.CRS.Simple,
      maxZoom: 8, // Увеличиваем максимальный зум
      minZoom: -2, // Добавляем возможность отдалиться
      zoomControl: false, // Отключаем встроенные контролы
    });

    setMapInstance(map);

    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      const bounds = L.latLngBounds([
        [-height / 2, -width / 2],
        [height / 2, width / 2],
      ]);

      L.imageOverlay(mapImageURL, bounds).addTo(map);
      map.fitBounds(bounds);
      map.setMaxBounds(bounds.pad(0.5));
    };
    img.src = mapImageURL;

    return () => {
      map.remove();
      setMapInstance(null);
    };
  }, [mapImageURL]);

  return (
    <div className={styles.mapContainer}>
      <div id='mapid' className={styles.mapElement} />
      <MapControls
        map={mapInstance}
        controls={getMapControls(currentMode)}
        currentMode={currentMode}
      />
    </div>
  );
};

export default MapViewer;
