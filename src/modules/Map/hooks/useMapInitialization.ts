import L from 'leaflet';
import { useEffect, useRef } from 'react';

export const useMapInitialization = (mapContainerRef: React.RefObject<HTMLDivElement>) => {
  const mapInstanceRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const markersLayerRef = useRef<L.FeatureGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

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

    drawnItemsRef.current = new L.FeatureGroup();
    markersLayerRef.current = new L.FeatureGroup();
    
    mapInstanceRef.current.addLayer(drawnItemsRef.current);
    mapInstanceRef.current.addLayer(markersLayerRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return { mapInstanceRef, drawnItemsRef, markersLayerRef };
}; 