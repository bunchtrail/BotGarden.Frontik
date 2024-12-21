// src/components/MapView/MapView.tsx
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDrawControl } from '../../hooks/useDrawControl';
import { useMapImage } from '../../hooks/useMapImage';
import { useMapInitialization } from '../../hooks/useMapInitialization';
import {
  AddPlantRequest,
  AreaData,
  MarkerData,
  addPlantToMap,
  deletePlantsInArea,
} from '../../services/mapService';
import { MapMode } from '../../types/mapControls';
import { AddPlantModal } from '../AddPlantModal/AddPlantModal';
import { ConfirmationPopup } from '../ConfirmationPopup/ConfirmationPopup';
import { MapAreas } from '../MapAreas/MapAreas';
import { MapMarkers } from '../MapMarkers/MapMarkers';
import styles from './MapView.module.css';

interface MapViewProps {
  mapImageURL: string | null;
  mode: MapMode;
  areas?: AreaData[];
  markers?: MarkerData[];
  showAddPlantModal?: boolean;
  disableAreaPopup?: boolean;
  onAreaCreated?: (area: L.Layer) => void;
  onAreaEdited?: (areaId: number, newPositions: [number, number][]) => void;
  onAreaDeleted?: (areaId: number) => void;
  onMarkerAdded?: (marker: MarkerData) => void;
  onMarkersUpdated?: (markers: MarkerData[]) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  mapImageURL,
  mode,
  areas = [],
  markers = [],
  showAddPlantModal = true,
  disableAreaPopup = false,
  onAreaCreated,
  onAreaEdited,
  onAreaDeleted,
  onMarkerAdded,
  onMarkersUpdated,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [deletePopup, setDeletePopup] = useState<{
    areaId: number;
    position: L.Point;
  } | null>(null);
  const [pendingPlant, setPendingPlant] = useState<{
    position: [number, number];
  } | null>(null);

  const { mapInstanceRef, drawnItemsRef, markersLayerRef } =
    useMapInitialization(mapContainerRef);
  useMapImage(mapInstanceRef, mapImageURL);

  const handleRemoveInArea = async (bounds: L.LatLngBounds) => {
    if (!markersLayerRef.current) return;

    const plantsToRemove: number[] = [];

    markersLayerRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const latLng = layer.getLatLng();
        if (bounds.contains(latLng)) {
          const markerId = markers.find(
            (m) => m.position[0] === latLng.lat && m.position[1] === latLng.lng
          )?.id;
          if (markerId) {
            plantsToRemove.push(markerId);
          }
        }
      }
    });

    if (plantsToRemove.length > 0) {
      const success = await deletePlantsInArea(plantsToRemove);
      if (success) {
        if (onMarkersUpdated) {
          const updatedMarkers = markers.filter(
            (m) => !plantsToRemove.includes(m.id)
          );
          onMarkersUpdated(updatedMarkers);
        }
      }
    }
  };

  useDrawControl({
    map: mapInstanceRef.current,
    mode,
    drawnItems: drawnItemsRef.current,
    onAreaCreated,
    onRemoveInArea: handleRemoveInArea,
  });

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      if (mode === MapMode.ADD_PLANT) {
        const position: [number, number] = [e.latlng.lat, e.latlng.lng];
        if (showAddPlantModal) {
          setPendingPlant({ position });
        } else {
          onMarkerAdded?.({
            id: Date.now(),
            position,
            title: '',
            description: '',
          });
        }
      }
    };

    mapInstanceRef.current.on('click', handleMapClick);

    return () => {
      mapInstanceRef.current?.off('click', handleMapClick);
    };
  }, [mode, showAddPlantModal, onMarkerAdded]);

  const handlePlantSave = async (data: {
    species: string;
    variety: string;
    note: string;
    familyId: number;
    genusId: number;
    biometricId: number;
    sectorId: number;
  }) => {
    if (!pendingPlant) return;

    const plantData: AddPlantRequest = {
      Species: data.species,
      Variety: data.variety,
      FamilyId: data.familyId,
      BiometricId: data.biometricId,
      SectorId: data.sectorId,
      GenusId: data.genusId,
      Latitude: pendingPlant.position[0],
      Longitude: pendingPlant.position[1],
      Note: data.note,
    };

    const result = await addPlantToMap(plantData);
    if (result) {
      const newMarker: MarkerData = {
        id: result.plantId,
        position: [result.latitude, result.longitude],
        title: result.species,
        description: result.variety || result.note || '',
      };
      onMarkerAdded?.(newMarker);
    }
    setPendingPlant(null);
  };

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
        disableAreaPopup={disableAreaPopup}
      />

      <MapMarkers
        markers={markers.filter(marker => marker.title !== 'Украинский флаг')}
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

      {pendingPlant && (
        <AddPlantModal
          position={pendingPlant.position}
          onSave={handlePlantSave}
          onCancel={() => setPendingPlant(null)}
        />
      )}
    </div>
  );
};
