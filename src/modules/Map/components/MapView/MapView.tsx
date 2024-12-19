// src/components/MapView/MapView.tsx
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDrawControl } from '../../hooks/useDrawControl';
import { AreaData, MarkerData } from '../../services/mapService';
import { MapMode } from '../../types/mapControls';
import { createAreaPopup } from '../AreaPopup/AreaPopup';
import { ConfirmationPopup } from '../ConfirmationPopup/ConfirmationPopup';
import styles from './MapView.module.css';

interface MapViewProps {
  mapImageURL: string | null;
  mode: MapMode;
  areas?: AreaData[];
  markers?: MarkerData[];
  onAreaCreated?: (area: L.Layer) => void;
  onAreaEdited?: (areaId: number, newPositions: [number, number][]) => void;
  onAreaDeleted?: (areaId: number) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  mapImageURL,
  mode,
  areas = [],
  markers = [],
  onAreaCreated,
  onAreaEdited,
  onAreaDeleted,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const imageOverlayRef = useRef<L.ImageOverlay | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const [deletePopup, setDeletePopup] = useState<{
    areaId: number;
    position: L.Point;
  } | null>(null);

  // Инициализация карты
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Создаем карту с отключенными взаимодействиями
    mapInstanceRef.current = L.map(mapContainerRef.current, {
      center: [0, 0],
      zoom: 1,
      minZoom: -2,
      maxZoom: 4,
      crs: L.CRS.Simple,
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false,
    });

