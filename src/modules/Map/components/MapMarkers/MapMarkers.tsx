import L from 'leaflet';
import { useEffect } from 'react';
import { MarkerData } from '../../services/mapService';
import { createAreaPopup } from '../AreaPopup/AreaPopup';
import styles from './MapMarkers.module.css';

interface MapMarkersProps {
  markers: MarkerData[];
  markersLayerRef: React.RefObject<L.FeatureGroup>;
  mapImageURL: string | null;
}

export const MapMarkers: React.FC<MapMarkersProps> = ({
  markers,
  markersLayerRef,
  mapImageURL,
}) => {
  useEffect(() => {
    if (!markersLayerRef.current || !mapImageURL) return;

    // Очищаем существующие маркеры
    markersLayerRef.current.clearLayers();

    markers.forEach((marker) => {
      const leafletMarker = L.marker(marker.position, {
        icon: L.divIcon({
          className: styles.plantMarker,
          html: `<div class="${styles.markerContent}"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        }),
      });

      const popup = createAreaPopup({
        title: marker.title || 'Без названия',
        description: marker.description || 'Без описания',
      });

      leafletMarker.bindPopup(popup);
      markersLayerRef.current?.addLayer(leafletMarker);
    });
  }, [markers, mapImageURL]);

  return null;
}; 