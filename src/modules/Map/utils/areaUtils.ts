import L from 'leaflet';
import { createAreaPopup } from '../components/AreaPopup/AreaPopup';
import { AreaData } from '../services/mapService';
import { MapMode } from '../types/mapControls';

export const createAreaPolygon = (
  area: AreaData,
  mode: MapMode,
  onAreaDeleted?: (areaId: number) => void,
  setDeletePopup?: (popup: { areaId: number; position: L.Point } | null) => void,
  disableAreaPopup: boolean = false
) => {
  const polygon = L.polygon(area.positions, {
    color: area.color || '#3388ff',
  });

  if (!disableAreaPopup) {
    const popup = createAreaPopup({
      title: area.title || 'Без названия',
      description: area.description || 'Без описания',
    });
    polygon.bindPopup(popup);
  }

  (polygon as any).areaId = area.id;
  
  setupPolygonEvents(polygon, mode, onAreaDeleted, setDeletePopup);

  return polygon;
};

export function setupAreaEditing(
  featureGroup: L.FeatureGroup | null,
  onAreaEdited?: (areaId: number, newPositions: [number, number][]) => void,
  onAreaDeleted?: (areaId: number) => void,
  setDeletePopup?: (popup: { areaId: number; position: L.Point } | null) => void
) {
  if (!featureGroup) return;

  featureGroup.getLayers().forEach((layer: L.Layer) => {
    if (layer instanceof L.Polygon) {
      // Включаем режим редактирования для полигона
      (layer as any).editing?.enable();
      (layer as any)._editing = true;

      // Добавляем обработчик правого клика для удаления
      layer.on('contextmenu', (e: L.LeafletMouseEvent) => {
        if (onAreaDeleted && (layer as any)._map) {
          layer.closePopup();
          const containerPoint = (layer as any)._map.latLngToContainerPoint(e.latlng);
          setDeletePopup?.({
            areaId: (layer as any).areaId,
            position: containerPoint,
          });
        }
      });

      // Добавляем обработчик изменения формы области
      layer.on('edit', (e: L.LeafletEvent) => {
        const editedLayer = e.target as L.Polygon;
        const areaId = (editedLayer as any).areaId;
        if (areaId && onAreaEdited) {
          const positions = editedLayer.getLatLngs()[0] as L.LatLng[];
          const coords = positions.map((p) => [p.lat, p.lng] as [number, number]);
          onAreaEdited(areaId, coords);
        }
      });
    }
  });

  return () => {
    featureGroup.getLayers().forEach((layer: L.Layer) => {
      if (layer instanceof L.Polygon) {
        if ((layer as any)._editing) {
          (layer as any).editing?.disable();
          delete (layer as any)._editing;
        }
        layer.off('edit');
        layer.off('contextmenu');
      }
    });
  };
}

function setupPolygonEvents(
  polygon: L.Polygon,
  mode: MapMode,
  onAreaDeleted?: (areaId: number) => void,
  setDeletePopup?: (popup: { areaId: number; position: L.Point } | null) => void
) {
  // Добавляем hover эффект
  polygon.on('mouseover', () => {
    polygon.setStyle({ fillOpacity: 0.5 });
  });

  polygon.on('mouseout', () => {
    polygon.setStyle({ fillOpacity: 0.3 });
  });

  // Обработчик для режима ADD_PLANT
  if (mode === MapMode.ADD_PLANT) {
    polygon.on('click', (e: L.LeafletMouseEvent) => {
      if (e.originalEvent.altKey) {
        // Если зажат Alt, показываем попап и предотвращаем добавление маркера
        const popup = polygon.getPopup();
        if (popup) {
          polygon.openPopup();
        }
        L.DomEvent.stopPropagation(e);
      }
      // Если Alt не зажат, событие пройдет дальше и маркер будет добавлен
    });
  }

  // Добавляем обработчик удаления в режиме DELETE_AREA
  if (mode === MapMode.DELETE_AREA) {
    polygon.on('click', () => {
      if (onAreaDeleted) {
        polygon.closePopup();
        const latLng = polygon.getBounds().getCenter();
        const containerPoint = (polygon as any)._map.latLngToContainerPoint(latLng);
        setDeletePopup?.({
          areaId: (polygon as any).areaId,
          position: containerPoint,
        });
      }
    });
  }
} 