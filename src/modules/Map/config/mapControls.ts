import { MapControl, MapMode } from '../types/mapControls';

export const getMapControls = (mode: MapMode): MapControl[] => {
  return [
    { type: 'zoom', enabled: true },
    { type: 'draw', enabled: mode === MapMode.EDIT_AREA }
  ];
};
