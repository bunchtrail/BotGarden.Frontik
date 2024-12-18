// src/modules/Map/pages/MapPage.tsx
import React, { useRef, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import MapViewer from '../components/MapViewer/MapViewer';
import { uploadMapFile } from '../utils/mapUploader';
import styles from './MapPage.module.css';
import { MapMode } from '../types/mapControls';

const MapPage: React.FC = () => {
  const [mapImageURL, setMapImageURL] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<MapMode>(MapMode.VIEW);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAction = (action: string) => {
    switch (action) {
      case 'upload-image':
        fileInputRef.current?.click();
        break;
      case 'add-plant':
        setCurrentMode(MapMode.ADD_PLANT);
        break;
      case 'add-area':
        setCurrentMode(MapMode.ADD_AREA);
        break;
      case 'edit-area':
        setCurrentMode(MapMode.EDIT_AREA);
        break;
      case 'edit-plant':
        setCurrentMode(MapMode.EDIT_PLANT);
        break;
      case 'remove-plant':
        setCurrentMode(MapMode.REMOVE_PLANT);
        break;
      default:
        console.warn(`Нет обработчика для действия: ${action}`);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await uploadMapFile(file);
      setMapImageURL(url);
      event.target.value = '';
    }
  };

  return (
    <div className={styles.mapPageContainer}>
      <Navbar pageType='map' onAction={handleAction} />
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept='image/*'
        onChange={handleFileChange}
      />
      <div className={styles.mapWrapper}>
        <MapViewer 
          mapImageURL={mapImageURL}
          currentMode={currentMode}
        />
      </div>
    </div>
  );
};

export default MapPage;
