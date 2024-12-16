// src/modules/Map/components/MapView.tsx

import { CRS, LatLngBoundsLiteral, LatLngTuple } from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, useMap } from 'react-leaflet';
import '../../../assets/styles/LeafletOverrides.css';

import useHandleMapActions from '../hooks/useHandleMapActions';
import useMapAreas from '../hooks/useMapAreas';
import useMapInteractions from '../hooks/useMapInteractions';
import { AreaData, MarkerData } from '../services/mapService';
import MapControls from './MapControls';
import MapLayers from './MapLayers';
import styles from './MapView.module.css';

export interface MapViewRef {
  handleMapAction: (action: string) => void;
}

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
      map.setMinZoom(-3);
    }
  }, [bounds, map]);

  return null;
};

const DEFAULT_CENTER: LatLngTuple = [55.751244, 37.618423]; // Москва

const MapView = React.forwardRef<MapViewRef, MapViewProps>(
  ({ markers, customMapUrl, bounds }, ref) => {
    const isCustomMap = !!customMapUrl && !!bounds;
    const crs = isCustomMap ? CRS.Simple : CRS.EPSG3857;

    const { areas, addArea, updateArea, deleteArea, reloadAreas } =
      useMapAreas();
    const [editMode, setEditMode] = useState<'none' | 'add' | 'edit'>('none');

    const center: LatLngTuple =
      isCustomMap && bounds
        ? [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2]
        : DEFAULT_CENTER;

    const mapRef = useRef<L.Map | null>(null);

    useMapInteractions(mapRef.current, editMode);

    const handleMapAction = useHandleMapActions(setEditMode, editMode);

    React.useImperativeHandle(ref, () => ({
      handleMapAction,
    }));

    const arraysEqual = (a1: [number, number][], a2: [number, number][]) => {
      if (a1.length !== a2.length) return false;
      for (let i = 0; i < a1.length; i++) {
        if (a1[i][0] !== a2[i][0] || a1[i][1] !== a2[i][1]) {
          return false;
        }
      }
      return true;
    };

    const handleCreated = useCallback(
      async (e: any) => {
        const layer = e.layer;
        if (layer && layer.getLatLngs) {
          const latlngs = layer
            .getLatLngs()[0]
            .map((latlng: L.LatLng) => [latlng.lat, latlng.lng]) as [
            number,
            number
          ][];
          const newArea: AreaData = {
            id: Date.now(),
            positions: latlngs,
            title: 'Новая область',
            description: 'Описание области',
          };
          await addArea(newArea);
          setEditMode('none');
        }
      },
      [addArea]
    );

    const handleEdited = useCallback(
      async (e: any) => {
        const editedLayers = e.layers;
        const toUpdate: AreaData[] = [];
        editedLayers.eachLayer((layer: any) => {
          const layerLatlngs = layer
            .getLatLngs()[0]
            .map((latlng: L.LatLng) => [latlng.lat, latlng.lng]) as [
            number,
            number
          ][];
          const foundArea = areas.find((a) =>
            arraysEqual(a.positions, layerLatlngs)
          );
          if (foundArea) {
            const updatedArea: AreaData = {
              ...foundArea,
              positions: layerLatlngs,
            };
            toUpdate.push(updatedArea);
          }
        });
        for (const ua of toUpdate) {
          await updateArea(ua);
        }
        setEditMode('none');
      },
      [areas, updateArea]
    );

    const handleDeleted = useCallback(
      async (e: any) => {
        const deletedLayers = e.layers;
        const toDelete: AreaData[] = [];
        deletedLayers.eachLayer((layer: any) => {
          const layerLatlngs = layer
            .getLatLngs()[0]
            .map((latlng: L.LatLng) => [latlng.lat, latlng.lng]) as [
            number,
            number
          ][];
          const foundArea = areas.find((a) =>
            arraysEqual(a.positions, layerLatlngs)
          );
          if (foundArea) {
            toDelete.push(foundArea);
          }
        });
        for (const da of toDelete) {
          await deleteArea(da.id);
        }
        setEditMode('none');
      },
      [areas, deleteArea]
    );

    return (
      <MapContainer
        ref={mapRef}
        className={styles.mapContainer}
        center={center}
        zoom={isCustomMap ? 0 : 5}
        crs={crs}
        scrollWheelZoom={true}
        zoomControl={true}
        minZoom={isCustomMap ? 0 : 1}
        maxZoom={isCustomMap ? 13 : 18}
        attributionControl={false}
      >
        {isCustomMap && bounds && <FitBounds bounds={bounds} />}
        <MapLayers
          markers={markers}
          areas={areas}
          customMapUrl={customMapUrl}
          bounds={bounds}
          crs={crs}
        />
        <MapControls
          editMode={editMode}
          onCreated={handleCreated}
          onEdited={handleEdited}
          onDeleted={handleDeleted}
        />
      </MapContainer>
    );
  }
);

export default MapView;