    // Инициализация слоя для рисования
    drawnItemsRef.current = new L.FeatureGroup();
    mapInstanceRef.current.addLayer(drawnItemsRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Используем хук useDrawControl
  useDrawControl({
    map: mapInstanceRef.current,
    mode,
    drawnItems: drawnItemsRef.current,
    onAreaCreated,
  });

  // Обработка изменений mapImageURL
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (imageOverlayRef.current) {
      imageOverlayRef.current.remove();
      imageOverlayRef.current = null;
    }

    if (!mapImageURL) {
      // Отключаем все взаимодействия при отсутствии изображения
      mapInstanceRef.current.dragging.disable();
      mapInstanceRef.current.touchZoom.disable();
      mapInstanceRef.current.doubleClickZoom.disable();
      mapInstanceRef.current.scrollWheelZoom.disable();
      mapInstanceRef.current.boxZoom.disable();
      mapInstanceRef.current.keyboard.disable();
      return;
    }

    const img = new Image();

    img.onerror = (error) => {};

    img.onload = () => {
      if (!mapInstanceRef.current) return;

      const width = img.width;
      const height = img.height;
      const southWest = mapInstanceRef.current.unproject(
        [0, height],
        mapInstanceRef.current.getMaxZoom() - 1
      );
      const northEast = mapInstanceRef.current.unproject(
        [width, 0],
        mapInstanceRef.current.getMaxZoom() - 1
      );

      const bounds = new L.LatLngBounds(southWest, northEast);
      imageOverlayRef.current = L.imageOverlay(mapImageURL, bounds).addTo(
        mapInstanceRef.current
      );
      mapInstanceRef.current.fitBounds(bounds);

      // Включаем все взаимодействия после загрузки изображения
      mapInstanceRef.current.dragging.enable();
      mapInstanceRef.current.touchZoom.enable();
      mapInstanceRef.current.doubleClickZoom.enable();
      mapInstanceRef.current.scrollWheelZoom.enable();
      mapInstanceRef.current.boxZoom.enable();
      mapInstanceRef.current.keyboard.enable();

      L.control
        .zoom({
          position: 'topleft',
        })
        .addTo(mapInstanceRef.current);
    };

    img.src = mapImageURL;
  }, [mapImageURL]);

  // Добавляем эффект для отображения областей
  useEffect(() => {
    if (!mapInstanceRef.current || !drawnItemsRef.current) return;

    drawnItemsRef.current.clearLayers();

    areas.forEach((area) => {
      const polygon = L.polygon(area.positions, {
        color: '#2ecc71',
        weight: 3,
        opacity: 1,
        fillColor: '#2ecc71',
        fillOpacity: 0.3,
      });

      (polygon as any).areaId = area.id;

      const popup = createAreaPopup({
        title: area.title,
        description: area.description,
      });

      polygon.bindPopup(popup);

      // Добавляем hover эффект
      polygon.on('mouseover', () => {
        polygon.setStyle({ fillOpacity: 0.5 });
      });

      polygon.on('mouseout', () => {
        polygon.setStyle({ fillOpacity: 0.3 });
      });

      // Добавляем обработчик удаления в режиме DELETE_AREA
      if (mode === MapMode.DELETE_AREA) {
        polygon.on('click', () => {
          if (onAreaDeleted) {
            // Закрываем все открытые попапы перед показом попапа удаления
            polygon.closePopup();

            const latLng = polygon.getBounds().getCenter();
            const containerPoint =
              mapInstanceRef.current!.latLngToContainerPoint(latLng);
            setDeletePopup({
              areaId: (polygon as any).areaId,
              position: containerPoint,
            });
          }
        });
      }

      drawnItemsRef.current?.addLayer(polygon);
    });
  }, [areas, mode, onAreaDeleted]);

  // Обработчики событий редактирования
  useEffect(() => {
    if (!mapInstanceRef.current || !drawnItemsRef.current) return;

    if (mode === MapMode.EDIT_AREA) {
      drawnItemsRef.current.getLayers().forEach((layer: L.Layer) => {
        if (layer instanceof L.Polygon) {
          (layer as any).editing?.enable();
          (layer as any)._editing = true;

          layer.on('contextmenu', (e: L.LeafletMouseEvent) => {
            if (onAreaDeleted && mapInstanceRef.current) {
              // Закрываем все открытые попапы перед показом попапа удаления
              layer.closePopup();

              const containerPoint =
                mapInstanceRef.current.latLngToContainerPoint(e.latlng);
              setDeletePopup({
                areaId: (layer as any).areaId,
                position: containerPoint,
              });
            }
          });
        }
      });

      // Обработчик изменения формы области
      const handleEdit = (e: L.LeafletEvent) => {
        const layer = e.target as L.Polygon;
        const areaId = (layer as any).areaId;
        if (areaId && onAreaEdited) {
          const positions = layer.getLatLngs()[0] as L.LatLng[];
          const coords = positions.map(
            (p) => [p.lat, p.lng] as [number, number]
          );
          onAreaEdited(areaId, coords);
        }
      };

      drawnItemsRef.current.getLayers().forEach((layer: L.Layer) => {
        layer.on('edit', handleEdit);
      });

      return () => {
        drawnItemsRef.current?.getLayers().forEach((layer: L.Layer) => {
          if (layer instanceof L.Polygon) {
            if ((layer as any)._editing) {
              (layer as any).editing?.disable();
              delete (layer as any)._editing;
            }
            layer.off('edit', handleEdit);
            layer.off('contextmenu');
          }
        });
      };
    }
  }, [mode, onAreaEdited, onAreaDeleted]);

  // Эффект для закрытия попапа удаления при взаимодействии с картой
  useEffect(() => {
    if (!deletePopup || !mapInstanceRef.current) return;

    const handleMapInteraction = () => {
      setDeletePopup(null);
    };

    // Добавляем обработчики событий
    mapInstanceRef.current.on(
      'mousedown touchstart dragstart',
      handleMapInteraction
    );

    // Убираем обработчики при размонтировании или изменении deletePopup
    return () => {
      mapInstanceRef.current?.off(
        'mousedown touchstart dragstart',
        handleMapInteraction
      );
    };
  }, [deletePopup]);

  // Глобальный обработчик кликов по карте для предотвращения добавления маркеров
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      // Проверяем, находится ли карта в режиме редактирования
      if (mode === MapMode.EDIT_AREA) {
        // Предотвращаем добавление маркеров
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        return;
      }

      // Проверяем, удерживается ли клавиша Alt
      if (e.originalEvent.altKey) {
        // Предотвращаем добавление маркеров при удерживании Alt
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        return;
      }
    };

    mapInstanceRef.current.on('click', handleMapClick);

    return () => {
      mapInstanceRef.current?.off('click', handleMapClick);
    };
  }, [mode]);

  // Добавляем эффект для отображения маркеров
  useEffect(() => {
    if (!mapInstanceRef.current || !drawnItemsRef.current) {
      console.log('Карта или слой не инициализированы');
      return;
    }

    if (!mapImageURL) {
      console.log('Изображение карты не загружено');
      return;
    }

    console.log('Обновление маркеров:', markers);

    // Очищаем существующие маркеры
    drawnItemsRef.current.getLayers().forEach((layer) => {
      if (layer instanceof L.Marker) {
        drawnItemsRef.current?.removeLayer(layer);
      }
    });

    // Добавляем новые маркеры
    markers.forEach((marker) => {
      console.log('Создание маркера:', marker);

      // Преобразуем координаты в систему координат карты
      const point = mapInstanceRef.current!.project(
        L.latLng(marker.position),
        mapInstanceRef.current!.getMaxZoom() - 1
      );

      const latLng = mapInstanceRef.current!.unproject(
        point,
        mapInstanceRef.current!.getMaxZoom() - 1
      );

      try {
        const leafletMarker = L.marker(latLng, {
          icon: L.divIcon({
            className: styles.plantMarker,
            html: `<div class="${styles.markerContent}"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          }),
        });

        // Проверяем, что маркер создался
        console.log('Leaflet маркер создан:', leafletMarker);

        const popup = createAreaPopup({
          title: marker.title || 'Без названия',
          description: marker.description || 'Без описания',
        });

        leafletMarker.bindPopup(popup);

        // Проверяем, что слой существует
        if (!drawnItemsRef.current) {
          console.error('drawnItems слой не инициализирован');
          return;
        }

        drawnItemsRef.current.addLayer(leafletMarker);
        console.log('Маркер добавлен на карту');

        // Проверяем, что маркер действительно добавлен
        console.log('Текущие слои:', drawnItemsRef.current.getLayers());
      } catch (error) {
        console.error('Ошибка при создании маркера:', error);
      }
    });
  }, [markers, mapImageURL]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainerRef} className={styles.leafletContainer} />
      {!mapImageURL && (
        <div className={styles.placeholder}>
          Загрузите изображение карты, используя кнопку "Загрузить" в меню
        </div>
      )}
      {mode === MapMode.ADD_AREA && (
        <div className={styles.hint}>
          Зажмите Alt для добавления точки области
        </div>
      )}
      {deletePopup && (
        <ConfirmationPopup
          title='Удаление области'
          message='Вы уверены, что хотите удалить эту область?'
          confirmText='Удалить'
          cancelText='Отмена'
          type='danger'
          position={deletePopup.position}
          onConfirm={() => {
            onAreaDeleted?.(deletePopup.areaId);
            setDeletePopup(null);
          }}
          onCancel={() => setDeletePopup(null)}
        />
      )}
    </div>
  );
};
