// src/modules/Map/services/mapService.ts

import client from '../../../api/client';

export interface MarkerData {
  id: number;
  position: [number, number];
  title: string;
  description: string;
}

export interface AreaData {
  id: number;
  positions: [number, number][];
  title: string;
  description: string;
}

export interface PlantDto {
  plantId: number;
  species: string;
  variety: string;
  latitude: number;
  longitude: number;
  note: string;
}

export interface AreaDto {
  locationId: number;
  locationPath: string;
  geometry: string;
}

export interface AddAreaRequest {
  LocationPath: string;
  Geometry: string; // WKT
}

export interface UpdateAreaRequest {
  LocationId: number;
  LocationPath: string;
  Geometry: string; // WKT
}

export interface PlantIdsDto {
  PlantIds: number[];
}

// Fetch all plants (markers)
export async function fetchMarkers(): Promise<MarkerData[]> {
  try {
    const response = await client.get<PlantDto[]>('/api/map/GetAll');
    console.log('Ответ сервера:', response.data);
    const plants = response.data;
    return plants.map((p) => {
      const marker = {
        id: p.plantId,
        position: [p.latitude, p.longitude] as [number, number],
        title: p.species,
        description: p.variety || p.note || '',
      };
      console.log('Преобразованный маркер с координатами:', marker.position);
      return marker;
    });
  } catch (error) {
    console.error('Ошибка при загрузке растений:', error);
    return [];
  }
}

// Fetch all areas
export async function fetchAreas(): Promise<AreaData[]> {
  try {
    const response = await client.get<AreaDto[]>('/api/map/GetAllAreas');
    const areas = response.data;
    return areas.map((a) => ({
      id: a.locationId,
      positions: parseWKTPolygon(a.geometry),
      title: a.locationPath,
      description: '', // Добавьте описание, если доступно
    }));
  } catch (error) {
    return [];
  }
}

// Add area to server
export async function addAreaToServer(area: AreaData): Promise<AreaDto | null> {
  try {
    const wkt = coordsToWKT(area.positions);
    const requestBody: AddAreaRequest = {
      LocationPath: area.title,
      Geometry: wkt,
    };
    const response = await client.post<AreaDto>('/api/map/AddArea', requestBody);
    return response.data;
  } catch (error) {
    return null;
  }
}

// Update area on server
export async function updateAreaOnServer(area: AreaData): Promise<AreaDto | null> {
  try {
    const wkt = coordsToWKT(area.positions);
    const requestBody: UpdateAreaRequest = {
      LocationId: area.id,
      LocationPath: area.title,
      Geometry: wkt,
    };
    const response = await client.put<AreaDto>('/api/map/UpdateArea', requestBody);
    return response.data;
  } catch (error) {
    return null;
  }
}

// Delete area on server
export async function deleteAreaOnServer(id: number): Promise<boolean> {
  try {
    await client.delete(`/api/map/DeleteArea/${id}`);
    return true;
  } catch (error) {
    return false;
  }
}

// Delete plant on server
export async function deletePlantOnServer(id: number): Promise<boolean> {
  try {
    await client.delete(`/api/map/DeletePlant/${id}`);
    return true;
  } catch (error) {
    return false;
  }
}

// Delete plants in area
export async function deletePlantsInArea(plantIds: number[]): Promise<boolean> {
  try {
    const requestBody: PlantIdsDto = {
      PlantIds: plantIds,
    };
    await client.post('/api/map/DeletePlantsInArea', requestBody);
    return true;
  } catch (error) {
    return false;
  }
}

// Helper: Convert coordinates to WKT polygon
function coordsToWKT(coords: [number, number][]): string {
  const coordStrings = coords.map((c) => `${c[1]} ${c[0]}`).join(', ');
  // Ensure polygon is closed by repeating the first coordinate at the end
  return `POLYGON((${coordStrings}, ${coords[0][1]} ${coords[0][0]}))`;
}

// Export the parseWKTPolygon helper
export function parseWKTPolygon(wkt: string): [number, number][] {
  const match = wkt.match(/\(\(([^)]+)\)\)/);
  if (!match) return [];
  const coordsStr = match[1].trim();
  const coords = coordsStr.split(',').map((pair) => {
    const [lon, lat] = pair.trim().split(' ').map(Number);
    return [lat, lon] as [number, number];
  });
  // Remove last coordinate if it's same as first
  if (
    coords.length > 0 &&
    coords[0][0] === coords[coords.length - 1][0] &&
    coords[0][1] === coords[coords.length - 1][1]
  ) {
    coords.pop();
  }
  return coords;
}

// Получить текущий путь к изображению карты
export async function fetchMapImage(): Promise<string | null> {
  try {
    const response = await client.get<{ mapImagePath: string }>('/api/map/GetMapImage');
    if (response.data && response.data.mapImagePath) {
      return response.data.mapImagePath.replace(/"/g, '');
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Загрузить изображение карты на сервер
export async function uploadMapImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await client.post<{ mapImagePath: string }>('/api/map/UploadMapImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    if (response.data && response.data.mapImagePath) {
      return response.data.mapImagePath.replace(/"/g, '');
    }
    return null;
  } catch (error) {
    return null;
  }
}
