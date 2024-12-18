// src/modules/Map/pages/MapPage.tsx
import React, { useRef, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import MapViewer from '../components/MapViewer/MapViewer';
import { uploadMapFile } from '../utils/mapUploader';
import styles from './MapPage.module.css';

const MapPage: React.FC = () => {
  const [mapImageURL, setMapImageURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAction = (action: string, file?: File) => {
    if (action === 'upload-image') {
      // Открываем диалог выбора файла
      fileInputRef.current?.click();
    } else {
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
      {/* Скрытый input для загрузки файла */}
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept='image/*'
        onChange={handleFileChange}
      />
      <div className={styles.mapWrapper}>
        <MapViewer mapImageURL={mapImageURL} />
      </div>
    </div>
  );
};

export default MapPage;
