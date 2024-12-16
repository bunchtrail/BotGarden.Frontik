// src/modules/Map/components/MapControls.tsx

import React from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

interface MapControlsProps {
  editMode: 'none' | 'add' | 'edit';
  onCreated: (e: any) => void;
  onEdited: (e: any) => void;
  onDeleted: (e: any) => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  editMode,
  onCreated,
  onEdited,
  onDeleted,
}) => {
  return (
    <FeatureGroup>
      <EditControl
        position='topright'
        draw={{
          marker: false,
          polyline: false,
          rectangle: false,
          circle: false,
          circlemarker: false,
          polygon:
            editMode === 'add'
              ? {
                  allowIntersection: false,
                  drawError: {
                    color: '#e1e100',
                    message: 'Пересечение не допускается!',
                  },
                  shapeOptions: {
                    color: '#97009c',
                  },
                  showArea: true,
                  metric: false,
                }
              : false,
        }}
        edit={{
          edit: editMode === 'edit',
          remove: editMode === 'edit',
        }}
        onCreated={onCreated}
        onEdited={onEdited}
        onDeleted={onDeleted}
      />
    </FeatureGroup>
  );
};

export default MapControls;
