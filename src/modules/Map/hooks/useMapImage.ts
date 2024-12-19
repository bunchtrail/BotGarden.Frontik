import L from 'leaflet';
import { MutableRefObject, useEffect, useRef } from 'react';

export const useMapImage = (
  mapInstanceRef: React.RefObject<L.Map>,
  mapImageURL: string | null
) => {
  const imageOverlayRef = useRef<L.ImageOverlay | null>(null) as MutableRefObject<L.ImageOverlay | null>;

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (imageOverlayRef.current) {
      imageOverlayRef.current.remove();
      imageOverlayRef.current = null;
    }

    if (!mapImageURL) {
      disableMapInteractions(mapInstanceRef.current);
      return;
    }

    const img = new Image();
    img.onload = () => handleImageLoad(img, mapInstanceRef.current!, imageOverlayRef);
    img.src = mapImageURL;
  }, [mapImageURL]);

  return imageOverlayRef;
};

function disableMapInteractions(map: L.Map) {
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
}

function enableMapInteractions(map: L.Map) {
  map.dragging.enable();
  map.touchZoom.enable();
  map.doubleClickZoom.enable();
  map.scrollWheelZoom.enable();
  map.boxZoom.enable();
  map.keyboard.enable();
}

function handleImageLoad(
  img: HTMLImageElement, 
  map: L.Map,
  imageOverlayRef: MutableRefObject<L.ImageOverlay | null>
) {
  const bounds = calculateImageBounds(img, map);
  imageOverlayRef.current = L.imageOverlay(img.src, bounds).addTo(map);
  map.fitBounds(bounds);
  enableMapInteractions(map);
  L.control.zoom({ position: 'topleft' }).addTo(map);
}

function calculateImageBounds(img: HTMLImageElement, map: L.Map) {
  const southWest = map.unproject([0, img.height], map.getMaxZoom() - 1);
  const northEast = map.unproject([img.width, 0], map.getMaxZoom() - 1);
  return new L.LatLngBounds(southWest, northEast);
} 