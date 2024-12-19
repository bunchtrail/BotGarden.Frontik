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
  geometry: string; // WKT
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
    const plants = response.data;
    return plants.map((p) => ({
      id: p.plantId,
      position: [p.latitude, p.longitude],
      title: p.species,
      description: p.variety,
    }));
  } catch (error) {
    console.error('Error fetching markers:', error);
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
    console.error('Error fetching areas:', error);
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
    console.error('Error adding area:', error);
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
    console.error('Error updating area:', error);
    return null;
  }
}

// Delete area on server
export async function deleteAreaOnServer(id: number): Promise<boolean> {
  try {
    await client.delete(`/DeleteArea/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting area:', error);
    return false;
  }
}

// Delete plant on server
export async function deletePlantOnServer(id: number): Promise<boolean> {
  try {
    await client.delete(`/DeletePlant/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting plant:', error);
    return false;
  }
}

// Delete plants in area
export async function deletePlantsInArea(plantIds: number[]): Promise<boolean> {
  try {
    const requestBody: PlantIdsDto = {
      PlantIds: plantIds,
    };
    await client.post('/DeletePlantsInArea', requestBody);
    return true;
  } catch (error) {
    console.error('Error deleting plants in area:', error);
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
