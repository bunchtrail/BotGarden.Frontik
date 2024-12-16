// src/config/mapActions/addAreaHandler.ts

import { MapViewRef } from "../components/MapView";
import { MapAction } from '../types'; // Import MapAction

const addAreaHandler = (mapViewRef: React.RefObject<MapViewRef>) => {
  if (mapViewRef.current) {
    mapViewRef.current.handleMapAction('addArea' as MapAction); // Cast to MapAction
  }
};

export default addAreaHandler;
