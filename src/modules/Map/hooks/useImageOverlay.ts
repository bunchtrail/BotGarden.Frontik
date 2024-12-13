import { useCallback, useState } from 'react';

interface ImageOverlayState {
  imageUrl: string | null;
  opacity: number;
  bounds: [[number, number], [number, number]] | null;
  imageSize: { width: number; height: number } | null;
}

const useImageOverlay = () => {
  const [state, setState] = useState<ImageOverlayState>({
    imageUrl: null,
    opacity: 0.7,
    bounds: null,
    imageSize: null,
  });

  const handleImageLoad = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      setState(prev => ({
        ...prev,
        imageUrl: url,
        imageSize: { width: img.width, height: img.height },
      }));
    };

    img.src = url;
  }, []);

  const setOpacity = useCallback((value: number) => {
    setState(prev => ({ ...prev, opacity: value }));
  }, []);

  const setBounds = useCallback((bounds: [[number, number], [number, number]]) => {
    setState(prev => ({ ...prev, bounds }));
  }, []);

  const reset = useCallback(() => {
    setState(prev => {
      if (prev.imageUrl) {
        URL.revokeObjectURL(prev.imageUrl);
      }
      return {
        imageUrl: null,
        opacity: 0.7,
        bounds: null,
        imageSize: null,
      };
    });
  }, []);

  return {
    ...state,
    handleImageLoad,
    setOpacity,
    setBounds,
    reset,
  };
};

export default useImageOverlay;
