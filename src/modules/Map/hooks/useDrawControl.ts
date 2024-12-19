// src/hooks/useDrawControl.ts
import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { MapMode } from '../types/mapControls';

interface UseDrawControlProps {
  map: L.Map | null;
  mode: MapMode;
  drawnItems: L.FeatureGroup | null;
  onAreaCreated?: (area: L.Layer) => void;
}

export const useDrawControl = ({
  map,
  mode,
  drawnItems,
  onAreaCreated,
}: UseDrawControlProps) => {
  const drawControlRef = useRef<L.Control.Draw | null>(null);
  const isAltPressedRef = useRef(false);

  useEffect(() => {
    if (!map || !drawnItems) return;

    // Функция для включения всех взаимодействий с картой
    const enableMapInteractions = () => {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      map.getContainer().style.cursor = 'grab';
    };

    // Функция для отключения всех взаимодействий с картой
    const disableMapInteractions = () => {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      map.getContainer().style.cursor = '';
    };

    // Функция для инициализации drawControl на основе текущего режима
    const initializeDrawControl = () => {
      const drawOptions: L.Control.DrawConstructorOptions = {
        draw: {
          rectangle: false,
          circle: false,
          circlemarker: false,
          polyline: false,
          polygon: {
            allowIntersection: false,
            showArea: true,
            metric: false,
          },
          marker: false,
        },
        edit: {
          featureGroup: drawnItems,
          edit: false,
        },
      };

      if (mode === MapMode.ADD_AREA) {
        drawControlRef.current = new L.Control.Draw(drawOptions);
        map.addControl(drawControlRef.current);

        // Включаем handler при инициализации
        const handler = (drawControlRef.current as any)._toolbars?.draw?._modes?.polygon?.handler;
        if (handler) {
          handler.enable();
          
          // Переопределяем метод добавления вершины
          const originalAddVertex = handler.addVertex;
          handler.addVertex = function(latlng: L.LatLng) {
            if (isAltPressedRef.current) {
              originalAddVertex.call(this, latlng);
            }
          };
        }

        map.on(L.Draw.Event.CREATED, (e: L.LeafletEvent) => {
          if (mode === MapMode.ADD_AREA && onAreaCreated) {
            const layer = (e as L.DrawEvents.Created).layer;
            drawnItems.addLayer(layer);
            onAreaCreated(layer);
          }
        });
      }
    };

    // Изменяем обработчики Alt
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Alt' && !isAltPressedRef.current) {
          isAltPressedRef.current = true;
          map.getContainer().style.cursor = 'crosshair';
        }
    };
      
    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Alt' && isAltPressedRef.current) {
          isAltPressedRef.current = false;
          map.getContainer().style.cursor = 'grab';
        }
    };
      

    // Инициализируем контрол рисования при изменении режима
    initializeDrawControl();

    // Добавляем обработчики событий клавиш
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Обработчик для закрытия попапа удаления при взаимодействии с картой
    const handleMapInteraction = () => {
      // Здесь можно добавить логику для закрытия попапов, если необходимо
      // Например, setDeletePopup(null);
    };

    // Добавляем глобальные обработчики взаимодействия с картой
    map.on('mousedown touchstart dragstart', handleMapInteraction);

    return () => {
      if (drawControlRef.current) {
        map.removeControl(drawControlRef.current);
      }
      map.off(L.Draw.Event.CREATED);
      map.off('mousedown touchstart dragstart', handleMapInteraction);
      enableMapInteractions();
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [map, mode, drawnItems, onAreaCreated]);
};
