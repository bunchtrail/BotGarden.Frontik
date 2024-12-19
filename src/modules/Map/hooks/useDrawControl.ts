import L from 'leaflet';
import { useEffect } from 'react';
import { MapMode } from '../types/mapControls';

interface UseDrawControlProps {
  map: L.Map | null;
  mode: MapMode;
  drawnItems: L.FeatureGroup | null;
  onAreaCreated?: (area: L.Layer) => void;
}

const POLYGON_STYLES = {
  drawing: {
    color: '#3388ff',
    weight: 2,
    opacity: 0.9,
    fillColor: '#3388ff',
    fillOpacity: 0.2,
    dashArray: '5, 10',
  },
  created: {
    color: '#2ecc71',
    weight: 3,
    opacity: 1,
    fillColor: '#2ecc71',
    fillOpacity: 0.3,
  },
};

export const useDrawControl = ({
  map,
  mode,
  drawnItems,
  onAreaCreated,
}: UseDrawControlProps) => {
  useEffect(() => {
    if (!map || !drawnItems) return;

    let drawControl: L.Control.Draw | null = null;

    if (mode === MapMode.ADD_AREA) {
      const drawOptions: L.Control.DrawConstructorOptions = {
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true,
            metric: false,
            shapeOptions: POLYGON_STYLES.drawing,
          },
          circle: false,
          rectangle: false,
          circlemarker: false,
          marker: false,
          polyline: false as const,
        },
      };

      drawControl = new L.Control.Draw(drawOptions);
      map.addControl(drawControl);

      map.on(
        'draw:created' as L.DrawEvents.Created['type'],
        ((event: L.DrawEvents.Created) => {
          const layer = event.layer;
          if (layer instanceof L.Polygon) {
            layer.setStyle(POLYGON_STYLES.created);
          }
          drawnItems.addLayer(layer);
          onAreaCreated?.(layer);
        }) as L.LeafletEventHandlerFn
      );
    }

    return () => {
      if (map && drawControl) {
        map.removeControl(drawControl);
      }
    };
  }, [map, mode, drawnItems, onAreaCreated]);
}; 