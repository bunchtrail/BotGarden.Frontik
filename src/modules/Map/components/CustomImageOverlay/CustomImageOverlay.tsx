// src/modules/Map/components/CustomImageOverlay/CustomImageOverlay.tsx
import React from 'react';
import { Rectangle } from 'react-yandex-maps';

interface CustomImageOverlayProps {
  imageUrl: string;
  coordinates: [number, number][]; 
}

const CustomImageOverlay: React.FC<CustomImageOverlayProps> = ({
  imageUrl,
  coordinates,
}) => {
  return (
    <Rectangle
      geometry={[coordinates[0], coordinates[1]]}
      options={{
        fillColor: 'rgba(0,0,0,0)',
        strokeColor: 'rgba(0,0,0,0)',
        fillImageHref: imageUrl,
        visible: true,
      }}
    />
  );
};

export default CustomImageOverlay;
