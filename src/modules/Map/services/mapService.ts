// src/modules/Map/services/mapService.ts
export interface MarkerData {
  id: number;
  position: [number, number];
  title: string;
  description: string;
}

const LOCAL_STORAGE_MAP_KEY = 'customMapUrl';

export function setCustomMapUrl(url: string): void {
  localStorage.setItem(LOCAL_STORAGE_MAP_KEY, url);
}

export function getCustomMapUrl(): string | null {
  return localStorage.getItem(LOCAL_STORAGE_MAP_KEY);
}

// Статические маркеры для примера
const markersData: MarkerData[] = [
  { id: 1, position: [55.751244, 37.618423], title: 'Москва', description: 'Столица России' },
  { id: 2, position: [59.939095, 30.315868], title: 'Санкт-Петербург', description: 'Северная столица' },
];

export function getMarkers(): MarkerData[] {
  return markersData;
}
