// src/modules/Map/components/MapViewer/MapViewer.tsx
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { getMapControls } from '../../config/mapControls';
import {
  addAreaToServer,
  AreaData,
  parseWKTPolygon,
} from '../../services/mapService';
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
      maxZoom: 12, // Увеличиваем максимальный зум
      minZoom: -3, // Добавляем возможность отдалиться
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

  useEffect(() => {
    if (mapInstance) {
      const onStartDrawing = () => {
        // Initialize drawing process
        // Example: Adding a temporary layer to capture polygon
        const tempLayer = L.polygon([]).addTo(mapInstance);
      };

      const onDrawComplete = async (e: any) => {
        const layer = e.layer;
        const latlngs = layer
          .getLatLngs()[0]
          .map(
            (latlng: L.LatLng) => [latlng.lat, latlng.lng] as [number, number]
          );
        const newArea: AreaData = {
          id: Date.now(), // Temporary ID
          positions: latlngs,
          title: 'New Area',
          description: '',
        };
        const savedArea = await addAreaToServer(newArea);
        if (savedArea) {
          // Parse WKT to coordinates
          const coordinates = parseWKTPolygon(savedArea.geometry);
          // Add the saved area to the map using coordinates
          L.polygon(coordinates).addTo(mapInstance);
          // Remove the temporary layer
          mapInstance.removeLayer(layer);
        }
      };

      mapInstance.on('startDrawing', onStartDrawing);
      mapInstance.on('draw:created', onDrawComplete);

      return () => {
        mapInstance.off('startDrawing', onStartDrawing);
        mapInstance.off('draw:created', onDrawComplete);
      };
    }
  }, [mapInstance]);

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
