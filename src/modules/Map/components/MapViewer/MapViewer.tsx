// src/modules/Map/components/MapViewer/MapViewer.tsx
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import styles from './MapViewer.module.css';

interface MapViewerProps {
  mapImageURL: string | null;
}

const MapViewer: React.FC<MapViewerProps> = ({ mapImageURL }) => {
  useEffect(() => {
    if (!mapImageURL) return;

    const map = L.map('mapid', {
      center: [0, 0],
      zoom: 1,
      crs: L.CRS.Simple,
      maxZoom: 4,
    });

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
    };
  }, [mapImageURL]);

  return <div id='mapid' className={styles.mapContainer} />;
};

export default MapViewer;
