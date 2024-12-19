import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import { useDrawControl } from '../../hooks/useDrawControl';
import { AreaData } from '../../services/mapService';
import { MapMode } from '../../types/mapControls';
import { createAreaPopup } from '../AreaPopup/AreaPopup';
import styles from './MapView.module.css';

interface MapViewProps {
  mapImageURL: string | null;
  mode: MapMode;
  areas?: AreaData[];
  onAreaCreated?: (area: L.Layer) => void;
  onAreaEdited?: (areaId: number, newPositions: [number, number][]) => void;
  onAreaDeleted?: (areaId: number) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  mapImageURL,
  mode,
  areas = [],
  onAreaCreated,
  onAreaEdited,
  onAreaDeleted,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const imageOverlayRef = useRef<L.ImageOverlay | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);

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

  // Используем новый хук вместо старого useEffect
  useDrawControl({
    map: mapInstanceRef.current,
    mode,
    drawnItems: drawnItemsRef.current,
    onAreaCreated,
  });

  // Обработка изменений mapImageURL
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    console.log('MapView received mapImageURL:', mapImageURL); // Для отладки

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

    img.onerror = (error) => {
      console.error('Error loading image:', error); // Для отладки
    };

    img.onload = () => {
      console.log('Image loaded successfully:', img.width, 'x', img.height); // Для отладки
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

    console.log('Attempting to load image from:', mapImageURL); // Для отладки
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
            onAreaDeleted((polygon as any).areaId);
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
      // Включаем редактирование для всех полигонов
      drawnItemsRef.current.getLayers().forEach((layer: L.Layer) => {
        if (layer instanceof L.Polygon) {
          const editor = new L.EditToolbar.Edit(mapInstanceRef.current!, {
            featureGroup: drawnItemsRef.current,
          });
          editor.enable();
          (layer as any)._editor = editor;
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
            const editor = (layer as any)._editor;
            if (editor) {
              editor.disable();
              delete (layer as any)._editor;
            }
            layer.off('edit', handleEdit);
          }
        });
      };
    }
  }, [mode, onAreaEdited]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainerRef} className={styles.leafletContainer} />
      {!mapImageURL && (
        <div className={styles.placeholder}>
          Загрузите изображение карты, используя кнопку "Загрузить" в меню
        </div>
      )}
    </div>
  );
};
