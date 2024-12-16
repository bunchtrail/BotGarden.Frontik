// src/modules/Map/components/MapAreaLayer.tsx

import React from 'react';
import { Polygon } from 'react-leaflet';
import { AreaData } from '../services/mapService';

interface MapAreaLayerProps {
  areas: AreaData[];
}

const MapAreaLayer: React.FC<MapAreaLayerProps> = ({ areas }) => {
  return (
    <>
      {areas.map((area) => (
        <Polygon
          key={area.id}
          positions={area.positions}
          pathOptions={{ color: 'blue' }}
        />
      ))}
    </>
  );
};

export default MapAreaLayer;
