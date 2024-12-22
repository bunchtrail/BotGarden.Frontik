// src/hooks/useOptimizedImage.ts
import { useEffect, useState } from 'react';

interface UseOptimizedImageProps {
  originalUrl: string | null;
  maxWidth?: number;
  maxHeight?: number;
}

export const useOptimizedImage = ({
  originalUrl,
  maxWidth = 2048,
  maxHeight = 2048,
}: UseOptimizedImageProps) => {
  const [optimizedUrl, setOptimizedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!originalUrl) {
      setOptimizedUrl(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onerror = () => {
      console.warn('Failed to load image with CORS, using original URL');
      setOptimizedUrl(originalUrl);
    };

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Сохраняем пропорции
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Используем максимальное качество
          setOptimizedUrl(canvas.toDataURL('image/jpeg', 1.0));
        }
      } catch (error) {
        console.warn('Canvas operation failed, using original URL:', error);
        setOptimizedUrl(originalUrl);
      }
    };

    img.src = originalUrl;
  }, [originalUrl, maxWidth, maxHeight]);

  return optimizedUrl;
};
