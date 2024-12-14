import 'leaflet/dist/leaflet.css';
import { CRS, LatLngBoundsLiteral, LatLngTuple } from 'leaflet';
import React, { useEffect } from 'react';
import {
  ImageOverlay,
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet';
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
      map.setMinZoom(map.getZoom());
    }
  }, [bounds, map]);

  return null;
};

const DEFAULT_CENTER: LatLngTuple = [55.751244, 37.618423];

const MapView: React.FC<MapViewProps> = ({ markers, customMapUrl, bounds }) => {
  const isCustomMap = !!customMapUrl && !!bounds;
  const crs = isCustomMap ? CRS.Simple : CRS.EPSG3857;

  // Рассчитываем центр изображения как кортеж из двух чисел
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
      minZoom={-1} // Минимальный уровень зума
      maxZoom={4} // Максимальный уровень зума
      style={{ width: '100%', height: '100%' }}
      attributionControl={false} // Disable default attribution
    >
      {layers}
    </MapContainer>
  );
};

export default MapView;
