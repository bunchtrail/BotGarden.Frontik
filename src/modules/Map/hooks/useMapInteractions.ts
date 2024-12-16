// src/hooks/useMapInteractions.ts

import { useEffect } from 'react';
import L from 'leaflet';
import { EditMode } from '../types';

const useMapInteractions = (map: L.Map | null, editMode: EditMode) => {
  useEffect(() => {
    if (!map) return;

    if (editMode !== 'none') {
      map.dragging.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
    } else {
      map.dragging.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
    }
  }, [map, editMode]);
};

export default useMapInteractions;
