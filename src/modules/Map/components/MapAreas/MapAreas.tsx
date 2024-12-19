import L from 'leaflet';
import { useEffect } from 'react';
import { AreaData } from '../../services/mapService';
import { MapMode } from '../../types/mapControls';
import { createAreaPolygon, setupAreaEditing } from '../../utils/areaUtils';

interface MapAreasProps {
  areas: AreaData[];
  mode: MapMode;
  drawnItemsRef: React.RefObject<L.FeatureGroup>;
  onAreaDeleted?: (areaId: number) => void;
  onAreaEdited?: (areaId: number, newPositions: [number, number][]) => void;
  setDeletePopup: (popup: { areaId: number; position: L.Point } | null) => void;
  disableAreaPopup?: boolean;
}

export const MapAreas: React.FC<MapAreasProps> = ({
  areas,
  mode,
  drawnItemsRef,
  onAreaDeleted,
  onAreaEdited,
  setDeletePopup,
  disableAreaPopup = false,
}) => {
  useEffect(() => {
    if (!drawnItemsRef.current) return;

    drawnItemsRef.current.clearLayers();

    areas.forEach((area) => {
      const polygon = createAreaPolygon(
        area,
        mode,
        onAreaDeleted,
        setDeletePopup,
        disableAreaPopup
      );
      drawnItemsRef.current?.addLayer(polygon);
    });
  }, [areas, mode, onAreaDeleted, disableAreaPopup]);

  useEffect(() => {
    if (mode === MapMode.EDIT_AREA) {
      setupAreaEditing(
        drawnItemsRef.current,
        onAreaEdited,
        onAreaDeleted,
        setDeletePopup
      );
    }
  }, [mode, onAreaEdited, onAreaDeleted]);

  return null;
};
