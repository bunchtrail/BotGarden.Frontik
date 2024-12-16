// src/config/mapActions/editAreaHandler.ts

import { MapViewRef } from "../components/MapView";


const editAreaHandler = (mapViewRef: React.RefObject<MapViewRef>) => {
  if (mapViewRef.current) {
    console.log('Activating edit-area mode');
    mapViewRef.current.handleMapAction('edit-area');
  }
};

export default editAreaHandler;
