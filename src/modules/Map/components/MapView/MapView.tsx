// src/components/MapView/MapView.tsx
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import React, { useRef, useState } from 'react';
import { useDrawControl } from '../../hooks/useDrawControl';
import { useMapImage } from '../../hooks/useMapImage';
import { useMapInitialization } from '../../hooks/useMapInitialization';
import { AreaData, MarkerData } from '../../services/mapService';
import { MapMode } from '../../types/mapControls';
import { ConfirmationPopup } from '../ConfirmationPopup/ConfirmationPopup';
import { MapAreas } from '../MapAreas/MapAreas';
import { MapMarkers } from '../MapMarkers/MapMarkers';
import styles from './MapView.module.css';

interface MapViewProps {
  mapImageURL: string | null;
  mode: MapMode;
  areas?: AreaData[];
  markers?: MarkerData[];
  onAreaCreated?: (area: L.Layer) => void;
  onAreaEdited?: (areaId: number, newPositions: [number, number][]) => void;
  onAreaDeleted?: (areaId: number) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  mapImageURL,
  mode,
  areas = [],
  markers = [],
  onAreaCreated,
  onAreaEdited,
  onAreaDeleted,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [deletePopup, setDeletePopup] = useState<{
    areaId: number;
    position: L.Point;
  } | null>(null);

  const { mapInstanceRef, drawnItemsRef, markersLayerRef } =
    useMapInitialization(mapContainerRef);
  const imageOverlayRef = useMapImage(mapInstanceRef, mapImageURL);

  useDrawControl({
    map: mapInstanceRef.current,
    mode,
    drawnItems: drawnItemsRef.current,
    onAreaCreated,
  });

  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainerRef} className={styles.leafletContainer} />

      <MapAreas
        areas={areas}
        mode={mode}
        drawnItemsRef={drawnItemsRef}
        onAreaDeleted={onAreaDeleted}
        onAreaEdited={onAreaEdited}
        setDeletePopup={setDeletePopup}
      />

      <MapMarkers
        markers={markers}
        markersLayerRef={markersLayerRef}
        mapImageURL={mapImageURL}
      />

      {!mapImageURL && (
        <div className={styles.placeholder}>
          Загрузите изображение карты, используя кнопку "Загрузить" в меню
        </div>
      )}

      {mode === MapMode.ADD_AREA && (
        <div className={styles.hint}>
          Зажмите Alt для добавления точки области
        </div>
      )}

      {deletePopup && (
        <ConfirmationPopup
          title='Удаление области'
          message='Вы уверены, что хотите удалить эту область?'
          confirmText='Удалить'
          cancelText='Отмена'
          type='danger'
          position={deletePopup.position}
          onConfirm={() => {
            onAreaDeleted?.(deletePopup.areaId);
            setDeletePopup(null);
          }}
          onCancel={() => setDeletePopup(null)}
        />
      )}
    </div>
  );
};
