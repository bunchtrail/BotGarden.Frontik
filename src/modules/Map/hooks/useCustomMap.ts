import { useEffect, useState } from 'react';
import { getCustomMapUrl, setCustomMapUrl } from '../services/mapService';

interface CustomMapState {
  url: string | null;
  bounds: L.LatLngBoundsLiteral | null;
  dimensions: {
    width: number;
    height: number;
  } | null;
}

export const useCustomMap = () => {
  const [mapState, setMapState] = useState<CustomMapState>({
    url: null,
    bounds: null,
    dimensions: null
  });

  useEffect(() => {
    loadSavedMap();
  }, []);

  const loadSavedMap = async () => {
    const savedUrl = getCustomMapUrl();
    if (savedUrl) {
      loadImageBounds(savedUrl);
    }
  };

  const loadImageBounds = (imageUrl: string) => {
    const img = new Image();
    img.onload = () => {
      console.log(`Image dimensions: ${img.width}x${img.height}`);

      // Устанавливаем границы с учётом размеров изображения
      const bounds: L.LatLngBoundsLiteral = [
        [0, 0],
        [img.height, img.width]
      ];

      console.log(`Setting bounds: ${JSON.stringify(bounds)}`);

      setMapState({
        url: imageUrl,
        bounds,
        dimensions: {
          width: img.width,
          height: img.height
        }
      });
    };
    img.src = imageUrl;
  };

  const setCustomMap = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Url = e.target?.result as string;
      loadImageBounds(base64Url);
      setCustomMapUrl(base64Url);
    };
    reader.readAsDataURL(file);
  };

  return { ...mapState, setCustomMap };
};
