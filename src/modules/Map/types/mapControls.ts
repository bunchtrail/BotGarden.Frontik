import L from 'leaflet';

export enum MapMode {
  VIEW = 'view',
  ADD_AREA = 'add-area',
  EDIT_AREA = 'edit-area',
  DELETE_AREA = 'delete-area',
  ADD_PLANT = 'add-plant',
  EDIT_PLANT = 'edit-plant',
  REMOVE_PLANT = 'remove-plant'
}

export interface MapControl {
  type: 'zoom' | 'draw';
  enabled: boolean;
}

export interface MapControlsProps {
  map: L.Map | null;
  controls: MapControl[];
  currentMode: MapMode;
  onModeChange: (mode: MapMode) => void;
}
