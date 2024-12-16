// src/modules/Map/hooks/useCustomMap.ts

import { useEffect, useState } from 'react';

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

  const loadSavedMap = () => {
    const savedUrl = localStorage.getItem('customMapUrl');
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
    img.onerror = () => {
      console.error('Failed to load image.');
      // Обработка ошибки загрузки изображения
    };
    img.src = imageUrl;
  };

  const setCustomMap = (input?: File | string) => {
    if (!input) return;

    if (input instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target?.result as string;
        loadImageBounds(base64Url);
        localStorage.setItem('customMapUrl', base64Url);
      };
      reader.onerror = () => {
        console.error('Failed to read file.');
      };
      reader.readAsDataURL(input);
    } else if (typeof input === 'string') {
      loadImageBounds(input);
      localStorage.setItem('customMapUrl', input);
    }
  };

  return { ...mapState, setCustomMap };
};
