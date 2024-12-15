// src/modules/Map/components/MapView.tsx
import { CRS, LatLngBoundsLiteral, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { ImageOverlay, MapContainer, TileLayer, useMap } from 'react-leaflet';
import '../../../assets/styles/LeafletOverrides.css'; 
import { MarkerData } from '../services/mapService';
import MapMarkerLayer from './MapMarkerLayer';
import styles from './MapView.module.css';

interface MapViewProps {
  markers: MarkerData[];
  customMapUrl?: string | null;
  bounds?: LatLngBoundsLiteral | null;
}

const FitBounds: React.FC<{ bounds: LatLngBoundsLiteral }> = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
      // Удаляем установку минимального зума, чтобы избежать ограничения
      // map.setMinZoom(map.getZoom());
    }
  }, [bounds, map]);

  return null;
};

const DEFAULT_CENTER: LatLngTuple = [55.751244, 37.618423]; // Москва

const MapView: React.FC<MapViewProps> = ({ markers, customMapUrl, bounds }) => {
  const isCustomMap = !!customMapUrl && !!bounds;
  const crs = isCustomMap ? CRS.Simple : CRS.EPSG3857;

  // Рассчитываем центр изображения как середину границ
  const center: LatLngTuple =
    isCustomMap && bounds
      ? [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2]
      : DEFAULT_CENTER;

  const layers = isCustomMap ? (
    <>
      <ImageOverlay url={customMapUrl!} bounds={bounds!} interactive={true} />
      <FitBounds bounds={bounds!} />
    </>
  ) : (
    <>
      <TileLayer
        attribution='Powered by &copy; OpenStreetMap | Leaflet'
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
      />
      <MapMarkerLayer markers={markers} />
    </>
  );

  return (
    <MapContainer
      className={styles.mapContainer}
      center={center}
      zoom={isCustomMap ? 0 : 5} // Начальный уровень зума
      crs={crs}
      scrollWheelZoom={true}
      zoomControl={true}
      minZoom={isCustomMap ? 0 : 1} // Устанавливаем minZoom для большей гибкости
      maxZoom={isCustomMap ? 4 : 18} // Устанавливаем maxZoom для большей гибкости
      attributionControl={false} // Отключение стандартной атрибуции
    >
      {layers}
    </MapContainer>
  );
};

export default MapView;
