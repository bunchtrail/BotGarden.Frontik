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
}

export const MapAreas: React.FC<MapAreasProps> = ({
  areas,
  mode,
  drawnItemsRef,
  onAreaDeleted,
  onAreaEdited,
  setDeletePopup,
}) => {
  useEffect(() => {
    if (!drawnItemsRef.current) return;

    drawnItemsRef.current.clearLayers();

    areas.forEach((area) => {
      const polygon = createAreaPolygon(
        area,
        mode,
        onAreaDeleted,
        setDeletePopup
      );
      drawnItemsRef.current?.addLayer(polygon);
    });
  }, [areas, mode, onAreaDeleted]);

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
