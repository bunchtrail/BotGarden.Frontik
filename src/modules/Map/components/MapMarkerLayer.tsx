// src/modules/Map/components/MapMarkerLayer.tsx

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MarkerData } from '../services/mapService';

interface MapMarkerLayerProps {
  markers: MarkerData[];
}

const MapMarkerLayer: React.FC<MapMarkerLayerProps> = ({ markers }) => {
  return (
    <>
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>
            <strong>{marker.title}</strong><br />
            {marker.description}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapMarkerLayer;
