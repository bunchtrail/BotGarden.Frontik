import React from 'react';
import { MapControl, MapControlsProps } from '../../types/mapControls';
import styles from './MapControls.module.css';

const MapControls: React.FC<Omit<MapControlsProps, 'onModeChange'>> = ({ 
  map, 
  controls, 
  currentMode 
}) => {
  const handleControlClick = (control: MapControl) => {
    map && control.action(map);
  };

  return (
    <div className={styles.controlsContainer}>
      {controls.map((control) => (
        <button
          key={control.id}
          className={styles.controlButton}
          onClick={() => handleControlClick(control)}
          title={control.title}
        >
          <i className={control.icon} />
        </button>
      ))}
    </div>
  );
};

export default MapControls;
