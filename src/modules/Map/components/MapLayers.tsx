// src/modules/Map/components/MapLayers.tsx

import { CRS, LatLngBoundsLiteral } from 'leaflet';
import React from 'react';
import { ImageOverlay, TileLayer } from 'react-leaflet';
import { AreaData, MarkerData } from '../services/mapService';
import MapAreaLayer from './MapAreaLayer';
import MapMarkerLayer from './MapMarkerLayer';

interface MapLayersProps {
  markers: MarkerData[];
  areas: AreaData[];
  customMapUrl?: string | null;
  bounds?: LatLngBoundsLiteral | null;
  crs: CRS;
}

const MapLayers: React.FC<MapLayersProps> = ({
  markers,
  areas,
  customMapUrl,
  bounds,
  crs,
}) => {
  const isCustomMap = !!customMapUrl && !!bounds;

  return (
    <>
      {isCustomMap ? (
        <ImageOverlay url={customMapUrl!} bounds={bounds!} interactive={true} />
      ) : (
        <TileLayer
          attribution='Powered by &copy; OpenStreetMap | Leaflet'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
        />
      )}
      <MapMarkerLayer markers={markers} />
      <MapAreaLayer areas={areas} />
    </>
  );
};

export default MapLayers;
