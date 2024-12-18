import L from 'leaflet';

export enum MapMode {
  VIEW = 'view',
  ADD_PLANT = 'add-plant',
  ADD_AREA = 'add-area',
  EDIT_AREA = 'edit-area',
  EDIT_PLANT = 'edit-plant',
  REMOVE_PLANT = 'remove-plant'
}

export interface MapControl {
  id: string;
  icon: string;
  title: string;
  action: (map: L.Map) => void;
  mode?: MapMode; // В каком режиме доступен контрол
  toggleMode?: boolean; // Является ли контрол переключателем режима
}

export interface MapControlsProps {
  map: L.Map | null;
  controls: MapControl[];
  currentMode: MapMode;
  onModeChange: (mode: MapMode) => void;
}
