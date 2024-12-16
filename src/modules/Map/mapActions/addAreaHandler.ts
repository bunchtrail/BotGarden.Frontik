// src/config/mapActions/addAreaHandler.ts

import { MapViewRef } from "../components/MapView";

const addAreaHandler = (mapViewRef: React.RefObject<MapViewRef>) => {
  if (mapViewRef.current) {
    mapViewRef.current.handleMapAction('addArea');
  }
};

export default addAreaHandler;
